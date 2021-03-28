import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { BOOK_CATEGORY } from "../../util/constant";
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
    padding: "20px 0",
  },
  searchBarContainer: {
    alignSelf: "flex-start",
    display: "flex",
  },
  searchBar: {
    width: 400,
    marginBottom: 20,
  },
  formControl: {
    marginLeft: 20,
    width: 170
  }
}));

const categoryOptions = BOOK_CATEGORY.map((category) => ({
  label: category,
  value: category,
}));

const Borrow = () => {
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [borrowingBook, setBorrowingBook] = useState(null);
  const [searchCategory, setSearchCategory] = useState("all");
  const [searchText, setSearchText] = useState("");

  const onEnter = async (e) => {
    if (e.keyCode === 13) {
      const result = await api.searchBook(searchText, searchCategory);
      setBooks(result);
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
  const onSelectCategory = async (e) => {
    const category = e.target.value;
    setSearchCategory(category);
    const result = await api.searchBook(searchText, category);
    setBooks(result);
  };

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        <h1 className={classes.header}>Brrow Book</h1>
        <Box className={classes.searchBarContainer}>
          <TextField
            className={classes.searchBar}
            value={searchText}
            onKeyUp={onEnter}
            onChange={e => setSearchText(e.target.value)}
            placeholder="Search..."
            type="search"
            variant="outlined"
            autoFocus
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-outlined"
              label="Category"
              value={searchCategory}
              displayEmpty
              onChange={onSelectCategory}
            >
              <MenuItem value="all">
                All
              </MenuItem>
              {categoryOptions.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default Borrow;
