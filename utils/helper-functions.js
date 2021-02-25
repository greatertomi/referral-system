const moment = require('moment');

exports.getCurrentDateTime = () => {
  const currentDateTime = String(moment().format('YYYY-MM-DD HH:mm:ss'));
  return currentDateTime;
};

exports.generateReferralCode = (codes) => {
  let referralCode;
  const codeGen = () => {
    let currentCode = '';
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    for (let i = 0; i < 5; i++) {
      currentCode += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return +currentCode;
  };
  referralCode = codeGen();
  while (codes.includes(referralCode) || referralCode.toString().length !== 5) {
    referralCode = codeGen();
  }
  return referralCode;
};
