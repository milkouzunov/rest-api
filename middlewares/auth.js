const jwt = require('jsonwebtoken');
const jwt_secret = 'security_world!';

function auth(req, res, next) {
  let authorizationHeader = req.get('Authorization');

  if (authorizationHeader) {
    let token = authorizationHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, jwt_secret);

      req.user = decoded;
    } catch (err) {
        return next();
    }
  }

  next();
}

function isAuth(req, res, next) {
  if (!req.user) {
    res.status(401).json({ error: { message: 'You cannon perform this action!' } });
  }

  next();
}

module.exports = {
  isAuth,
  auth,
};
