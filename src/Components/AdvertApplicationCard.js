import React, { useEffect, useState } from 'react';
import { getListJobApplication } from '../api/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ApplicationUserCard from './ApplicationUserCard';
import Spinner from './Spinner';

const AdvertApplicationCard = ({ jobId }) => {

    const[applicationUser, setApplicationUser] = useState([]);
    const[isThereData, setIsThereData] = useState(false);

    const getApplicationsList = async (id) => {
        try {
            const response = await getListJobApplication(id);
            const data = response.data.data;

            const convertedData = data.map(user => ({
                userId: user.userid,
                jobPostingid: user.job_postingid,
                isUserAccepted: user.is_user_accepted,
                createdAt: user.created_at
            }));
            setApplicationUser(convertedData);
            console.log(applicationUser);
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

    if(applicationUser.length == 0) {
        return (
          <Spinner />
        );
      }

    return (
        <div className="row">
          {applicationUser.map((applicationUser, index) => (
            <ApplicationUserCard key={index} user={applicationUser} />
          ))}
        </div>
    );
};

export default AdvertApplicationCard;