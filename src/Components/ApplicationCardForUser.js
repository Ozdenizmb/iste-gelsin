import React, { useEffect, useState } from 'react';
import { getJobApplicationAcceptedForUser, getListJobApplicationForUser } from '../api/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import Spinner from './Spinner';
import ApplicationJobCard from './ApplicationJobCard';

const ApplicationCardForUser = ({feedsLocation}) => {

    const[applicationJob, setApplicationJob] = useState([]);
    const[isThereData, setIsThereData] = useState(false);

    let response;

    const getApplicationsList = async () => {
        try {
            setIsThereData(false);

            if(feedsLocation === "User-Page") {
                response = await getListJobApplicationForUser();
            }
            else if(feedsLocation === "ApplicationAcceptedForUser") {
                response = await getJobApplicationAcceptedForUser();
            }
            console.log(feedsLocation);
            console.log(response)
            const data = response.data.data;

            const convertedData = data.map(job => ({
                companyId: job.companyid,
                companyName: job.company_name,
                email: job.email,
                phone: job.phone,
                logoPath: job.logo_path,
                adress: job.adress,
                description: job.description,
                title: job.title,
                isActive: job.is_active,
                totalSalary: job.total_salary,
                startAt: job.start_at,
                endAt: job.end_at,
                jobId: job.job_postingid,
                userId: job.userid,
                isUserAccepted: job.is_user_accepted,
                isUserRejected: job.is_user_rejected,
                createdAt: job.created_at
            }));
            setApplicationJob(convertedData);
        } catch(error) {
            setIsThereData(true);
        }
    }

    useEffect(() => {
        getApplicationsList();
    }, []);

    if(isThereData) {
        return (
          <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center p-4">
              <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
              <p className="m-0">Başvurduğunuz ilan bulunmamaktadır...</p>
          </div>
        );
    }

    if(applicationJob.length == 0) {
        return (
          <Spinner />
        );
    }

    return (
        <div className="row">
          {applicationJob.map((applicationJob, index) => (
            <ApplicationJobCard key={index} job={applicationJob} />
          ))}
        </div>
    );
};

export default ApplicationCardForUser;