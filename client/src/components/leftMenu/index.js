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
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "147px",
    height: "100vh"
  },
  icon: {
    color: "#1976d2",
    fontSize: "6rem",
    padding: "20px",
    cursor: "pointer"
  },
  drawerBox: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
}));

const buttonsForStudent = [
  { label: "Borrow", href: "/borrow" },
  { label: "Borrowing", href: "/borrowing" },
  { label: "Regulations", href: "/regulations" },
];

const buttonsForAdmin = [
  { label: "Books", href: "/books" },
  { label: "Users", href: "/users" },
  { label: "User Scan", href: "/user-scan" },
];

const LeftMenu = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const logout = useCallback(async () => {
    const isSuccess = await api.logout();
    if (isSuccess) {
      window.location.href = "/login";
    }
  }, []);
  const userRole = window.localStorage.userRole;
  const userName = window.localStorage.userName || "";
  const buttonList = userRole && userRole.includes("Administrator") ? buttonsForAdmin : buttonsForStudent;

  return (
    <Drawer anchor="left" variant="permanent" className={classes.drawer}>
      <Box className={classes.drawerBox}>
        <Box>
          <MenuBookIcon className={classes.icon} onClick={() => history.push("")} />
          <Divider />
          <List>
            {buttonList.map((button, index) => (
              <ListItem
                button
                key={button.href}
                onClick={() => history.push(button.href)}
              >
                <ListItemText primary={t(button.label)} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Divider />
          <ListItem button onClick={logout}>
            <ListItemAvatar>
              <Avatar>{userName[0] || "U"}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={t("Log Out")} />
          </ListItem>
        </Box>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;
