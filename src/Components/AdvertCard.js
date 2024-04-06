import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AdvertCard = ({ job }) => {
  return (
    <div className="col-md-4 mb-4 card_padding card-for-job">
      <div className="card h-100 border rounded-3 shadow advert-card">
        <Link to={`/jobadvert/${job.id}`} className="card-link nav-link">
          <div className="image-container">
            <img src={'https://cdn.colaksoft.online/' + job.logoPath} className="card-img-top rounded-2 img-fluid" alt={job.title} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <hr className="my-2" />
            <p className="card-text mb-2">{job.company}</p>
            <p className="card-text mb-3 text-muted fst-italic">{job.districtId}/{job.cityId}</p>
            <p className="card-text">{job.description}</p>
            <button className="btn btn-success">Başvur</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdvertCard;