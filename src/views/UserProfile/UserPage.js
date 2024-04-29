import React from 'react';
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
import AdvertCardFeed from '../../Components/AdvertCardFeed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import ApplicationCardForUser from '../../Components/ApplicationCardForUser';

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
            <div className="col">
                <div className="card shadow p-4">
                    <h2 className="text-center">Başvurduğunuz İlanlar</h2>
                    <hr></hr>
                    <div>
                            <Link to={`/your-accepted/${email}`} className="d-grid gap-2 mb-2 card-link nav-link">
                                <button className="btn btn-success">
                                    <FontAwesomeIcon icon={faClipboardList} className="pe-2 pt-1" />
                                    Kabul Edildiğin İlanları Görüntüle
                                </button>
                            </Link>
                        <ApplicationCardForUser />
                    </div>
                </div>
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
                        <h2 className="text-center">Aktif İlanlarınız</h2>
                        <hr></hr>
                        <div>
                            <Link to={`/job-application/${email}/basvurular`} className="d-grid gap-2 mb-2 card-link nav-link">
                                <button className="btn btn-success">
                                    <FontAwesomeIcon icon={faClipboardList} className="pe-2 pt-1" />
                                    Başvuruları Görüntüle
                                </button>
                            </Link>
                            <Link to={`/procedures/${email}/ilan-paneli`} className="d-grid gap-2 mb-4">
                                <button className="btn btn-primary">
                                    <FontAwesomeIcon icon={faEdit} className="pe-2 pt-1" />
                                    İlan İşlemlerini Görüntüle
                                </button>
                            </Link>
                            <AdvertCardFeed feedsLocation={"ProfileCompany"} companyId={user.companyid}/>
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