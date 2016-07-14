/* eslint-disable consistent-return, no-param-reassign */

import joi from 'joi';

const schema = {
  fromX: joi.number().min(1).max(8),
  fromY: joi.number().min(1).max(8),
  toX: joi.number().min(1).max(8),
  toY: joi.number().min(1).max(8),
};

module.exports = (req, res, next) => {
  const result = joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send({ messages: result.error.details.map(d => d.message) });
  } else {
    res.locals = result.value;
    next();
  }
};
