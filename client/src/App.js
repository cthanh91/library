import Login from './page/login';
import Home from './page/home';
import Books from './page/books';
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
