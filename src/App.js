import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Home from './views/Home/Home';
import About from './views/About/About';
import Login from './views/Login/Login';
import SignUp from './views/SignUp/SignUp';
import TopBar from './Components/TopBar';
import Contact from './views/Contact/Contact'

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
        <Route exact path="/" component={Home}/>

        {!isLoggedIn && (
          <Route path="/login" component={Login}/>
        )}

        <Route path="/signup" component={SignUp} />

        <Route path="/about" component={About} />

        <Route path="/contact" component={Contact} />

        <Redirect to="/" />
        </Switch>

      </HashRouter>

    </div>
  );

}

export default App;