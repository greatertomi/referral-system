const util = require('util');

const db = require('../database');
const {
  SERVER_ERR_MSG,
  SERVER_ERR_CODE,
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE
} = require('../utils/constants');
const { generateReferralCode } = require('../utils/helper-functions');

const query = util.promisify(db.query).bind(db);

exports.getUsers = async (req, res) => {
  try {
    const users = await query(
      'SELECT userId, name, email, dateTimeJoined, currentCredit, referralCode FROM users'
    );
    res.send(users);
  } catch (err) {
    res.status(SERVER_ERR_CODE).send({
      success: false,
      message: SERVER_ERR_MSG
    });
  }
};

exports.getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [user] = await query(
      `SELECT userId, name, email, dateTimeJoined, currentCredit, 
      referralCode FROM users WHERE userId = ?`,
      [id]
    );
    if (!user) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: 'This user does not exist'
      });
    }
    const [inviter] = await query(
      `SELECT b.name FROM referral_code_usage a
      INNER JOIN users b ON a.inviterId = b.userId
      WHERE inviteeId = ?`,
      [id]
    );
    user.inviterName = inviter ? inviter.name : 'None';

    const invited = await query(
      `SELECT b.name, a.dateTimeUsed FROM referral_code_usage a
      INNER JOIN users b ON a.inviteeId = b.userId
      WHERE inviterId = ?`,
      [id]
    );
    user.invited = invited;
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERR_CODE).send({
      success: false,
      message: SERVER_ERR_MSG
    });
  }
};

exports.createReferralCode = async (req, res) => {
  const { userId } = req.user;
  try {
    const [user] = await query('SELECT * FROM users WHERE userId = ?', [
      userId
    ]);

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: 'This user does not exist'
      });
    }

    if (user.referralCode) {
      return res.status(BAD_REQUEST_CODE).send({
        success: false,
        message:
          'This user already have a referralCode. Update referral code at PUT /api/v1/users/referralCode'
      });
    }

    const referralCodes = await query('SELECT userId, referralCode FROM users');

    const referralCodeArray = referralCodes.map((e) => e.referralCode);
    const referralCode = generateReferralCode(referralCodeArray);
    await query('UPDATE users SET referralCode = ? WHERE userId = ?', [
      referralCode,
      userId
    ]);

    res.send({
      success: false,
      message: 'Referral code created successfully',
      referralCode
    });
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERR_CODE).send({
      success: false,
      message: SERVER_ERR_MSG
    });
  }
};

exports.updateReferralCode = async (req, res) => {
  const { userId } = req.user;

  try {
    const [user] = await query('SELECT * FROM users WHERE userId = ?', [
      userId
    ]);

    if (!user) {
      return res.status(NOT_FOUND_CODE).send({
        success: false,
        message: 'This user does not exist'
      });
    }

    const referralCodes = await query('SELECT userId, referralCode FROM users');
    const referralCodeArray = referralCodes.map((e) => e.referralCode);
    const referralCode = generateReferralCode(referralCodeArray);
    await query('UPDATE users SET referralCode = ? WHERE userId = ?', [
      referralCode,
      userId
    ]);

    res.send({
      success: true,
      message: 'Referral code updated successfully',
      referralCode
    });
  } catch (err) {
    console.log(err);
    res.status(SERVER_ERR_CODE).send({
      success: false,
      message: SERVER_ERR_MSG
    });
  }
};
