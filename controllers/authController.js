const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const authService = require('../services/authService');

const router = Router();

router.post('/register', [
  check('username', 'Invalid username!')
  .trim()
  .isLength({
    min: 6
  })
  .isAlphanumeric(),
  check('email', 'Invalid email!')
  .trim()
  .normalizeEmail()
  .isEmail(),
  check('password', 'Invalid password!')
  .isLength({
    min: 6
  })
], async (req, res) => {
  const { username, email, password } = req.body;

  if (username == '' || password == '') {
    throw { error: { message: 'All fields is required!' } };
  }

  try {
    validationResult(req).throw();
    await authService.register({ username, email, password });
    res.status(201).json({ msg: { message: 'Created' } });

  } catch (err) {
    if(err.errors) {
      err = err.errors.map(e => e = e.msg);
    }
    if (err.code == '11000') {
      err = 'The username has already been registered, please change the username';
    }
    res.status(400).json({ error: { message: err } });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userData = await authService.login({ username, password });

    res.status(200).json({
      token: userData.token,
      userId: userData.userId,
      username: userData.username,
      email: userData.email,
      message: 'User successfuly logged in!',
    });

  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
