import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import * as api from "../../api/user";
import Template from "../../template";
import UserCard from "./userCard";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 50,
  },
  header: {
    textAlign: "center",
    padding: "20px 0",
  },
  searchBarContainer: {
    margin: "auto",
    width: "50%",
  },
  searchBar: {
    width: "100%",
    marginBottom: 20,
  },
}));

const UserScan = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [barcode, setBarcode] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const onKeyUp = async (e) => {
    if (e.keyCode === 13 && barcode) {
      const user = await api.getUserByBarcode(barcode);
      setFoundUser(user);
      setBarcode("");
    }
  };
  const onChange = async (e) => {
    setBarcode(e.target.value);
  };

  return (
    <Template>
      <Container maxWidth="md" className={classes.container}>
        <h1 className={classes.header}>{t('User Scan')}</h1>
        <Box className={classes.searchBarContainer}>
          <TextField
            className={classes.searchBar}
            value={barcode}
            onChange={onChange}
            onKeyUp={onKeyUp}
            placeholder={`${t('Barcode')}...`}
            type="search"
            variant="outlined"
            autoFocus
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
        </Box>
        <UserCard user={foundUser} />
      </Container>
    </Template>
  );
};

export default UserScan;
