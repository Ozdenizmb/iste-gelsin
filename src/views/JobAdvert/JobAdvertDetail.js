import React, { useEffect, useState } from 'react';
import Advert from '../../Components/Advert';
import './JobAdvert.css';
import { getJobPosting } from '../../api/apiCalls';
import Spinner from '../../Components/Spinner';

const JobAdvertDetail = ({ match }) => {

    const [job, setJob] = useState();

    // URL'den gelen iş ilanı ID'sini alıyoruz
    const jobId = match.params.jobId;

    useEffect(() => {
        const fetchJobPosting = async () => {
            try {
                const response = await getJobPosting(jobId);
                const convertedJobs = {
                    companyName:  response.data.data.company_name,
                    employmentName:  response.data.data.employment_name,
                    educationLevelName:  response.data.data.education_level_name,
                    experienceLevelName:  response.data.data.experience_level_name,
                    workModelName:  response.data.data.work_model_name,
                    id : response.data.data.job_postingid,
                    companyId : response.data.data.companyid,
                    employmentType : response.data.data.employment_type,
                    educationLevel : response.data.data.education_level,
                    experienceLevel : response.data.data.experience_level,
                    experienceYears : response.data.data.experience_years,
                    workModel : response.data.data.work_model,
                    workPerHour : response.data.data.work_per_hour,
                    totalSalary : response.data.data.total_salary,
                    title : response.data.data.title,
                    description: response.data.data.description,
                    logoPath : response.data.data.logo_path,
                    adress : response.data.data.adress,
                    isActive : response.data.data.is_active,
                    startAt : response.data.data.start_at,
                    endAt : response.data.data.end_at
                  };
                setJob(convertedJobs);
            } catch(error) {
                
            }
        }

        fetchJobPosting();
    }, []);

    // Eğer iş ilanı bulunamazsa bir hata mesajı gösterebilirsiniz
    if (!job) {
        return <Spinner />
    };

    // Advert bileşenine iş ilanını prop olarak geçiriyoruz
    return <Advert {...job} />;
};



export default JobAdvertDetail;
