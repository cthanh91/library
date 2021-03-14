const { User } = require('../models');
const { hashPassword } = require('../util/password'); 

const create = async (req, res) => {
  const { username, password, name, email, barCode } = req.body;
  if (!username || !password || !name || !barCode) {
    res.status(400).send('Missing params')
    return;
  }
  const user = await User.create({
    username,
    password: hashPassword(password),
    name,
    email,
    barCode
  });
  res.send({
    id: user.id,
    name: user.name,
    username: user.username,
    barCode: user.barCode 
  });
};

const getAll = async (req, res) => {
  const users = await User.findAll();
  const jsonUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    username: user.username,
    barCode: user.barCode
  }));
  res.send(jsonUsers);
};

const update = async (req, res) => {
  const id = req.params.id;
  const {   
    username,
    password,
    name,
    email,
    barCode
  } = req.body;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).send();
    return;
  }
  user.setAttributes({   
    username,
    name,
    email,
    barCode
  });
  if (password) {
    user.setAttributes({ password: hashPassword(password) });
  }
  await user.save(); 
  res.send({
    id: user.id,
    name: user.name,
    username: user.username,
    barCode: user.barCode 
  });
};

const destroy = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).send();
    return;
  } 
  await user.destroy();
  res.status(204).send();
};

module.exports = {
  getAll,
  create,
  update,
  destroy
};