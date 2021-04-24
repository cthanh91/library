import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const editingUser = props.editingUser || {};
  const [name, setName] = useState(editingUser.name || "");
  const [username, setUsername] = useState(editingUser.username || "");
  const [barcode, setBarcode] = useState(editingUser.barcode || "");
  const [password, setPassword] = useState(editingUser.password || "");
  const isEditing = props.isEditing;
  const onSave = () => {
    if (isEditing) {
      props.onEdit(editingUser.id, {
        name,
        username,
        barcode,
        password,
      });
    } else {
      props.onCreate({
        name,
        username,
        barcode,
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
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>{t('User')}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField label={t("Name")} value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label={t("Username")} value={username} onChange={(e) => setUsername(e.target.value)} required />
          <TextField label={t("Barcode")} value={barcode} onChange={(e) => setBarcode(e.target.value)} />
          <TextField label={t("Set New Password")} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onDialogClose} color="secondary">
            {t('Cancel')}
          </Button>
          <Button onClick={onSave} color="primary">
            { isEditing ? t('Save') : t('Create') }
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default BookDialog;
