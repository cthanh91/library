import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Template from "../template";
import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import NewBookDialog from '../components/newBookDialog';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  tableContainer: {
    marginTop: 10,
  },
  table: {
    minWidth: 650,
    "& th": {
      fontWeight: 700
    }
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: 5
    }
  },
  funtionContainer: {
    alignSelf: "flex-end"
  }
}));

const Books = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createBook = (book) => {
    setBooks([...books, book]);
  };

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        <div className={classes.funtionContainer}>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.name}>
                  <TableCell>{book.name}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publishedDate}</TableCell>
                  <TableCell>{book.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <NewBookDialog open={open} onDialogClose={handleClose} onCreate={createBook} />
    </Template>
  );
};

export default Books;
