import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import * as api from "../../api/book";
import Template from "../../template";
import BookResult from "./bookResult";
import ConfirmDialog from "../../components/confirmDialog";
import AlertDialog from "../../components/alertDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
  header: {
    textAlign: "center",
    padding: "20px 0"
  },
  searchBarContainer: {
    alignSelf: "flex-start",
    width: "50%"
  },
  searchBar: {
    width: "100%",
    marginBottom: 20
  }
}));

const BookBorrowing = () => {
  const classes = useStyles();
  const [textSearch, setTextSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [borrowingBook, setBorrowingBook] = useState(null);

  const onKeyUp = async (e) => {
    if (e.keyCode === 13 && textSearch) {
      const result = await api.searchBook(textSearch);
      setBooks(result);
    } else {
      setTextSearch(e.target.value);
    }
  };

  const onBorrow = (book) => {
    setBorrowingBook(book);
    setConfirmDialogOpen(true);
  };

  const borrowBook = async () => {
    await api.borrowBook(borrowingBook.id);
    setConfirmDialogOpen(false);
    setAlertDialogOpen(true);
  };

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        <h1 className={classes.header}>Brrow Book</h1>
        <Box className={classes.searchBarContainer}>
          <TextField
            className={classes.searchBar}
            text={textSearch}
            onKeyUp={onKeyUp}
            placeholder="Search..."
            type="search"
            variant="outlined"
            autoFocus
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </Box>
        {books.length > 0 ? (
          <>
            <Typography>{books.length} Result</Typography>
            <BookResult books={books} onBorrow={onBorrow} />
          </>
        ) : (
          <Typography>No Results</Typography>
        )}
      </Container>
      {confirmDialogOpen && (
        <ConfirmDialog
          open={confirmDialogOpen}
          textContent={`Do you want to borrow "${
            borrowingBook && borrowingBook.title
          }"?`}
          onDialogClose={() => setConfirmDialogOpen(false)}
          onOk={borrowBook}
        />
      )}
      <AlertDialog
        open={alertDialogOpen}
        textContent={`Please go to library to to take the book`}
        onDialogClose={() => setAlertDialogOpen(false)}
      />
    </Template>
  );
};

export default BookBorrowing;
