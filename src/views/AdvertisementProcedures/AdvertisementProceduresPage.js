import React from 'react';
import './AdvertisementProceduresPage.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdvertCardFeed from '../../Components/AdvertCardFeed';

const AdvertisementProceduresPage = () => {

    const [user, setUser] = useState({});

    const { id } = useSelector(store => ({
        id: store.id
    }));

    return (
        <div className="container">
            <h1 className="text-center">İlan Admin Panel</h1>
            <hr className="mb-3"></hr>
            <AdvertCardFeed feedsLocation={"AdvertisementProceduresPage"} companyId={id}/>
        </div>
    );
};

export default AdvertisementProceduresPage;