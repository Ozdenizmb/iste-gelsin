import React, { useEffect, useState } from 'react';
import AdvertCard from './AdvertCard';
import { getJobPostingAll, getJobPostingByCompanyId } from '../api/apiCalls';
import Spinner from './Spinner';

const AdvertCardFeed = ({feedsLocation, companyId}) => {

  const[jobs, setJobs] = useState([]);
  const pendingApiCall = false;

  useEffect(() => {
    const fetchJobPostings = async () => {

      let response;

      try {
        if(feedsLocation === "ProfileCompany") {
          response = await getJobPostingByCompanyId(companyId);
          console.log("ProfileCompany");
        }
        else {
          // feedsLocation == "HomePage" || feedsLocation == "AdsPage"
          response = await getJobPostingAll();
          console.log("Home Page - Ads Page");
        }
        const data = response.data.data;

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

        setJobs(convertedJobs);
      } catch(error) {

      }
    };

    fetchJobPostings();
  }, []);

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
        </div>
      );
};

export default AdvertCardFeed;