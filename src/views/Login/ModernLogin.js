import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleUserLoginButton = () => {
    if(isSignUp) {
        console.log("İşveren Olarak Giriş Yapıldı.")
    }
    else {
        console.log("Kullanıcı Olarak Giriş Yapıldı.")
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
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
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

export default App;
