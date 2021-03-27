const { Book, Borrowing } = require('../models');
const { Op, fn, col } = require('sequelize');

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
  const bookIds = books.map(book => book.id);
  const borrowingCounts = await getBorrowingCounts(bookIds);
  console.log(borrowingCounts)
  const result = books.map(book => ({
    author: book.author,
    id: book.id,
    publishedDate: book.publishedDate,
    title: book.title,
    remaining: book.quantity - (borrowingCounts[book.id] || 0)
  }));
  res.send(result);
};

const getBorrowingCounts = async (bookIds) =>{
  const borrowingCounts = await Borrowing.findAll({
    where: {
      bookId: bookIds
    },
    attributes: [
      'bookId',
      [fn('COUNT', col('id')), 'count'],
    ],
    group: "bookId"
  });
  const result = {};
  borrowingCounts.forEach(borrowingCount => {
    result[borrowingCount.bookId] = parseInt(borrowingCount.dataValues.count);
  });
  return result;
}

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

module.exports = {
  getAll,
  create,
  update,
  destroy,
  search,
  borrow
};