import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Home from './views/Home/Home';
import About from './views/About/About';
import Login from './views/Login/Login';
import SignUp from './views/SignUp/SignUp';
import TopBar from './Components/TopBar';
import Contact from './views/Contact/Contact'
import UserPage from './views/UserProfile/UserPage';
import JobAdvertDetail from './views/JobAdvert/JobAdvertDetail';
import AdsPage from './views/AdsPage/AdsPage';
import PaymentPage from './views/Payment/PaymentPage';
import ModernLogin from './views/Login/ModernLogin';

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
          <Route path="/login" component={ModernLogin}/>
        )}

        <Route path="/signup" component={SignUp} />

        <Route path="/about" component={About} />

        <Route path="/ads-page" component={AdsPage} />

        <Route path="/contact" component={Contact} />

        <Route path="/profile" component={UserPage} />

        <Route path="/jobadvert/:jobId" component={JobAdvertDetail} />

        <Route path="/payment-page" component={PaymentPage}/>

        <Redirect to="/" />
        </Switch>

      </HashRouter>

    </div>
  );

}

export default App;