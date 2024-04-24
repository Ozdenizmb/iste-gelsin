import React, { useEffect, useState } from 'react';
import AdvertCard from './AdvertCard';
import { getJobPostingAll, getJobPostingByCompanyId } from '../api/apiCalls';
import Spinner from './Spinner';
import { useApiProgress } from '../shared/ApiProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const AdvertCardFeed = ({feedsLocation, companyId}) => {

  const[jobs, setJobs] = useState([]);
  const[pageNumber, setPageNumber] = useState(0);
  const[lastPage, setLastPage] = useState(true);
  const[isThereData, setIsThereData] = useState(false);

  const pendingApiCall = useApiProgress('get','/api/v1/JobPosting/List');

  const pageSize = 12;

  const fetchJobPostings = async (pageNumber, pageSize) => {
    const previousJobs = [...jobs];
    let response;

    try {
      if(feedsLocation === "ProfileCompany" || feedsLocation == "AdvertisementProceduresPage" || feedsLocation == "ApplicationAdmin") {
        response = await getJobPostingByCompanyId(companyId, pageNumber, pageSize);
      }
      else {
        // feedsLocation == "HomePage" || feedsLocation == "AdsPage"
        response = await getJobPostingAll(pageNumber, pageSize);
      }
      const data = response.data.data.items;
      const dataPage = response.data.data.currentPage;
      const dataLastPage = response.data.data.hasNextPage;
      setPageNumber(dataPage);
      setLastPage(dataLastPage);

      const convertedJobs = data.map(job => ({
        companyName: job.company_name,
        employmentName: job.employment_name,
        educationLevelName: job.education_level_name,
        experienceLevelName: job.experience_level_name,
        workModelName: job.work_model_name,
        id : job.job_postingid,
        company : job.companyid,
        employmentType : job.employment_type,
        educationLevel : job.education_level,
        experienceLevel : job.experience_level,
        experienceYears : job.experience_years,
        workModel : job.work_model,
        workPerHour : job.work_per_hour,
        totalSalary : job.total_salary,
        title : job.title,
        description: job.description,
        logoPath : job.logo_path,
        adress : job.adress,
        isActive : job.is_active,
        startAt : job.start_at,
        endAt : job.end_at
      }));
      const combinedJobs = [...previousJobs, ...convertedJobs];
      setJobs(combinedJobs);
    } catch(error) {
      setIsThereData(true);
    }
  };

  useEffect(() => {
    fetchJobPostings(pageNumber, pageSize);
  }, []);

  const onClickLoadMoreCardButton = () => {
    fetchJobPostings(pageNumber + 1, pageSize);
  }

  if(isThereData) {
    return (
      <div className="card h-100 border rounded-3 shadow d-flex align-items-center justify-content-center p-4">
          <FontAwesomeIcon icon={faExclamationCircle} className="rounded-circle bg-danger p-2 text-white me-2" />
          <p className="m-0">Herhangi Bir İlanınız Yoksa, Hemen Yeni Bir İlan Oluşturun...</p>
      </div>
    );
  }

  if(jobs.length == 0) {
    return (
      <Spinner />
    );
  }

    return (
        <div className="row">
          {jobs.map((jobs, index) => (
            <AdvertCard key={index} job={jobs} cardLocation={feedsLocation} />
          ))}
          <button className="btn btn-success" onClick={onClickLoadMoreCardButton} disabled={!lastPage}>
            {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
            Daha Fazla Göster
          </button>
        </div>
      );
};

export default AdvertCardFeed;