import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ApplicationUserCard = ({ user }) => {

    const onClickAccepted = () => {

    }

    const onClickReject = () => {

    }

    let cardType = (
        <div className="card h-100 border rounded-3 shadow advert-card">
          <div className="card-link nav-link d-flex">
            <div className="image-container-for-application">
                <img src={'https://cdn.colaksoft.online/' + user.logoPath} className="card-img-top rounded-2 img-fluid" alt={user.name} />
            </div>
            <div className="card-body pb-2">
                <h5 className="card-title">{user.name} {user.surname}</h5>
                <p className="card-text mb-0 text-muted fst-italic">{user.email}</p>
                <p className="card-text text-muted fst-italic">{user.gsm === 'string' ? 'Kayıtlı Bir Numara Bulunamadı' : user.gsm}</p>
                <p className="card-text text-end text-muted fst-italic">{user.genderName}</p>
                <div className="text-end">
                    <button className="btn btn-success me-2" onClick={onClickAccepted}>Kabul Et</button>
                    <button className="btn btn-danger" onClick={onClickReject}>Reddet</button>
                </div>
            </div>
          </div>
        </div>
    )

    return (
        <div className={`mb-4 card_padding card-for-job`}>
            {cardType}
        </div>
    );
};

export default ApplicationUserCard;