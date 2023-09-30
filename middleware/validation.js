const validator = require('../helpers/validate');

const savePlayer = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    playerNumber: 'required|numeric',
    playerPosition: 'required|string',
    email: 'required|email',
    phoneNumber: 'required|string',
    birthday: 'required|date',
    teamId: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveTeam = (req, res, next) => {
    const validationRule = {
      teamName: 'required|string',
      city: 'required|string',
      state: 'required|string',
      level: 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  savePlayer,
  saveTeam
};

