import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../Components/Input';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const [termsChecked, setTermsChecked] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsChecked) {
      alert('Lütfen tüm hükümleri ve koşulları onaylayın.');
      return;
    }

    console.log('Signup form submitted:', formData);

  };

  return (
    <div>

      <div className='d-flex justify-content-center align-items-center'>
        <div className="w-75 h-100 d-flex flex-column align-items-center">
          <h1 className="text-center">Kaydol</h1>
          <div style={{ border: '2px solid #ccc', padding: '40px', borderRadius: '10px', margin: '100px auto', width: '500px' }}>
            <form onSubmit={handleSubmit}>
              <Input
                label={"Ad"}
                type={"text"}
                name={"name"}
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                label={"Soyad"}
                type={"text"}
                name={"surname"}
                value={formData.surname}
                onChange={handleChange}
              />
              <Input
                label={"Email"}
                type={"email"}
                name={"email"}
                value={formData.email}
                onChange={handleChange}
              />
              
              <Input
                label={"Şifre"}
                type={"password"}
                name={"password"}
                value={formData.password}
                onChange={handleChange}
              />

              <div className="form-group form-check">
                <div className="d-flex align-items-center" style={{ marginBottom: '15px' }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheckbox"
                    checked={termsChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="termsCheckbox" style={{ marginLeft: '10px' }}>
                    <span style={{ color: 'blue' }}>Tüm hükümleri ve koşulları </span>
                    <span style={{ color: 'grey' }}>onaylıyorum.</span>
                  </label>
                </div>
              </div>

              <Button variant="primary" size="lg" type="submit" style={{ width: '100%' }}>
                Hesap Oluştur
              </Button>{' '}
            </form>
          </div>
          <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
          <FontAwesomeIcon icon="fa-solid fa-piggy-bank" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
