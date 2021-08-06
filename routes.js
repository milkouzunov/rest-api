const { Router } = require('express');

const authController = require('./controllers/authController');
const mainController = require('./controllers/mainController');


const router = Router();

//router.use('/auth', authController);
router.use('/main',  mainController);

module.exports = router;
