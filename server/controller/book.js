const { Book, Borrowing } = require('../models');
const { Op } = require('sequelize');

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

const search = async (req, res) => {
  const text = req.query.text;
  const books = await Book.findAll({
    where: {
      title: {
        [Op.iLike]: `%${text}%`
      }
    }
  });
  const result = books.map(book => ({
    author: book.author,
    id: book.id,
    publishedDate: book.publishedDate,
    title: book.title
  }));
  res.send(result);
};

const borrow = async (req, res) => {
  const bookId = req.params.id;
  const borrowing = await Borrowing.findOrCreate({
    where: {
      userId: req.session.user.id,
      bookId: parseInt(bookId)
    },
    defaults: {
      userId: req.session.user.id,
      bookId: parseInt(bookId)
    }
  });
  res.status(204).send(borrowing);
};

const getBorrowingBooks = async (req, res) => {
  const borrowings = await Borrowing.findAll({
    where: {
      userId: req.session.user.id
    }
  });
  const borrowingBooks = await Book.findAll({
    where: {
      id: borrowings.map(borrowing => borrowing.bookId)
    }
  });
  const result = borrowingBooks.map(book => ({
    author: book.author,
    id: book.id,
    borrowedDate: book.createdAt,
    title: book.title
  }));
  res.send(result);
};

module.exports = {
  getAll,
  getBorrowingBooks,
  create,
  update,
  destroy,
  search,
  borrow
};