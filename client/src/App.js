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
import * as api from './api/authenticate';

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
  if (isLoggedIn == null) {
    return null;
  }

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
    </React.Fragment>
  );
}

export default App;
