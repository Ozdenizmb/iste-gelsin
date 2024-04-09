import React, { useEffect, useState } from 'react';
import AdvertCard from './AdvertCard';
import { getJobPostingAll, getJobPostingByCompanyId } from '../api/apiCalls';
import Spinner from './Spinner';

const AdvertCardFeed = ({feedsLocation, companyId}) => {

  const[jobs, setJobs] = useState([]);
  const[pageNumber, setPageNumber] = useState(0);

  const pendingApiCall = false;
  const pageSize = 12;

  const fetchJobPostings = async (pageNumber, pageSize) => {

    const previousJobs = [...jobs];
    let response;

    try {
      if(feedsLocation === "ProfileCompany") {
        response = await getJobPostingByCompanyId(companyId, pageNumber, pageSize);
        console.log("ProfileCompany");
      }
      else {
        // feedsLocation == "HomePage" || feedsLocation == "AdsPage"
        response = await getJobPostingAll(pageNumber, pageSize);
        console.log("Home Page - Ads Page");
      }
      const data = response.data.data.items;
      const dataPage = response.data.data.currentPage;
      setPageNumber(dataPage);

      const convertedJobs = data.map(job => ({
        id : job.jobPostingId,
        company : job.companyId,
        isActive : job.isActive,
        employmentType : job.employmentType,
        educationLevel : job.educationLevel,
        experienceLevel : job.experienceLevel,
        experienceYears : job.experienceYears,
        workModel : job.workModel,
        workPerHour : job.workPerHour,
        title : job.title,
        description: job.description,
        logoPath : job.logoPath,
        totalSalary : job.totalSalary,
        countryId: job.countryId,
        cityId : job.cityId,
        districtId : job.districtId,
        streetId : job.streetId,
        startAt : job.startAt,
        endAt : job.endAt,
        logoFile : job.logoFile,
        countryName : job.countryName,
        cityName : job.cityName,
        districtName : job.districtName,
        streetName : job.streetName,
        employmentName : job.employmentName,
        educationLevelName : job.educationLevelName,
        experienceLevelName : job.experienceLevelName,
        workModelName : job.workModelName,
        companyName : job.companyName
      }));
      const combinedJobs = [...previousJobs, ...convertedJobs];
      setJobs(combinedJobs);
    } catch(error) {

    }
  };

  useEffect(() => {
    fetchJobPostings(pageNumber, pageSize);
  }, []);

  const onClickLoadMoreCardButton = () => {
    fetchJobPostings(pageNumber + 1, pageSize);
  }

  if(pendingApiCall || jobs.length == 0) {
    return (
        <Spinner />
    );
  }

    return (
        <div className="row">
          {jobs.map((jobs, index) => (
            <AdvertCard key={index} job={jobs} cardLocation={feedsLocation} />
          ))}
          <button className="btn btn-success" onClick={onClickLoadMoreCardButton}>Daha Fazla Göster</button>
        </div>
      );
};

export default AdvertCardFeed;