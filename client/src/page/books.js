import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Template from "../template";
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import NewBookDialog from "../components/newBookDialog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import * as bookApi from "../api/book";

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
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const openNew = () => {
    setEditingBook(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createBook = async (book) => {
    const newBook = await bookApi.createBook(book);
    setBooks([newBook, ...books]);
    setOpen(false);
  };

  const editBook = async (id, book) => {
    const updatedBook = await bookApi.editBook(id, book);
    const index = books.findIndex(bookItem => bookItem.id === updatedBook.id);
    books.splice(index, 1, updatedBook);
    setBooks(books);
    setEditingBook(null);
    setOpen(false);
  };

  const openEdit = async (book) => {
    setEditingBook(book);
    setOpen(true);
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
                    <DeleteIcon fontSize="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {
        open && (
          <NewBookDialog
            open={open}
            onDialogClose={handleClose}
            onCreate={createBook}
            onEdit={editBook}
            isEditing={editingBook != null}
            editingBook={editingBook}
          />
        )
      }
    </Template>
  );
};

export default Books;
