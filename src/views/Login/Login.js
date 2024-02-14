import React, { useState } from 'react';
import { MDBContainer, MDBTabs, MDBTabsItem, MDBTabsLink } from 'mdb-react-ui-kit';
import Input from '../../Components/Input';

const Login = () => {
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
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
                    <p>Giriş Yap:</p>
                    <Input label={"Email"} type={"text"} name={"Email"} />
                    <Input label={"Şifre"} type={"text"} name={"Password"} />
                </div>
            )}

            {justifyActive === 'tab2' && (
                <div>
                    <p>Giriş Yap:</p>
                    {/* Your content for tab2 */}
                </div>
            )}
        </MDBContainer>
    );
};

export default Login;
