import React, { useState, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import * as api from '../api/authenticate';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "100px",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: "16px 0 8px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useCallback(async () => {
    const isSuccess = await api.login(username, password);
    if (isSuccess) {
      window.location.href = "/";
    }
  }, [username, password]);

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      login();
    }
  };

  return (
    <Container className={classes.container} maxWidth="xs">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h5">
            {t('Sign In')}
          </Typography>
        </Grid>
        <TextField
          autoFocus
          margin="normal"
          variant="outlined"
          fullWidth
          label={t('Username')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={onKeyUp}
        />
        <TextField
          margin="normal"
          variant="outlined"
          fullWidth
          label={t('Password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={onKeyUp}
        />
        <Button
          type="submit"
          className={classes.button}
          fullWidth
          variant="contained"
          color="primary"
          onClick={login}
          disabled={username.length === 0 && password.length === 0}
        >
          {t('Sign In')}
        </Button>
      </Grid>
    </Container>
  );
};

export default Login;
