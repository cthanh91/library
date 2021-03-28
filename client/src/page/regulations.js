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

const Regulations = () => {
  const classes = useStyles();

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        <h1>Regulations</h1>
        <p>Content</p>
      </Container>
    </Template>
  );
};

export default Regulations;
