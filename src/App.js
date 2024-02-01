import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Home from './views/Home/Home';
import About from './views/About/About';
import NotFound from './views/NotFound/NotFound';
import LoginPage from './views/Login/Login';
import { Container } from 'react-bootstrap';
import SignUp from './views/SignUp/SignUp';
import TopBar from './Components/TopBar';

const App = () => {

  const { isLoggedIn } = useSelector(store => {
    return {
      isLoggedIn : store.isLoggedIn
    }
  });

  return(
      <div>

        <HashRouter>
          <TopBar />

          <Switch>
            <Route exact path="/" Component={Home}/>

            {!isLoggedIn && (
              <Route path="/login" Component={LoginPage}/>
            )}

            <Route path="/signup" component={SignUp} />

            <Route path="/about" component={About} />

            <Redirect to="/" />

          </Switch>

        </HashRouter>

      </div>
  );

}

export default App;