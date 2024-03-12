import React, { useState } from 'react';
import sendApiRequest from '../../api/apiHelper';
import './SilRequest.css';

const App = () => {
  const [formData, setFormData] = useState({
    idNo: '',
    username: '',
    password: '',
    name: '',
    surname: '',
    gsm: '',
    email: '',
    genderType: '',
    countryId: '',
    cityId: '',
    districtId: '',
    streetId: '',
    logoPath: '',
    iban: '',
    bankAccountCode: '',
    workingWithBankId: '',
    isActive: false,
    birthday: Date.UTC
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'date' ? value : value
    }));
  };

  const handleSubmit = (method) => {
    // Burada endpoint ve customBaseUrl gerektiği gibi ayarlanmalıdır.
    sendApiRequest(method, 'User', formData);
  };

  return (
    <div className="container">
      <h1 className="title">API İstek Formu</h1>
      <form className="api-form">
        <div className="input-group">
          {/* Form inputları burada yer alacak */}
          {Object.keys(formData).map(key => (
            <input
              key={key}
              type={key === 'isActive' ? 'checkbox' : key === 'birthday' ? 'date' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key}
              className="input"
            />
          ))}
        </div>
        <div className="button-group">
          <button type="button" onClick={() => handleSubmit('get')} className="button">GET İsteği Gönder</button>
          <button type="button" onClick={() => handleSubmit('post')} className="button">POST İsteği Gönder</button>
          <button type="button" onClick={() => handleSubmit('put')} className="button">PUT İsteği Gönder</button>
          <button type="button" onClick={() => handleSubmit('patch')} className="button">PATCH İsteği Gönder</button>
        </div>
      </form>
    </div>
  );
};

export default App;