import React from 'react';
import Input from '../Components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginPage = () => {
    return (
        <div className="container">
            <h1 className="text-center">Login Page</h1>
            <Input label={"Username"} type={"text"} name={"username"}/>
            <Input label={"Password"} type={"password"} name={"username"}/>

            <div className="text-center">
                    <button className="btn btn-primary">
                    <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
                        Login
                    </button>
                </div>
        </div>
    );
};

export default LoginPage;