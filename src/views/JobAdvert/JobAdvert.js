import React from 'react';
import Advert from '../../Components/Advert';
import jobs from '../../Components/Silinecek';

const JobAdvert = ({ match }) => {
    // URL'den gelen iş ilanı ID'sini alıyoruz
    const jobId = match.params.jobId;

    console.log("jobId:", jobId);

    // ID'ye uygun iş ilanını buluyoruz
    const job = jobs.find(job => job.id === jobId);

    console.log(job);

    // Eğer iş ilanı bulunamazsa bir hata mesajı gösterebilirsiniz
    if (!job) {
        return <div>İlan bulunamadı.</div>;
    }

    // Advert bileşenine iş ilanını prop olarak geçiriyoruz
    return <Advert {...job} />;
};



export default JobAdvert;
