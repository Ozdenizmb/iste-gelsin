import React, { useEffect, useState } from 'react';
import './Login.css';
import { useDispatch } from "react-redux";
import { loginUserHandler, loginCompanyHandler } from '../../redux/authActions';
import { useApiProgress } from '../../shared/ApiProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isSignUp, setIsSignUp] = useState(false);

  const pendingApiCallUser = useApiProgress('get','/api/v1/User/Login');
  const pendingApiCallCompany = useApiProgress('get','/api/v1/Company/Login');

  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  useEffect(() => {
    window.scrollTo(1000, 1000);
  }, []);

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
        toast.error("Yanlış Email veya Şifre Girişinde Bulundunuz!");
      }
    }
    else {
      console.log("Kullanıcı Olarak Giriş Yapıldı.");

      try {
        const response = await dispatch(loginUserHandler(creds));
        props.history.push('/');
      }
      catch(apiError) {
        toast.error("Yanlış Email veya Şifre Girişinde Bulundunuz!");
      }
    }
  }

  const onClickSifremiUnuttum = () => {
    toast.error("Allah Kurtarsın kardeşim!");
    toast.error("Yeni bir hesap açmanı tavsiye ederiz.")
  }

  const onClickSocialMedia = () => {
    toast.error("Harici bir yol ile giriş yapma özelliği henüz aktif değildir.");
  }

  return (
    <div id="modern-login">
        <div className={`container ${isSignUp ? 'active' : ''}`}>
        <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
            <form>
            <h1>{isSignUp ? 'İşveren Girişi' : 'Kullanıcı Girişi'}</h1>
            <div className="social-icons">
                <a style={{ cursor: 'pointer' }} className="icon" onClick={onClickSocialMedia}>
                <FontAwesomeIcon icon={faGoogle}/>
                </a>
                <a style={{ cursor: 'pointer' }} className="icon" onClick={onClickSocialMedia}>
                <FontAwesomeIcon icon={faFacebookF}/>
                </a>
                <a style={{ cursor: 'pointer' }} className="icon" onClick={onClickSocialMedia}>
                <FontAwesomeIcon icon={faGithub}/>
                </a>
                <a style={{ cursor: 'pointer' }} className="icon" onClick={onClickSocialMedia}>
                <FontAwesomeIcon icon={faLinkedinIn}/>
                </a>
            </div>
            <span>veya Email ve Şifre ile giriş yapınız</span>
            <input type="email" placeholder="Email" name="email" onChange={onChangeVeriables} />
            <input type="password" placeholder="Password" name="password" onChange={onChangeVeriables} />
            <a style={{ cursor: 'pointer' }} onClick={onClickSifremiUnuttum}>Şifreni mi unuttun?</a>
            <button onClick={handleUserLoginButton}>
              {(pendingApiCallUser || pendingApiCallCompany) ? <span className="spinner-border spinner-border-sm"></span> : ''}
              Giriş Yap
            </button>
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
        <ToastContainer />
    </div>
  );
};

export default Login;
