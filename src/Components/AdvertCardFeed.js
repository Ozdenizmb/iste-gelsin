import React, { useEffect, useState } from 'react';
import AdvertCard from './AdvertCard';
//import jobs from './Silinecek';
import { getJobPostingAll } from '../api/apiCalls';

const AdvertCardFeed = () => {

  const[jobs, setJobs] = useState([]);

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
          logoFile : job.logoFile
        }));

        setJobs(convertedJobs);
      } catch(error) {

      }
    };

    fetchJobPostings();
  }, []);

    return (
        <div className="row">
          {jobs.map((jobs, index) => (
            <AdvertCard key={index} job={jobs} />
          ))}
        </div>
      );
};

export default AdvertCardFeed;