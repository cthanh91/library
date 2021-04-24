import React from "react";
import { useTranslation } from 'react-i18next';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    margin: "auto",
    width: 275,
  },
  cardPos: {
    marginBottom: 10,
  },
  centerText: {
    textAlign: "center"
  }
}));

const UserCard = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { user } = props;
  if (!user) {
    return <Typography className={classes.centerText}>{t('No User Found')}</Typography>;
  }

  return (
    <Card className={classes.cardRoot} variant="outlined">
      <CardContent>
        <Typography
          className={classes.cardTitle}
          component="h1"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography className={classes.cardPos} component="p" color="textSecondary">
          {user.username}
        </Typography>
        <Typography>
          {t('Barcode')}: {user.barcode}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default React.memo(UserCard);
