import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

const ApplicationJobCard = ({ job, feedsLocation }) => {

    const { email } = useSelector(store => ({
        email: store.email
    }));

    let cardType;

    if(feedsLocation === "User-Page") {
        cardType = (
            <div className="card h-100 border rounded-3 shadow advert-card">
                <Link to={`/jobadvert/${job.jobId}`} className="card-link nav-link">
                    <div className="card-link nav-link d-flex">
                        <div className="image-container-for-application">
                            <img src={'https://cdn.colaksoft.online/' + job.logoPath} className="card-img-top rounded-2 img-fluid" alt={job.companyName} />
                        </div>
                        <div className="card-body pb-2">
                            <h5 className="card-title">{job.title}</h5>
                            <p className="card-text mb-0 text-muted fst-italic">{job.description}</p>
                            <p className="card-text mb-0 mt-2 font-weight-bold">Maaş:
                                <span className="card-text mb-0 text-muted fst-italic"> {job.totalSalary} ₺</span>
                            </p>
                            <p className="card-text mb-0 font-weight-bold">Telefon:
                                <span className="card-text text-muted fst-italic">{job.phone === 'string' ? 'Kayıtlı Bir Numara Bulunamadı' : "  "+job.phone}</span>
                            </p>
                            <p className={`card-text text-end fst-italic ${job.isUserAccepted ? 'text-success' : job.isUserRejected ? 'text-danger' : 'text-muted'}`}>
                                {job.isUserAccepted ? 'Kabul Edildiniz' : job.isUserRejected ? 'Reddedildiniz' : 'Henüz Kabul Edilmedi'}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    if(feedsLocation === "ApplicationAcceptedForUser") {
        cardType = (
            <div className="card h-100 border rounded-3 shadow advert-card">
                <Link to={`/your-accepted/${email}/${job.jobId}`} className="card-link nav-link">
                    <div className="card-link nav-link d-flex">
                        <div className="image-container-for-application">
                            <img src={'https://cdn.colaksoft.online/' + job.logoPath} className="card-img-top rounded-2 img-fluid" alt={job.companyName} />
                        </div>
                        <div className="card-body pb-2">
                            <h5 className="card-title">{job.title}</h5>
                            <p className="card-text mb-0 text-muted fst-italic">{job.description}</p>
                            <p className="card-text mb-0 mt-2 font-weight-bold">Maaş:
                                <span className="card-text mb-0 text-muted fst-italic"> {job.totalSalary} ₺</span>
                            </p>
                            <p className="card-text mb-0 font-weight-bold">Telefon:
                                <span className="card-text text-muted fst-italic">{job.phone === 'string' ? 'Kayıtlı Bir Numara Bulunamadı' : "  "+job.phone}</span>
                            </p>
                            <p className={`card-text text-end fst-italic ${job.isUserAccepted ? 'text-success' : job.isUserRejected ? 'text-danger' : 'text-muted'}`}>
                                {job.isUserAccepted ? 'Kabul Edildiniz' : job.isUserRejected ? 'Reddedildiniz' : 'Henüz Kabul Edilmedi'}
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <div className={`mb-4 card_padding card-for-job`}>
            {cardType}
        </div>
    );
};

export default ApplicationJobCard;