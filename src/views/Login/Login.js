import React, { useState } from 'react';
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink } from 'mdb-react-ui-kit';
import Input from '../../Components/Input';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple  } from '@fortawesome/free-brands-svg-icons';


const Login = () => {
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [rememberMe, setRememberMe] = useState(false);

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    const onRememberMeChange = (value) => {
        setRememberMe(!rememberMe);
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50 card p-4 shadow">
            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Çalışan
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        İş veren
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            {justifyActive === 'tab1' && (
                <div>

                    <Input label={"Email"} type={"text"} name={"Email"} />
                    <Input label={"Şifre"} type={"password"} name={"Password"} />
                    <div className="d-flex justify-content-between mb-4">
                        <label>
                            <input className="form-check-input me-2" type={"checkbox"} name={"RememberMe"} checked={rememberMe} onChange={onRememberMeChange}/> Beni Hatırla
                        </label>
                        <Link className="" to="/contact">
                            Şifremi Unuttum
                        </Link>
                    </div>
                    <div class="d-grid gap-2 col-8 mx-auto">
                        <button class="btn btn-primary" type="button">Giriş Yap</button>
                    </div>
                    <div className="mt-3 d-flex">
                        {/* Google Giriş Butonu */}
                        <button className="btn btn-light border me-2 flex-grow-1" type="button">
                            <FontAwesomeIcon icon={faGoogle}  className="me-2"/>
                            Google ile Giriş Yap
                        </button>
                        {/* Apple Giriş Butonu */}
                        <button className="btn btn-dark flex-grow-1" type="button">
                            <FontAwesomeIcon icon={faApple}  className="me-2" />
                            Apple ile Giriş Yap
                        </button>
                    </div>
                </div>
            )}

            {justifyActive === 'tab2' && (
                <div>

                <Input label={"Email"} type={"text"} name={"Email"} />
                <Input label={"Şifre"} type={"password"} name={"Password"} />
                <div className="d-flex justify-content-between mb-4">
                    <label>
                        <input className="form-check-input me-2" type={"checkbox"} name={"RememberMe"} checked={rememberMe} onChange={onRememberMeChange}/> Beni Hatırla
                    </label>
                    <Link className="" to="/contact">
                        Şifremi Unuttum
                    </Link>
                </div>
                <div class="d-grid gap-2 col-8 mx-auto">
                    <button class="btn btn-primary" type="button">Giriş Yap</button>
                </div>
                <div className="mt-3 d-flex">
                    {/* Google Giriş Butonu */}
                    <button className="btn btn-light border me-2 flex-grow-1" type="button">
                        <FontAwesomeIcon icon={faGoogle}  className="me-2"/>
                        Google ile Giriş Yap
                    </button>
                    {/* Apple Giriş Butonu */}
                    <button className="btn btn-dark flex-grow-1" type="button">
                        <FontAwesomeIcon icon={faApple}  className="me-2" />
                        Apple ile Giriş Yap
                    </button>
                </div>
            </div>
            )}
        </MDBContainer>
    );
};

export default Login;
