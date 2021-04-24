import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useTranslation } from 'react-i18next';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: 10,
  },
  table: {
    minWidth: 650,
    "& th": {
      fontWeight: 700,
    },
    "& td > svg": {
      cursor: "pointer",
    },
  }
}));

const BookResult = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{t('Title')}</TableCell>
            <TableCell>{t('Author')}</TableCell>
            <TableCell>{t('Category')}</TableCell>
            <TableCell>{t('Published Date')}</TableCell>
            <TableCell>{t('Remaining')}</TableCell>
            <TableCell>{t('Action')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.publishedDate}</TableCell>
              <TableCell>{book.remaining}</TableCell>
              <TableCell>
                {
                  book.remaining > 0 ? (
                    <Button variant="contained" onClick={() => props.onBorrow(book)} color="primary">
                      {t('Borrow')}
                    </Button>
                  ) : (
                    <Button variant="contained" color="secondary">
                      {t('Unavailable')}
                    </Button> 
                  )
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(BookResult);
