import React from 'react';
import './AdvertisementProceduresPage.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdvertCardFeed from '../../Components/AdvertCardFeed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const AdvertisementProceduresPage = () => {

    const [advert, setAdvert] = useState({});
    const [advertVisible, setAdvertVisible] = useState(false);

    const { id } = useSelector(store => ({
        id: store.id
    }));

    const onClickAdvertCard = () => {
        setAdvertVisible(true);
    }

    let advertDetail = (
        <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
            <p className="m-0">İlan Detayını Görüntülemek İçin Soldaki Menüde Yer Alan Bir İlana Tıklayınız!</p>
        </div>
    );

    if(advertVisible) {
        advertDetail = (
            <div>
                
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="text-center">İlan Admin Panel</h1>
            <hr className="mb-3"></hr>
            <div className="row">
                <div className="col-md-4" onClick={onClickAdvertCard}>
                    <AdvertCardFeed feedsLocation={"AdvertisementProceduresPage"} companyId={id}/>
                </div>
                <div className="col-md-8">
                    {advertDetail}
                </div>
            </div>
        </div>
    );
};

export default AdvertisementProceduresPage;