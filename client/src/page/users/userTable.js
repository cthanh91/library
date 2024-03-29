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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

const UserTable = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>{t('Name')}</TableCell>
            <TableCell>{t('Username')}</TableCell>
            <TableCell>{t('Position')}</TableCell>
            <TableCell>{t('Date Of Birth')}</TableCell>
            <TableCell>{t('School Year')}</TableCell>
            <TableCell>{t('Barcode')}</TableCell>
            <TableCell>{t('Action')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.position}</TableCell>
              <TableCell>{user.dateOfBirth}</TableCell>
              <TableCell>{user.schoolYear}</TableCell>
              <TableCell>{user.barcode}</TableCell>
              <TableCell>
                <EditIcon fontSize="small" onClick={() => props.onEdit(user)} />
                <DeleteIcon
                  fontSize="small"
                  onClick={() => props.onDelete(user)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(UserTable);
