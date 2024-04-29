import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ApplicationJobCard = ({ job }) => {

    let cardType = (
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
                        <p className="card-text text-end text-muted fst-italic">{job.isUserAccepted === false ? 'Henüz Kabul Edilmedi' : 'Kabul Edildiniz'}</p>
                    </div>
                </div>
            </Link>
        </div>
    )

    return (
        <div className={`mb-4 card_padding card-for-job`}>
            {cardType}
        </div>
    );
};

export default ApplicationJobCard;