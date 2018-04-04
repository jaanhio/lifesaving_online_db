const jwt = require('jsonwebtoken');
require('dotenv').load();

const generateToken = (user) => {
  let u = {
    firstName: user.firstname,
    lastName: user.lastname,
    email: user.email
  };

  return token = jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 10 // expires in 10mins
  });
}

module.exports = {
  generateToken
}