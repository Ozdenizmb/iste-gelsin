import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { signUpUserHandler, signUpCompanyHandler } from '../../redux/authActions';

const SignUp = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState(); //User
  const [surname, setSurname] = useState(); // User
  const [companyName, setCompanyName] = useState(); // Company
  const [phoneNumber, setPhoneNumber] = useState(); // Company
  
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [agreeContract, setAgreeContract] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const onClickSignUpButton = async event => {
    event.preventDefault();

    if(isSignUp) {
        console.log("İşveren Olarak Kayıt Yapıldı.")

        const body = {
          companyName,
          logoPath: "string",
          isActive: true,
          fax: "string",
          phone: phoneNumber,
          email,
          countryId: 0,
          cityId: 0,
          districtId: 0,
          streetId: 0,
          apartmentNumber: "string",
          username: "string1",
          password
        }

        try {
          await dispatch(signUpCompanyHandler(body));
          props.history.push("/");
        } catch (error) {
          
        }

    }
    else {
        console.log("Kullanıcı Olarak Kayıt Olundu.")

        const body = {
          idNo: "string",
          username: "string",
          password,
          name,
          surname,
          gsm: "string",
          email,
          genderType: 0,
          countryId: 0,
          cityId: 0,
          districtId: 0,
          streetId: 0,
          logoPath: "string",
          iban: "string",
          bankAccountCode: "string",
          workingWithBankId: 0,
          isActive: true,
          birthday: "2002-11-10T20:17:43.550Z"
        }

        try {
          await dispatch(signUpUserHandler(body));
          props.history.push("/");
        } catch (error) {
          
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
    else if(name === 'passwordRepeat') {
      setPasswordRepeat(value);
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
            <button onClick={onClickSignUpButton}>Kayıt Ol</button>
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