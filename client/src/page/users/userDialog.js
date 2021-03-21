import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingTop: 0,
    width: 400,
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: 5
    }
  },
  dialogTitle: {
    paddingBottom: 0,
    "& > h2": {
      fontWeight: 600
    }
  }
}));

const BookDialog = (props) => {
  const classes = useStyles();
  const editingUser = props.editingUser || {};
  const [name, setName] = useState(editingUser.name || "");
  const [username, setUsername] = useState(editingUser.username || "");
  const [barCode, setBarCode] = useState(editingUser.barCode || "");
  const [password, setPassword] = useState(editingUser.password || "");
  const isEditing = props.isEditing;
  const onSave = () => {
    if (isEditing) {
      props.onEdit(editingUser.id, {
        name,
        username,
        barCode,
        password,
      });
    } else {
      props.onCreate({
        name,
        username,
        barCode,
        password,
      });
    }
  };

  return (
      <Dialog
        open={props.open}
        onClose={props.onDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>User</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <TextField label="Bar Code" value={barCode} onChange={(e) => setBarCode(e.target.value)} />
          <TextField label="Set New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={onSave} color="primary">
            { isEditing ? 'Save' : 'Create' }
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default BookDialog;
