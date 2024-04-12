import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from "react-redux";
import { loginUserHandler, loginCompanyHandler } from '../../redux/authActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const onChangeVeriables = (event) => {

    const value = event.target.value;
    const name = event.target.name;

    if(name === 'email') {
      setEmail(value);
    }
    else if(name === 'password') {
      setPassword(value);
    }

  }

  const handleUserLoginButton = async event => {
    event.preventDefault();

    const creds = {
      email,
      password
    }

    if(isSignUp) {
      console.log("İşveren Olarak Giriş Yapıldı.");

      try {
        const response = await dispatch(loginCompanyHandler(creds));
        props.history.push("/");
        console.log(response);
      }
      catch(apiError) {
        
      }
    }
    else {
      console.log("Kullanıcı Olarak Giriş Yapıldı.");

      try {
        const response = await dispatch(loginUserHandler(creds));
        props.history.push('/');
      }
      catch(apiError) {
      }
    }
  }

  return (
    <div id="modern-login">
        <div className={`container ${isSignUp ? 'active' : ''}`}>
        <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
            <form>
            <h1>{isSignUp ? 'İşveren Girişi' : 'Kullanıcı Girişi'}</h1>
            <div className="social-icons">
                <a href="#" className="icon">
                <FontAwesomeIcon icon={faGoogle}/>
                </a>
                <a href="#" className="icon">
                <FontAwesomeIcon icon={faFacebookF}/>
                </a>
                <a href="#" className="icon">
                <FontAwesomeIcon icon={faGithub}/>
                </a>
                <a href="#" className="icon">
                <FontAwesomeIcon icon={faLinkedinIn}/>
                </a>
            </div>
            <span>veya Email ve Şifre ile giriş yapınız</span>
            <input type="email" placeholder="Email" name="email" onChange={onChangeVeriables} />
            <input type="password" placeholder="Password" name="password" onChange={onChangeVeriables} />
            <a href="#">Şifreni mi unuttun?</a>
            <button onClick={handleUserLoginButton}>Giriş Yap</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
            <div className={`toggle-panel toggle-left ${isSignUp ? 'active' : ''}`}>
                <h1>Tekrar hoşgeldiniz!</h1>
                <p>Kullanıcı olarak giriş yapmak için tıklayınız</p>
                <button className={isSignUp ? 'hidden' : ''} onClick={toggleForm}>
                Giriş Yap
                </button>
            </div>
            <div className={`toggle-panel toggle-right ${isSignUp ? '' : 'active'}`}>
                <h1>Tekrar hoşgeldiniz!</h1>
                <p>İşveren olarak giriş yapmak için tıklayınız</p>
                <button className={isSignUp ? '' : 'hidden'} onClick={toggleForm}>
                Giriş Yap
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default Login;
