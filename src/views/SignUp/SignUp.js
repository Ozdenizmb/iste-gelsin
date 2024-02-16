import React, { useState } from 'react';
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink } from 'mdb-react-ui-kit';
import Input from '../../Components/Input';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

const SignUp = () => {
  const [userType, setUserType] = useState('individual');
  const [rememberMe, setRememberMe] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeContract, setAgreeContract] = useState(false);
  const [receiveEmails, setReceiveEmails] = useState(false);

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleAcceptTermsChange = () => {
    setAgreeContract(!agreeContract);
  };

  const onRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAgreeContractChange = () => {
    setAgreeContract(!agreeContract);
  };

  const handleReceiveEmailsChange = () => {
    setReceiveEmails(!receiveEmails);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50 card p-4 shadow">
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleUserTypeChange('individual')} active={userType === 'individual'}>
            <h5 className="font-weight-bold mb-0">Kişi</h5>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleUserTypeChange('company')} active={userType === 'company'}>
            Şirket
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      {userType === 'individual' && (
        <div>
          <h5 className="mb-4">Kayıt Ol</h5>
          <div className="row mb-4" >
            <div className="col">
              <Input label={"Ad"} type={"text"} name={"FirstName"} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Adınız" />
            </div>
            <div className="col">
              <Input label={"Soyad"} type={"text"} name={"LastName"} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Soyadınız" />
            </div>
          </div>
          <Input label={"E-posta"} type={"text"} name={"Email"} placeholder="E-posta adresiniz" />
          <Input label={"Şifre"} type={showPassword ? "text" : "password"} name={"Password"} placeholder="Şifre" />
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="showPasswordCheckbox" onChange={togglePasswordVisibility} />
            <label className="form-check-label" htmlFor="showPasswordCheckbox">
              Şifreyi Göster
            </label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="agreeContractCheckbox" onChange={handleAgreeContractChange} />
            <label className="form-check-label" htmlFor="agreeContractCheckbox">
              <span>
                <Link to="/contract" style={{ color: 'blue', textDecoration: 'underline' }}>Hizmet sözleşmesini</Link>
                <span className="ms-1" style={{ color: 'black' }}>onaylıyorum.</span>
              </span>
            </label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="receiveEmailsCheckbox" onChange={handleReceiveEmailsChange} />
            <label className="form-check-label" htmlFor="receiveEmailsCheckbox">
              İletişim bilgilerime e-ileti gönderilmesine izin veriyorum.
            </label>
          </div>
          <div className="d-grid gap-2 col-8 mx-auto">
            <button className="btn btn-primary" type="button">ÜYE OL</button>
          </div>
          <div className="mt-3 d-flex align-items-center">
            <hr className="flex-grow-1" />
            <span className="mx-2">veya</span>
            <hr className="flex-grow-1" />
          </div>
        </div>
      )}

      {userType === 'company' && (
        <div>
          <div className="row mb-4">
            <Input label={"Firma Adı"} type={"text"} name={"CompanyName"} placeholder="Firma Adı" />
            <div className="col">
              <Input label={"Adınız"} type={"text"} name={"FirstName"} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Adınız" />
            </div>
            <div className="col">
              <Input label={"Soyadınız"} type={"text"} name={"LastName"} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Soyadınız" />
            </div>
          </div>
          <Input label={"E posta adresiniz"} type={"text"} name={"Email"} placeholder="E-posta adresiniz" />
          <div className="row mb-4">
            <div className="col">
              <Input label={"Cep Telefonu"} type={"text"} name={"CellPhone"} placeholder="Cep Telefonu" />
            </div>
            <div className="col">
              <Input label={"Telefon Numarası"} type={"text"} name={"PhoneNumber"} placeholder="Telefon Numarası" />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <Input label={"Şifre"} type={"password"} name={"Password"} placeholder="Şifre" />
            </div>
            <div className="col">
              <Input label={"Şifreniz (Tekrar)"} type={"password"} name={"PasswordConfirm"} placeholder="Şifreniz (Tekrar)" />
            </div>
            <label className="form-check-label text-muted">
              -Rakam ve harf kullanınız
            </label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="acceptTermsCheckbox" onChange={handleAcceptTermsChange} />
            <label className="form-check-label" htmlFor="acceptTermsCheckbox">
              <span>
                <Link to="/contract" style={{ color: 'blue', textDecoration: 'underline' }}>Gizlilik Prensipleri ve Üyelik Koşulları ile Site Kullanım Şartları</Link>
                <span className="ms-1" style={{ color: 'black' }}>kabul ediyorum ve Kişisel Verilerin Korunması Bilgilendirmesi'ni okudum, anladım..</span>
              </span>
            </label>
          </div>
          <div className="d-grid gap-2 col-8 mx-auto">
            <button className="btn btn-primary" type="button">ÜYE OL</button>
          </div>
        </div>
      )}

      <div className="mt-3 d-flex">
        <button className="btn btn-light border me-2 flex-grow-1" type="button">
          <FontAwesomeIcon icon={faGoogle} className="me-2" />
          Google ile Giriş Yap
        </button>
        <button className="btn btn-dark flex-grow-1" type="button">
          <FontAwesomeIcon icon={faApple} className="me-2" />
          Apple ile Giriş Yap
        </button>
      </div>

      <div className="text-center mt-3">
        Zaten üye misin? <Link to="/login" style={{ color: 'black' }}>Giriş yap</Link>
      </div>

    </MDBContainer>
  );
};

export default SignUp;
