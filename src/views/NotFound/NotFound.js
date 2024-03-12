import React from 'react';
import Input from '../../Components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

const LoginPage = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className="w-75 h-100">
                <h1 className="text-center">Login Page</h1>
                <Input label={"Username"} type={"text"} name={"username"} />
                <Input label={"Password"} type={"password"} name={"username"} />

                <Button variant="primary" size="lg" active>
                    Login
                </Button>{' '}
            </div>
        </div>
    );
};

export default LoginPage;