import React from 'react';
import Input from '../Components/Input';

const LoginPage = () => {
    return (
        <div className="container">
            <h1 className="text-center">Login Page</h1>
            <Input label={"Username"} type={"text"} name={"username"}/>
            <Input label={"Username"} type={"password"} name={"username"}/>

            <div className="text-center">
                    <button className="btn btn-primary">
                        Login
                    </button>
                </div>
        </div>
    );
};

export default LoginPage;