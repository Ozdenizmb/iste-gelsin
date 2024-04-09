import React, { useEffect, useState } from 'react';
import AdvertCard from './AdvertCard';
import { getJobPostingAll } from '../api/apiCalls';
import Spinner from './Spinner';

const AdvertCardFeed = () => {

  const[jobs, setJobs] = useState([]);
  const pendingApiCall = false;

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await getJobPostingAll();
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
          workModelName : job.workModelName
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
            <AdvertCard key={index} job={jobs} />
          ))}
        </div>
      );
};

export default AdvertCardFeed;