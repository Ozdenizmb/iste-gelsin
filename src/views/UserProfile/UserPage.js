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
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './UserPage.css';

const UserPage = () => {

    const { statuses } = useSelector(store => ({
        statuses: store.statuses
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
                    <div className="card shadow p-4">
                        <h2 className="text-center">İlan İşlemleri</h2>
                        <hr></hr>
                        <div>
                            <Link to={`/procedures/${user.email}`} className="d-grid gap-2 mb-2">
                                <button className="btn btn-primary">Görüntüle</button>
                            </Link>
                            <Link to={`/procedures/${user.email}`} className="d-grid gap-2 mb-2">
                                <button className="btn btn-success">Ekle</button>
                            </Link>
                            <Link to={`/procedures/${user.email}`} className="d-grid gap-2 mb-2 profile-text-no-underline">
                                <button className="btn btn-warning">Güncelle</button>
                            </Link>
                            <Link to={`/procedures/${user.email}`} className="d-grid gap-2 mb-2 profile-text-no-underline">
                                <button className="btn btn-danger">Sil</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mt-5 mb-5">

            {links}

        </div>
    );

}

export default UserPage;