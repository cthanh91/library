import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import LeftMenu from '../components/leftMenu';

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex"
  },
  main: {
    flex: "1"
  },
}));

const Template = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.page}>
      <LeftMenu />
      <Box className={classes.main}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Template;
