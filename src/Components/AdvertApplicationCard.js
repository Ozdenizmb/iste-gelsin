import React, { useEffect, useState } from 'react';
import { getListJobApplication } from '../api/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ApplicationUserCard from './ApplicationUserCard';
import Spinner from './Spinner';
import { useApiProgress } from '../shared/ApiProgress';

const AdvertApplicationCard = ({ jobId }) => {

    const[applicationUser, setApplicationUser] = useState([]);
    const[isThereData, setIsThereData] = useState(false);

    const pendingApiCall = useApiProgress('get','/api/v1/JobApplication/ListByJobPosting');

    const getApplicationsList = async (id) => {
        try {
            setIsThereData(false);
            const response = await getListJobApplication(id);
            const data = response.data.data;

            const convertedData = data.map(user => ({
                name: user.name,
                surname: user.surname,
                email: user.email,
                gsm: user.gsm,
                genderType: user.gender_type,
                logoPath: user.logo_path,
                genderName: user.gender_name,
                jobPostingid: user.job_postingid,
                userId: user.userid,
                isUserAccepted: user.is_user_accepted,
                isUserRejected: user.is_user_rejected,
                createdAt: user.created_at
            }));
            setApplicationUser(convertedData);
        } catch(error) {
            setIsThereData(true);
        }
    }

    useEffect(() => {
        getApplicationsList(jobId);
    }, [jobId]);

    if(isThereData) {
        return (
          <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center p-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
              <p className="m-0">Bu ilanınız için herhangi bir başvuru bulunmamaktadır...</p>
          </div>
        );
    }

    if(applicationUser.length == 0 || pendingApiCall) {
        return (
          <Spinner />
        );
    }

    return (
        <div className="row">
          {applicationUser.map((applicationUser, index) => (
            <ApplicationUserCard key={index} user={applicationUser} jobId={jobId} />
          ))}
        </div>
    );
};

export default AdvertApplicationCard;