import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import * as api from "../../api/borrowing";
import Template from "../../template";
import BookBorrowing from "./bookBorrowing";
import ConfirmDialog from "../../components/confirmDialog";
import AlertDialog from "../../components/alertDialog";

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

const Borrowing = () => {
  const classes = useStyles();
  const [borrowings, setBorrowings] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [returningBorrowing, setReturningBorrowing] = useState(null);

  const onReturn = (borrowing) => {
    setReturningBorrowing(borrowing);
    setConfirmDialogOpen(true);
  };

  const returnBorrowing = async () => {
    await api.deleteBorrowing(returningBorrowing.id);
    const updatedBorrowings = borrowings.filter(borrowing => borrowing.id !== returningBorrowing.id);
    setBorrowings(updatedBorrowings);
    setConfirmDialogOpen(false);
    setReturningBorrowing(null);
    setAlertDialogOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      const borrowings = await api.getBorrowingBooks();
      setBorrowings(borrowings);
    };
    getData();
  }, []);

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        {
          borrowings.length > 0 ? (
            <>
              <Typography>{borrowings.length} Books Borrowing</Typography>
              <BookBorrowing borrowings={borrowings} onReturn={onReturn} />
            </>
          )
          : (
            <Typography>No Books Borrowing</Typography>
          )
        }
      </Container>
      {
        confirmDialogOpen && (
          <ConfirmDialog
            open={confirmDialogOpen}
            textContent={`Do you want to return "${returningBorrowing && returningBorrowing.book.title}"?`}
            onDialogClose={() => setConfirmDialogOpen(false)}
            onOk={returnBorrowing}
          />
        )
      }
      <AlertDialog
        open={alertDialogOpen}
        textContent={`Please go to library to return the book`}
        onDialogClose={() => setAlertDialogOpen(false)}
      />
    </Template>
  );
};

export default Borrowing;
