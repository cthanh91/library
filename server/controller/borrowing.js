const { Book, Borrowing } = require('../models');
const { Op } = require('sequelize');

const getAll = async (req, res) => {
  const borrowings = await Borrowing.findAll({
    where: {
      userId: req.session.user.id
    }
  });
  const books = await Book.findAll({
    where: {
      id: borrowings.map(borrowing => borrowing.bookId)
    }
  });
  const result = borrowings.map(borrowing => {
    const book = books.find(b => b.id === borrowing.bookId);
    return {
      id: borrowing.id,
      borrowedDate: borrowing.createdAt,
      book: {
        title: book.title,
        author: book.author,
        category: book.category
      }
    }
  });
  res.send(result);
};

const destroy = async (req, res) => {
  const id = req.params.id;
  const borrowing = await Borrowing.findOne({
    where: {
      id,
      userId: req.session.user.id
    }
  });
  if (!borrowing) {
    res.status(404).send();
    return;
  } 
  await borrowing.destroy();
  res.status(204).send();
};

module.exports = {
  getAll,
  destroy
};