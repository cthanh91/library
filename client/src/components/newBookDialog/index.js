import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    width: 400,
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: 5
    }
  }
}));

const NewBookDialog = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const onCreate = () => {
    props.onCreate({
      name, author, publishedDate, quantity
    })
  };

  return (
      <Dialog
        open={props.open}
        onClose={props.onDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Book</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          <TextField label="Published Date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
          <TextField type="number" label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onDialogClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={onCreate} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default NewBookDialog;
