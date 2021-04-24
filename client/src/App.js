import Login from './page/login';
import Home from './page/home';
import Books from './page/books';
import Users from './page/users';
import Borrow from './page/borrow';
import Borrowing from './page/borrowing';
import UserScan from './page/userScan';
import Regulations from './page/regulations';
import './App.css';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as api from './api/authenticate';
import Typography from "@material-ui/core/Typography";

const NotFound = () => {
  return <div>Not Found</div>;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    const checkIdentity = async () => {
      const user = await api.getIdentity();
      if (user) {
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userName", user.name);
      }
      setIsLoggedIn(user != null);
    };
    checkIdentity();
  }, []);
  const { t, i18n } = useTranslation();
  if (isLoggedIn == null) {
    return null;
  }
  const changeLanguage = (lang) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };
  const currentLanguage = window.localStorage.language || i18n.language;

  return (
    <React.Fragment>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/login">
            <Redirect to="/" />
          </Route>
          <Route exact path="/" component={Home} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/borrow" component={Borrow} />
          <Route exact path="/borrowing" component={Borrowing} />
          <Route exact path="/user-scan" component={UserScan} />
          <Route exact path="/regulations" component={Regulations} />
          <Route path="*" component={NotFound} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      )}
      <div className="local-language-container">
        <Typography
          className={`local-language-button ${currentLanguage === 'en' ? 'active' : ''}`}
          component="span"
          onClick={() => changeLanguage('en')}>
          {t("ENG")}
        </Typography>
        <div className="local-language-separator" />
        <Typography
          className={`local-language-button ${currentLanguage === 'vi' ? 'active' : ''}`}
          component="span"
          onClick={() => changeLanguage('vi')}>
          {t("VIE")}
        </Typography>
      </div>
    </React.Fragment>
  );
}

export default App;
