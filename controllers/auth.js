const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const { validationResult } = require('express-validator');

const keys = require('../config/keys');
const db = require('../database');
const {
  SERVER_ERR_MSG,
  SERVER_ERR_CODE,
  BAD_REQUEST_CODE
} = require('../utils/constants');
const { getCurrentDateTime } = require('../utils/helper-functions');

const query = util.promisify(db.query).bind(db);

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const [user] = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(BAD_REQUEST_CODE).send({
        success: false,
        message: 'User with this email does not exist.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(BAD_REQUEST_CODE).send({
        success: false,
        message: 'Wrong password'
      });
    }

    const payload = {
      userId: user.userId
    };
    const token = await jwt.sign(payload, keys.jwtSecret, { expiresIn: '5h' });
    res.send({
      success: true,
      message: 'Login successful',
      token
    });
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERR_CODE).send({
      success: false,
      message: SERVER_ERR_MSG
    });
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
    if ((totalInvites + 1) % 5 === 0) {
      await query(
        'UPDATE users SET currentCredit = currentCredit + ? WHERE userId = ?',
        [10, userId]
      );
    }
  };

  try {
    const [user] = await query('SELECT * FROM users WHERE email = ?', [email]);

    if (user) {
      return res.status(BAD_REQUEST_CODE).send({
        success: false,
        message: 'A user with this email already exist'
      });
    }

    // This executes if the user uses a referral code
    if (regReferralCode) {
      const referralCodes = await query(
        'SELECT userId, referralCode FROM users'
      );
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await query(
      `INSERT INTO users (name, password, email, dateTimeJoined, 
      currentCredit) VALUES (?, ?, ?, ?, ?)`,
      [name, hashedPassword, email, currentDateTime, userCredit]
    );

    if (usedReferralCode) {
      await query(
        'INSERT INTO referral_code_usage (inviterId, inviteeId, dateTimeUsed) VALUES (?, ?, ?)',
        [inviterId, newUser.insertId, currentDateTime]
      );
    }

    const payload = {
      userId: newUser.insertId
    };
    const token = await jwt.sign(payload, keys.jwtSecret, { expiresIn: '5h' });

    res.status(201).send({
      success: true,
      message: 'Registration successful. You can now create a referral link.',
      userCredit,
      token
    });
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERR_CODE).send({
      success: false,
      message: SERVER_ERR_MSG
    });
  }
};
