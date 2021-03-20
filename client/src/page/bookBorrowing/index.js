import React, { useState, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as api from "../../api/book";
import Template from "../../template";
import BookResult from "./bookResult";
import ConfirmDialog from "../../components/confirmDialog";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
  searchBar: {
    alignSelf: "center",
    width: "50%",
    marginBottom: 20
  }
}));

const BookBorrowing = () => {
  const classes = useStyles();
  const [textSearch, setTextSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
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
  };

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        <Box>
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
        {
          books.length > 0 ? (
            <>
              <Typography>{books.length} Result</Typography>
              <BookResult books={books} onBorrow={onBorrow} />
            </>
          )
          : (
            <Typography>No Results</Typography>
          )
        }
      </Container>
      {
        confirmDialogOpen && (
          <ConfirmDialog
            open={confirmDialogOpen}
            textContent={`Do you want to borrow "${borrowingBook && borrowingBook.title}"?`}
            onDialogClose={() => setConfirmDialogOpen(false)}
            onOk={borrowBook}
          />
        )
      }
    </Template>
  );
};

export default BookBorrowing;
