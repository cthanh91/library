const { Book } = require('../models');

const getAll = async (req, res) => {
  const books = await Book.findAll();
  const jsonBooks = books.map(book => book.toJSON());
  res.send(jsonBooks);
};

const create = async (req, res) => {
  const { title, author, publishedDate, quantity } = req.body;
  const createdBook = await Book.create({ title, author, publishedDate, quantity })
  res.send(createdBook.toJSON());
};

const update = async (req, res) => {
  const id = req.params.id;
  const { title, author, publishedDate, quantity } = req.body;
  const book = await Book.findByPk(id);
  if (!book) {
    res.status(404).send();
    return;
  } 
  book.setAttributes({ title, author, publishedDate, quantity });
  await book.save(); 
  res.send(book.toJSON());
};

const destroy = async (req, res) => {
  const id = req.params.id;
  const book = await Book.findByPk(id);
  if (!book) {
    res.status(404).send();
    return;
  } 
  await book.destroy();
  res.status(204).send();
};

module.exports = {
  getAll,
  create,
  update,
  destroy
};