import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Template from "../../template";
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import UserDialog from "./userDialog";
import ConfirmDialog from "../../components/confirmDialog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import * as userApi from "../../api/user";

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
    "& td > svg": {
      cursor: "pointer"
    }
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

const Users = () => {
  const classes = useStyles();
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const openNew = () => {
    setEditingUser(null);
    setUserDialogOpen(true);
  };

  const closeUserDialog = () => {
    setUserDialogOpen(false);
  };

  const createUser = async (user) => {
    const newUser = await userApi.createUser(user);
    setUsers([newUser, ...users]);
    setUserDialogOpen(false);
  };

  const editUser = async (id, user) => {
    const updatedUser = await userApi.editUser(id, user);
    const index = users.findIndex(userItem => userItem.id === updatedUser.id);
    users.splice(index, 1, updatedUser);
    setUsers(users);
    setUserDialogOpen(false);
    setEditingUser(null);
  };

  const deleteUser = async () => {
    await userApi.deleteUser(deletingUser.id);
    const updatedUsers = users.filter(userItem => userItem.id !== deletingUser.id);
    setUsers(updatedUsers);
    setConfirmDialogOpen(false);
    setDeletingUser(null);
  };

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
  }

  const openEdit = async (user) => {
    setEditingUser(user);
    setUserDialogOpen(true);
  };

  const openDelete = async (user) => {
    setDeletingUser(user);
    setConfirmDialogOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      const users = await userApi.getUsers();
      setUsers(users);
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
                <TableCell>Username</TableCell>
                <TableCell>Bar Code</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.barCode}</TableCell>
                  <TableCell>
                    <EditIcon fontSize="small" onClick={() => openEdit(user)} />
                    <DeleteIcon fontSize="small" onClick={() => openDelete(user)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {
        userDialogOpen && (
          <UserDialog
            open={userDialogOpen}
            onDialogClose={closeUserDialog}
            onCreate={createUser}
            onEdit={editUser}
            isEditing={editingUser != null}
            editingUser={editingUser}
          />
        )
      }
      {
        confirmDialogOpen && (
          <ConfirmDialog
            open={confirmDialogOpen}
            textContent={`Do you want to delete "${deletingUser && deletingUser.name}"?`}
            onDialogClose={closeConfirmDialog}
            onOk={deleteUser}
          />
        )
      }
    </Template>
  );
};

export default Users;
