import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Template from "../../template";
import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import UserDialog from "./userDialog";
import UserTable from "./userTable";
import ConfirmDialog from "../../components/confirmDialog";
import * as userApi from "../../api/user";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  }
}));

const Users = () => {
  const classes = useStyles();
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const openNew = useCallback(() => {
    setEditingUser(null);
    setUserDialogOpen(true);
  }, []);

  const closeUserDialog = useCallback(() => {
    setUserDialogOpen(false);
  }, []);

  const createUser = async (user) => {
    const newUser = await userApi.createUser(user);
    setUsers([newUser, ...users]);
    setUserDialogOpen(false);
  };

  const editUser = async (id, user) => {
    const updatedUser = await userApi.editUser(id, user);
    const updatedUsers = users.map((userItem) => {
      if (userItem.id === updatedUser.id) return updatedUser;
      else return userItem;
    });
    setUsers(updatedUsers);
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

  const closeConfirmDialog = useCallback(() => {
    setConfirmDialogOpen(false);
  }, []);

  const openEdit = useCallback(async (user) => {
    setEditingUser(user);
    setUserDialogOpen(true);
  }, []);

  const openDelete = useCallback(async (user) => {
    setDeletingUser(user);
    setConfirmDialogOpen(true);
  }, []);

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
        <UserTable users={users} onEdit={openEdit} onDelete={openDelete} />
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
