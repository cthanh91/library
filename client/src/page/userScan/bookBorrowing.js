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
import moment from "moment";

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

const BookBorrowing = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  if (!props.borrowings) return null;

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{t('Title')}</TableCell>
            <TableCell>{t('Author')}</TableCell>
            <TableCell>{t('Category')}</TableCell>
            <TableCell>{t('Borrowed Date')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.borrowings.map((borrowing) => (
            <TableRow key={borrowing.id}>
              <TableCell>{borrowing.book.title}</TableCell>
              <TableCell>{borrowing.book.author}</TableCell>
              <TableCell>{borrowing.book.category}</TableCell>
              <TableCell>{moment(borrowing.borrowedDate).format("HH:mm DD-MM-YYYY")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(BookBorrowing);
