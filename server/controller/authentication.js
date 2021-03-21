const { User } = require('../models');
const bcrypt = require('bcrypt'); 

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Invalid params');
    return;
  }
  const user = await User.findOne({ where: { username } });
  if (!user) {
    res.status(401).send();
  }
  const success = bcrypt.compareSync(password, user.password);
  if (!success) {
    res.status(401).send();
  }
  req.session.user = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role
  };
  res.send();
};

const checkIdentity = async (req, res) => {
  const user = req.session.user;
  res.send(user);
};

const logout = async (req, res) => {
  delete req.session.user;
  res.status(204).send();
};

module.exports = {
  login,
  logout,
  checkIdentity
};