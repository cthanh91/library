import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useTranslation } from 'react-i18next';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    width: 300,
  }
}));

const ConfirmDialog = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
      <Dialog
        open={props.open}
        onClose={props.onDialogClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.dialogContent}>
          <DialogContentText id="alert-dialog-description">
            {props.textContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onDialogClose} color="secondary">
            {t('Cancel')}
          </Button>
          <Button onClick={props.onOk} color="primary">
            {t('OK')}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default ConfirmDialog;
