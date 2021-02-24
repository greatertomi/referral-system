const Joi = require('joi');

exports.userSchema = {
  name: Joi.string.min(3).required(),
  state: Joi.boolean
};
