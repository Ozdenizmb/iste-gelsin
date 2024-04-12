import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const AdvertCard = ({ job, cardLocation }) => {

  let numberOfCard = "";

  if(cardLocation === "AdsPage") {
    numberOfCard = "col-md-6";
  }
  else if(cardLocation === "HomePage") {
    numberOfCard = "col-md-4";
  }

  return (
    <div className={`mb-4 card_padding card-for-job ${numberOfCard}`}>
      <div className="card h-100 border rounded-3 shadow advert-card">
        <Link to={`/jobadvert/${job.id}`} className="card-link nav-link">
          <div className="image-container">
            <img src={'https://cdn.colaksoft.online/' + job.logoPath} className="card-img-top rounded-2 img-fluid" alt={job.title} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <hr className="my-2" />
            <p className="card-text mb-2">{job.companyName}</p>
            <p className="card-text mb-3 text-muted fst-italic">{job.districtName} / {job.cityName}</p>
            <p className="card-text">{job.description}</p>
            <button className="btn btn-success">Başvur</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdvertCard;