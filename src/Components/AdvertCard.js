import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

const AdvertCard = ({ job, cardLocation }) => {

  const { email, statuses, companyId } = useSelector(store => ({
    email: store.email,
    statuses: store.statuses,
    companyId: store.id
}));

  let numberOfCard = "";

  if(cardLocation === "AdsPage") {
    numberOfCard = "col-md-6";
  }
  else if(cardLocation === "HomePage") {
    numberOfCard = "col-md-4";
  }

  let cardType = (
      <div className="card h-100 border rounded-3 shadow advert-card">
        <Link to={`/jobadvert/${job.id}`} className="card-link nav-link">
          <div className="image-container">
            <img src={'https://cdn.colaksoft.online/' + job.logoPath} className="card-img-top rounded-2 img-fluid" alt={job.title} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <hr className="my-2" />
            <p className="card-text mb-2">{job.companyName}</p>
            <p className="card-text mb-3 text-muted fst-italic">{job.adress}</p>
            <p className="card-text">{job.description}</p>
            {(statuses == "company" &&  companyId == job.company) &&
              <button className="btn btn-primary">Başvuruları Görüntüle</button>
            }
            {(statuses == "user" || statuses == null) &&
              <button className="btn btn-success">Başvur</button>
            }
            
          </div>
        </Link>
      </div>
  )

  if(cardLocation === "ProfileCompany" || cardLocation === "AdvertisementProceduresPage") {
    cardType = (
      <div className="card h-100 border rounded-3 shadow advert-card">
        <Link to={`/procedures/${email}/${job.id}`} className="card-link nav-link d-flex">
          <div className="image-container-for-company">
            <img src={'https://cdn.colaksoft.online/' + job.logoPath} className="card-img-top rounded-2 img-fluid" alt={job.title} />
          </div>
          <div className="card-body pb-0">
            <h5 className="card-title">{job.title}</h5>
            <p className="card-text mb-0 text-muted fst-italic">{job.adress}</p>
            <p className="card-text text-end text-muted fst-italic">{job.totalSalary} ₺</p>
          </div>
        </Link>
      </div>
    )
  }

  if(cardLocation === "ApplicationAdmin") {
    cardType = (
      <div className="card h-100 border rounded-3 shadow advert-card">
        <Link to={`/job-application/${email}/${job.id}`} className="card-link nav-link d-flex">
          <div className="image-container-for-company">
            <img src={'https://cdn.colaksoft.online/' + job.logoPath} className="card-img-top rounded-2 img-fluid" alt={job.title} />
          </div>
          <div className="card-body pb-0">
            <h5 className="card-title">{job.title}</h5>
            <p className="card-text mb-0 text-muted fst-italic">{job.adress}</p>
            <p className="card-text text-end text-muted fst-italic">{job.totalSalary} ₺</p>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className={`mb-4 card_padding card-for-job ${numberOfCard}`}>
      {cardType}
    </div>
  );
};

export default AdvertCard;