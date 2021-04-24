import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
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
  },
  imgContainer: {
    margin: "0 40px",
    marginTop: 35
  },
  imgHeader: {
    width: "100%",
    height: 250
  }
}));

const categoryOptions = BOOK_CATEGORY.map((category) => ({
  label: category,
  value: category,
}));

const Borrow = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [borrowingBook, setBorrowingBook] = useState(null);
  const [searchCategory, setSearchCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const searchBook = async (text, category) => {
    const result = await api.searchBook(text, category);
    setBooks(result);
  };
  const onEnter = async (e) => {
    if (e.keyCode === 13) {
      searchBook(searchText, searchCategory);
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
    searchBook(searchText, category);
  };
  useEffect(() => {
    searchBook("", "all");
  }, []);

  return (
    <Template>
      <div className={classes.imgContainer}>
        <img src="/backdrop.jpg" alt="back-drop" className={classes.imgHeader} />
      </div>
      <Container maxWidth="md" className={classes.container}>
        <Box className={classes.searchBarContainer}>
          <TextField
            className={classes.searchBar}
            value={searchText}
            onKeyUp={onEnter}
            onChange={e => setSearchText(e.target.value)}
            placeholder={t("Search...")}
            type="search"
            variant="outlined"
            autoFocus
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">{t('Category')}</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-outlined"
              label="Category"
              value={searchCategory}
              displayEmpty
              onChange={onSelectCategory}
            >
              <MenuItem value="all">
                {t('All')}
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
            <Typography>{books.length} {t('Result')}</Typography>
            <BookResult books={books} onBorrow={onBorrow} />
          </>
        ) : (
          <Typography>{t('No Results')}</Typography>
        )}
      </Container>
      {confirmDialogOpen && (
        <ConfirmDialog
          open={confirmDialogOpen}
          textContent={`${t('Do you want to borrow')} "${
            borrowingBook && borrowingBook.title
          }"?`}
          onDialogClose={() => setConfirmDialogOpen(false)}
          onOk={borrowBook}
        />
      )}
      <AlertDialog
        open={alertDialogOpen}
        textContent={t('Please go to library to to take the book within 12 hours')}
        onDialogClose={() => setAlertDialogOpen(false)}
      />
    </Template>
  );
};

export default Borrow;
