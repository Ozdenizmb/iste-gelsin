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
                setJob(response.data.data);
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
