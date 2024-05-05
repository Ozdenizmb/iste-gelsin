import React, { useState } from 'react';
import AdvertCardFeed from '../../Components/AdvertCardFeed';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faTasks } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import AdvertApplicationCard from '../../Components/AdvertApplicationCard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ApplicationAdmin = () => {

    const [advertVisible, setAdvertVisible] = useState(false);
    const {id} = useParams();

    const { companyId } = useSelector(store => ({
        companyId: store.id
    }));

    const onClickAdvertCard = () => {
        setAdvertVisible(true);
    }

    let applicationDetail = (
        <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
            <p className="m-0">Başvuruları Görüntülemek İçin Soldaki Menüde Yer Alan Bir İlana Tıklayınız!</p>
        </div>
    )

    if(advertVisible && id != "basvurular") {
        applicationDetail = (
            <div>
                <AdvertApplicationCard jobId={id}/>
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="text-center">İlan Admin Panel</h1>
            <hr className="mb-3"></hr>
            <div className="row">
                <div className="col-md-4" onClick={onClickAdvertCard}>
                    <AdvertCardFeed feedsLocation={"ApplicationAdmin"} companyId={companyId}/>
                </div>
                <div className="col-md-8">
                    {applicationDetail}
                </div>
            </div>
        </div>
    );
};

export default ApplicationAdmin;