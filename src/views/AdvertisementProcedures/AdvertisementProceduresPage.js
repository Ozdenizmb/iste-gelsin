import React, { useEffect } from 'react';
import './AdvertisementProceduresPage.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdvertCardFeed from '../../Components/AdvertCardFeed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { getJobPosting } from '../../api/apiCalls';
import AdvertAdminCard from '../../Components/AdvertAdminCard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AdvertisementProceduresPage = () => {

    const [advertVisible, setAdvertVisible] = useState(false);
    const {id} = useParams();

    const { companyId } = useSelector(store => ({
        companyId: store.id
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

    if(advertVisible || id != "ilan-paneli") {
        advertDetail = (
            <div>
                <AdvertAdminCard jobId={id} />
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="text-center">İlan Admin Panel</h1>
            <hr className="mb-3"></hr>
            <div className="row">
                <div className="col-md-4" onClick={onClickAdvertCard}>
                    <Link to={"/created/job-posting"} className="card-link nav-link">
                        <button className="btn btn-primary w-100 mb-3">
                            <FontAwesomeIcon icon={faEdit} className="pe-2 pt-1" />
                            İlan Oluştur
                        </button>
                    </Link>

                    <AdvertCardFeed feedsLocation={"AdvertisementProceduresPage"} companyId={companyId}/>
                </div>
                <div className="col-md-8">
                    {advertDetail}
                </div>
            </div>
        </div>
    );
};

export default AdvertisementProceduresPage;