import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { BOOK_CATEGORY } from "../../util/constant";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingTop: 0,
    width: 400,
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: 5,
    },
  },
  dialogTitle: {
    paddingBottom: 0,
    "& > h2": {
      fontWeight: 600,
    },
  },
}));

const categoryOptions = BOOK_CATEGORY.map((category) => ({
  label: category,
  value: category,
}));

const BookDialog = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const editingBook = props.editingBook || {};
  const [title, setTitle] = useState(editingBook.title || "");
  const [author, setAuthor] = useState(editingBook.author || "");
  const [publishedDate, setPublishedDate] = useState(
    editingBook.publishedDate || ""
  );
  const [quantity, setQuantity] = useState(editingBook.quantity || 1);
  const [category, setCategory] = useState(editingBook.category || "");
  const isEditing = props.isEditing;
  const onSave = () => {
    if (isEditing) {
      props.onEdit(editingBook.id, {
        title,
        author,
        publishedDate,
        quantity,
        category,
      });
    } else {
      props.onCreate({
        title,
        author,
        publishedDate,
        quantity,
        category,
      });
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onDialogClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        {t('Book')}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          label={t("Title")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label={t("Author")}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <FormControl>
          <InputLabel>{t('Category')}</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label={t("Published Date")}
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
        />
        <TextField
          type="number"
          label={t("Quantity")}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDialogClose} color="secondary">
          {t('Cancel')}
        </Button>
        <Button onClick={onSave} color="primary">
          {isEditing ? t("Save") : t("Create")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDialog;
