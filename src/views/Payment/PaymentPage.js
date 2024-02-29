import React from 'react';
import CreditCardForm from '../../Components/CreditCardForm';

const PaymentPage = () => {
    return (
        <div className="container mt-5 mb-5">
            <h4 className="mb-4">Ödeme Yapabilmek İçin Lütfen Kart Bilgilerinizi Giriniz.</h4>
            <div className="card p-5 shadow">
                <CreditCardForm />
            </div>
        </div>
    );
};

export default PaymentPage;