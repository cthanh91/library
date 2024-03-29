import {
  Redirect
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Template from '../template';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Home = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const userRole = window.localStorage.userRole;
  if (!userRole || !userRole.includes("Administrator")) {
    return <Redirect to="/borrow" />
  }

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        <h1>{t('Home Page')}</h1>
      </Container>
    </Template>
  );
};

export default Home;
