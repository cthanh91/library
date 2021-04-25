const { Book, Borrowing } = require('../models');
const { Op } = require('sequelize');

const getAll = async (req, res) => {
  const result = await getByUser(req.session.user.id);
  res.send(result);
};

const getAllByUser = async (req, res) => {
  const result = await getByUser(req.params.id);
  res.send(result);
};

const getByUser = async (userId) => {
  if (!userId) return [];
  const borrowings = await Borrowing.findAll({
    where: {
      userId: userId
    }
  });
  const books = await Book.findAll({
    where: {
      id: borrowings.map(borrowing => borrowing.bookId)
    }
  });
  return borrowings.map(borrowing => {
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
  getAllByUser,
  destroy
};