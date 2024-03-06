import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [agreeContract, setAgreeContract] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleUserLoginButton = () => {
    if(isSignUp) {
        console.log("İşveren Olarak Kayıt Yapıldı.")
    }
    else {
        console.log("Kullanıcı Olarak Kayıt Olundu.")
    }
  }

  const handleAgreeContractChange = () => {
    setAgreeContract(!agreeContract);
  };

  return (
    <div id="modern-signup">
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
            <span>veya Email ve Şifre ile kayıt olunuz</span>
            <input type="firstname" placeholder="Ad" />
            <input type="surname" placeholder="Soyad" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <label className="service-confirm">
              <input type="checkbox" checked={agreeContract} onChange={handleAgreeContractChange}/>
              <span>
                  <Link to="/contract" style={{ color: 'blue', textDecoration: 'underline' }}>Hizmet sözleşmesini</Link>
                  <span className="ms-1" style={{ color: 'black' }}>onaylıyorum.</span>
              </span>
            </label>
            <button onClick={handleUserLoginButton}>Kayıt Ol</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
            <div className={`toggle-panel toggle-left ${isSignUp ? 'active' : ''}`}>
                <h1>Selam, Dostum!</h1>
                <p>Kullanıcı olarak kayıt olmak için tıklayınız</p>
                <button className={isSignUp ? 'hidden' : ''} onClick={toggleForm}>
                Kayıt Ol
                </button>
            </div>
            <div className={`toggle-panel toggle-right ${isSignUp ? '' : 'active'}`}>
                <h1>Selam, Dostum!</h1>
                <p>İşveren olarak kayıt olmak için tıklayınız</p>
                <button className={isSignUp ? '' : 'hidden'} onClick={toggleForm}>
                Kayıt Ol
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default SignUp;