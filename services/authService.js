const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwt_secret = process.env.JWT_SECRET;

async function register({ username, email, password }) {

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password.trim(), salt);

    const newUser = new User({ username: username.trim(), email, password: hash });

    return newUser.save();
}

async function login({ username, password }) {
    let user = await User.findOne({ username: username.trim() });

    if (!user) {
        throw { message: 'Wrong username or password!' };
    }

    let isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
        throw { message: 'Wrong username or password!' };
    }

    let token = jwt.sign({ _id: user._id, username: username }, jwt_secret, { expiresIn: '2h' });

    return {
        token,
        username: user.username,
        email: user.email,
        userId: user._id
    };
}

module.exports = {
    register,
    login
}