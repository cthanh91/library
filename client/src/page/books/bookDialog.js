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
  const editingBook = props.editingBook || {};
  const [title, setTitle] = useState(editingBook.title || "");
  const [author, setAuthor] = useState(editingBook.author || "");
  const [publishedDate, setPublishedDate] = useState(editingBook.publishedDate || "");
  const [quantity, setQuantity] = useState(editingBook.quantity || 1);
  const isEditing = props.isEditing;
  const onSave = () => {
    if (isEditing) {
      props.onEdit(editingBook.id, {
        title,
        author,
        publishedDate,
        quantity,
      });
    } else {
      props.onCreate({
        title,
        author,
        publishedDate,
        quantity,
      });
    }
  };

  return (
      <Dialog
        open={props.open}
        onClose={props.onDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Book</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          <TextField label="Published Date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
          <TextField type="number" label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
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
