import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {
  useHistory
} from "react-router-dom";
import * as api from '../../api/authenticate';
import { useCallback } from 'react';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "147px",
    height: "100vh"
  },
  icon: {
    color: "#1976d2",
    fontSize: "6rem",
    padding: "20px"
  },
  drawerBox: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}));

const buttons = [
  { label: "Books", href: "/book" },
];

const LeftMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const logout = useCallback(async () => {
    const isSuccess = await api.logout();
    console.log(isSuccess)
    if (isSuccess) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Drawer anchor="left" variant="permanent" className={classes.drawer}>
      <Box className={classes.drawerBox}>
        <Box>
          <MenuBookIcon className={classes.icon} />
          <Divider />
          <List>
            {buttons.map((button, index) => (
              <ListItem
                button
                key={button.href}
                onClick={() => history.push(button.href)}
              >
                <ListItemText primary={button.label} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Divider />
          <ListItem button>
            <ListItemAvatar>
              <Avatar>T</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Log Out" onClick={logout} />
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;
