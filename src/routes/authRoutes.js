const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // create user
      req.login(req.body, () => {
        debug(req.user);
        res.redirect('/auth/profile');
      });
    });
  authRouter.route('/profile')
    .get((req, res) => {
      debug(req.body);
      debug(req.user);
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
