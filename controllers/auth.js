const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

const keys = require('../config/keys');
const db = require('../database');
const {
  SERVER_ERR_MSG,
  SERVER_ERR_CODE,
  BAD_REQUEST_CODE
} = require('../utils/constants');
const {
  getCurrentDateTime,
  generateReferralCode
} = require('../utils/helper-functions');

const query = util.promisify(db.query).bind(db);

exports.login = (req, res) => {
  res.send({ message: 'Ready to fire' });
};

exports.register = async (req, res) => {
  const { name, password, email, regReferralCode } = req.body;
  const currentDateTime = getCurrentDateTime();
  let userCredit = 0;
  let inviterId;
  let usedReferralCode = false;

  // This checks if user have had upto 5 referrals then it credit his count;
  const updateUserCredit = async (userId) => {
    const inviterRecords = await query(
      'SELECT * FROM referral_code_usage WHERE inviterId = ?',
      [userId]
    );
    const totalInvites = inviterRecords.length;
    console.log('totalInvites', totalInvites);
    if ((totalInvites + 1) % 5 === 0) {
      console.log('Incrementing current credit...');
      await query(
        'UPDATE users SET currentCredit = currentCredit + ? WHERE userId = ?',
        [5, userId]
      );
    }
  };

  try {
    const existingUser = await query('SELECT * FROM users WHERE email = ?', [
      email
    ]);

    if (existingUser.length > 0) {
      return res.status(BAD_REQUEST_CODE).send({
        success: false,
        message: 'A user with this email already exist'
      });
    }

    const referralCodes = await query('SELECT userId, referralCode FROM users');

    // This executes if the user uses a referral code
    if (regReferralCode) {
      const regCodeOwner = referralCodes.filter(
        (e) => e.referralCode === String(regReferralCode)
      );

      if (regCodeOwner.length === 0) {
        return res.status(BAD_REQUEST_CODE).send({
          success: false,
          message:
            'The regReferralCode does not belong to anyone. Please change or remove it.'
        });
      }
      userCredit = 10;
      inviterId = regCodeOwner[0].userId;
      usedReferralCode = true;
      await updateUserCredit(inviterId);
    }

    // Get all the referral code as an array
    const referralCodeArray = referralCodes.map((e) => e.referralCode);
    console.log('referralCodeArray', referralCodeArray);
    const userReferralCode = generateReferralCode(referralCodeArray);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await query(
      `INSERT INTO users (name, password, email, dateTimeJoined, 
      currentCredit, referralCode) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, hashPassword, email, currentDateTime, userCredit, userReferralCode]
    );

    if (usedReferralCode) {
      await query(
        'INSERT INTO referral_code_usage (inviterId, inviteeId, dateTimeUsed) VALUES (?, ?, ?)',
        [inviterId, newUser.insertId, currentDateTime]
      );
    }

    res.status(201).send({
      success: true,
      message: 'New user created successfully. You can now login.',
      userCredit,
      referralCode: usedReferralCode
    });
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERR_CODE).send({
      success: false,
      message: SERVER_ERR_MSG
    });
  }
};
