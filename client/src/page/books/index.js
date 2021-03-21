import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Template from "../../template";
import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import BookDialog from "./bookDialog";
import BookTable from "./bookTable";
import ConfirmDialog from "../../components/confirmDialog";
import * as bookApi from "../../api/book";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: 5,
    },
  },
  funtionContainer: {
    alignSelf: "flex-end",
  }
}));

const Books = () => {
  const classes = useStyles();
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);

  const openNew = useCallback(() => {
    setEditingBook(null);
    setBookDialogOpen(true);
  }, []);

  const closeBookDialog = useCallback(() => {
    setBookDialogOpen(false);
  }, []);

  const createBook = async (book) => {
    const newBook = await bookApi.createBook(book);
    setBooks([newBook, ...books]);
    setBookDialogOpen(false);
  };

  const editBook = async (id, book) => {
    const updatedBook = await bookApi.editBook(id, book);
    const updatedBooks = books.map(bookItem => {
      if (bookItem.id === updatedBook.id) return updatedBook;
      else return bookItem;
    });
    setBooks(updatedBooks);
    setEditingBook(null);
    setBookDialogOpen(false);
  };

  const deleteBook = async () => {
    await bookApi.deleteBook(deletingBook.id);
    const updatedBooks = books.filter(bookItem => bookItem.id !== deletingBook.id);
    setBooks(updatedBooks);
    setConfirmDialogOpen(false);
    setDeletingBook(null);
  };

  const closeConfirmDialog = useCallback(() => {
    setConfirmDialogOpen(false);
  }, []);

  const openEdit = useCallback(async (book) => {
    setEditingBook(book);
    setBookDialogOpen(true);
  }, []);

  const openDelete = useCallback(async (book) => {
    setDeletingBook(book);
    setConfirmDialogOpen(true);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const books = await bookApi.getBooks();
      setBooks(books);
    };
    getData();
  }, []);

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        <h1>Books</h1>
        <div className={classes.funtionContainer}>
          <Button variant="contained" color="primary" onClick={openNew}>
            New
          </Button>
        </div>
        <BookTable books={books} onEdit={openEdit} onDelete={openDelete} />
      </Container>
      {
        bookDialogOpen && (
          <BookDialog
            open={bookDialogOpen}
            onDialogClose={closeBookDialog}
            onCreate={createBook}
            onEdit={editBook}
            isEditing={editingBook != null}
            editingBook={editingBook}
          />
        )
      }
      {
        confirmDialogOpen && (
          <ConfirmDialog
            open={confirmDialogOpen}
            textContent={`Do you want to delete "${deletingBook && deletingBook.title}"?`}
            onDialogClose={closeConfirmDialog}
            onOk={deleteBook}
          />
        )
      }
    </Template>
  );
};

export default Books;
