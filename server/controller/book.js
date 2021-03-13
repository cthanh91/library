const { Book } = require('../models');

const getAll = async (req, res) => {
  const books = await Book.findAll();
  const jsonBooks = books.map(book => book.toJSON());
  res.send(jsonBooks);
};

const create = async (req, res) => {
  const { name, author, publishedDate, quantity } = req.body;
  const createdBook = await Book.create({ name, author, publishedDate, quantity })
  res.send(createdBook);
};

const update = async (req, res) => {
  const id = req.params.id;
  const { name, author, publishedDate, quantity } = req.body;
  console.log(req.params)
  const book = await Book.findByPk(id);
  if (!book) {
    res.status(404).send();
    return;
  } 
  book.setAttributes({ name, author, publishedDate, quantity });
  await book.save(); 
  res.send(book);
};

module.exports = {
  getAll,
  create,
  update
};