import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { signUpUserHandler, signUpCompanyHandler } from '../../redux/authActions';
import { ToastContainer, toast } from 'react-toastify';
import { useApiProgress } from '../../shared/ApiProgress';

const SignUp = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState(); //User
  const [surname, setSurname] = useState(); // User
  const [companyName, setCompanyName] = useState(); // Company
  const [phoneNumber, setPhoneNumber] = useState(); // Company
  
  const [errors, setErrors] = useState({});

  const pendingApiCallUser = useApiProgress('post','/api/v1/User');
  const pendingApiCallCompany = useApiProgress('post','/api/v1/Company');

  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [agreeContract, setAgreeContract] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const onClickSignUpButton = async event => {
    event.preventDefault();

    if(isSignUp) {

        const body = {
          company_name: companyName,
          email,
          password,
          fax: "string",
          phone: phoneNumber,
          adress: "string",
          logo_path: "string",
          is_active: true
        }

        try {
          await dispatch(signUpCompanyHandler(body));
          props.history.push("/");
        } catch (error) {
          let message = error.response.data.message;
          if(message == undefined) {
            message = "Kayıt işleminin gerçekleşmesi için lütfen tüm formu doldurunuz."
          }
          toast.error(message);
        }

    }
    else {

        const body = {
          name,
          surname,
          id_no: "string",
          email,
          password,
          gsm: "string",
          gender_type: 0,
          bank_account_code: "string",
          working_with_bankid: 0,
          iban: "string",
          logo_path: "string",
          is_active: true,
          birthday: "2002-11-10T12:29:01"
        }

        try {
          await dispatch(signUpUserHandler(body));
          props.history.push("/");
        } catch (error) {
          let message = error.response.data.message;
          if(message == undefined) {
            message = "Kayıt işleminin gerçekleşmesi için lütfen tüm formu doldurunuz."
          }
          toast.error(message);
        }
    }
  }

  const handleAgreeContractChange = () => {
    setAgreeContract(!agreeContract);
  };

  const onChangeVeriables = event => {

    const value = event.target.value;
    const name = event.target.name;

    if(name === 'email') {
      setEmail(value);
    }
    else if(name === 'name') {
      setName(value);
    }
    else if(name === 'surname') {
      setSurname(value);
    }
    else if(name === 'companyName') {
      setCompanyName(value);
    }
    else if(name === 'phoneNumber') {
      setPhoneNumber(value);
    }
    else if(name === 'password') {
      setPassword(value);
    }

  }

  return (
    <div id="modern-signup">
        <div className={`container ${isSignUp ? 'active' : ''}`}>
        <div className={`form-container ${isSignUp ? 'sign-up' : 'sign-in'}`}>
            <form>
            <h1>{isSignUp ? 'İşveren Kaydı' : 'Kullanıcı Kaydı'}</h1>
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
            {!isSignUp && (
              <div>
                <input type="firstname" placeholder="Ad" name="name" onChange={onChangeVeriables} />
                <input type="surname" placeholder="Soyad" name="surname" onChange={onChangeVeriables} />
              </div>
            )}
            {isSignUp && (
              <div>
                <input type="companyName" placeholder="Şirket Adı" name="companyName" onChange={onChangeVeriables} />
                <input type="phoneNumber" placeholder="Telefon Numarası" name="phoneNumber" onChange={onChangeVeriables} />
              </div>
            )}
            <input type="email" placeholder="Email" name="email" onChange={onChangeVeriables}/>
            <input type="password" placeholder="Password" name="password" onChange={onChangeVeriables} />
            <label className="service-confirm">
              <input type="checkbox" checked={agreeContract} onChange={handleAgreeContractChange}/>
              <span>
                  <Link to="/contract" style={{ color: 'blue', textDecoration: 'none' }}>Hizmet sözleşmesini</Link>
                  <span className="ms-1" style={{ color: 'black' }}>onaylıyorum.</span>
              </span>
            </label>
            <button onClick={onClickSignUpButton} disabled={!agreeContract} className={agreeContract ? "" : "disabled-btn"}>
              {(pendingApiCallUser || pendingApiCallCompany) ? <span className="spinner-border spinner-border-sm"></span> : ''}
              Kayıt Ol
            </button>
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
        <ToastContainer />
    </div>
  );
};

export default SignUp;