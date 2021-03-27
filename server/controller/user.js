const { User } = require('../models');
const { hashPassword } = require('../util/password'); 

const create = async (req, res) => {
  const { username, password, name, email, barcode } = req.body;
  if (!username || !password || !name || !barcode) {
    res.status(400).send('Missing params');
    return;
  }
  const user = await User.create({
    username,
    password: hashPassword(password),
    name,
    email,
    barcode
  });
  res.send({
    id: user.id,
    name: user.name,
    username: user.username,
    barcode: user.barcode 
  });
};

const getAll = async (req, res) => {
  const users = await User.findAll();
  const jsonUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    username: user.username,
    barcode: user.barcode
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
    barcode
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
    barcode
  });
  if (password) {
    user.setAttributes({ password: hashPassword(password) });
  }
  await user.save(); 
  res.send({
    id: user.id,
    name: user.name,
    username: user.username,
    barcode: user.barcode 
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

const getByBarcode = async (req, res) => {
  const barcode = req.params.barcode;
  const users = await User.findAll({
    where: {
      barcode
    }
  });
  if (users.length <= 0) {
    res.send(null);
    return;
  }
  const user = users[0];
  res.send({
    id: user.id,
    name: user.name,
    username: user.username,
    barcode: user.barcode
  });
};

module.exports = {
  getAll,
  create,
  update,
  destroy,
  getByBarcode
};