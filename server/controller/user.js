const { User } = require('../models');
const bcrypt = require('bcrypt'); 

const createUser = async (req, res) => {
  const { username, password, name, email } = req.body;
  if (!username || !password || !name) {
    res.status(400).send('Missing params')
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  await User.create({
    username,
    password: hash,
    name,
    email
  });
  res.send();
};

module.exports = {
  createUser
};