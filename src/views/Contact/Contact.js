import React from 'react';
import Input from '../../Components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';

const LoginPage = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className="w-75 h-100">
                <h1 className="text-center">Contact</h1>

                <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
                <FontAwesomeIcon icon="fa-solid fa-piggy-bank" />
            </div>
        </div>
    );
};

export default LoginPage;