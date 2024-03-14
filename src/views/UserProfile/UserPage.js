import React from 'react';
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import ProfileCard from '../../Components/ProfileCard';
import { useState } from 'react';
import { getUser } from '../../api/apiCalls';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../../Components/Spinner';

const UserPage = () => {

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
            const response = await getUser();
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

    return (
        <div className="container">

            <div className="row">
                <div className="col">
                    <ProfileCard user={user} />
                </div>
                <div className="col">
                    <button className="btn btn-primary">İlan Aç</button>
                </div>
            </div>

        </div>
    );

}

export default UserPage;