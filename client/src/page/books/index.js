import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Template from "../../template";
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import BookDialog from "./bookDialog";
import ConfirmDialog from "../../components/confirmDialog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import * as bookApi from "../../api/book";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tableContainer: {
    marginTop: 10,
  },
  table: {
    minWidth: 650,
    "& th": {
      fontWeight: 700,
    },
    "& td > svg": {
      cursor: "pointer"
    }
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
  },
}));

const Books = () => {
  const classes = useStyles();
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);

  const openNew = () => {
    setEditingBook(null);
    setBookDialogOpen(true);
  };

  const closeBookDialog = () => {
    setBookDialogOpen(false);
  };

  const createBook = async (book) => {
    const newBook = await bookApi.createBook(book);
    setBooks([newBook, ...books]);
    setBookDialogOpen(false);
  };

  const editBook = async (id, book) => {
    const updatedBook = await bookApi.editBook(id, book);
    const index = books.findIndex(bookItem => bookItem.id === updatedBook.id);
    books.splice(index, 1, updatedBook);
    setBooks(books);
    setEditingBook(null);
    setBookDialogOpen(false);
  };

  const deleteBook = async () => {
    await bookApi.deleteBook(deletingBook.id);
    const updateBooks = books.filter(bookItem => bookItem.id !== deletingBook.id);
    setBooks(updateBooks);
    setDeletingBook(null);
    setConfirmDialogOpen(false);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  }

  const openEdit = async (book) => {
    setEditingBook(book);
    setBookDialogOpen(true);
  };

  const openDelete = async (book) => {
    setDeletingBook(book);
    setConfirmDialogOpen(true);
  };

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
        <div className={classes.funtionContainer}>
          <Button variant="contained" color="primary" onClick={openNew}>
            New
          </Button>
        </div>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Published Date</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publishedDate}</TableCell>
                  <TableCell>{book.quantity}</TableCell>
                  <TableCell>
                    <EditIcon fontSize="small" onClick={() => openEdit(book)} />
                    <DeleteIcon fontSize="small" onClick={() => openDelete(book)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
            textContent={`Do you want to delete "${deletingBook.name}"?`}
            onDialogClose={closeConfirmDialog}
            onOk={deleteBook}
          />
        )
      }
    </Template>
  );
};

export default Books;
