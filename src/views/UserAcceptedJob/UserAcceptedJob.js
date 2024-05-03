import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import ApplicationCardForUser from '../../Components/ApplicationCardForUser';

const UserAcceptedJob = () => {

    const onClickAdvertCard = () => {

    }

    let applicationDetail = (
        <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
            <p className="m-0">İlan Detayını Görüntülemek İçin Soldaki Menüde Yer Alan Bir İlana Tıklayınız!</p>
        </div>
    );

    return (
        <div>
            <div className="container">
            <h1 className="text-center">Başvurunu Onaylayan İlanlar</h1>
            <hr className="mb-3"></hr>
            <div className="row">
                <div className="col-md-4" onClick={onClickAdvertCard}>
                    <ApplicationCardForUser feedsLocation={"ApplicationAcceptedForUser"}/>
                </div>
                <div className="col-md-8">
                    {applicationDetail}
                </div>
            </div>
        </div>
        </div>
    );
};

export default UserAcceptedJob;