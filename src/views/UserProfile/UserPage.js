import React from 'react';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import UserProfileCard from '../../Components/UserProfileCard';
import CompanyProfileCard from '../../Components/CompanyProfileCard';
import { useState } from 'react';
import { getUser, getCompany } from '../../api/apiCalls';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../../Components/Spinner';

const UserPage = () => {

    const { statuses } = useSelector(store => ({
        statuses: store.statuses,
    }));

    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    const { email } = useParams();

    //const pendingApiCall = useApiProgress('get','/api/1.0/users/' + username, true);
    const pendingApiCall = false;

    useEffect(() => {
        loadUser();
    }, [email]);

    const loadUser = async () => {
        try {
            let response;

            if(statuses === "company") {
                response = await getCompany();
            }
            else {
                response = await getUser();
            }
            console.log(response);
            setUser(response.data.data);
            setNotFound(false);
        }
        catch(error) {
            setNotFound(true);
        }
    };

    if(notFound) {
        return(
            <div className="container">
                <div className="alert alert-danger text-center">
                    <div>
                        <span className="material-icons" style={{fontSize: '48px'}}>error</span>
                    </div>
                    User Not Found
                </div>
            </div>
        );
    }

    if(pendingApiCall || user.email !== email) {
        return (
            <Spinner />
        );
    }

    let links = (
        <div className="row">
            <div className="col">
                <UserProfileCard user={user} />
            </div>
        </div>
    )

    if(statuses == "company") {
        links = (
            <div className='row'>
                <div className="col">
                    <CompanyProfileCard user={user}/>
                </div>
                <div className="col">
                    <button className="btn">İlan Aç</button>
                </div>
            </div>
        )
    }

    return (
        <div className="container">

            {links}

        </div>
    );

}

export default UserPage;