import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AdvertCard = ({ job }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 border rounded-3 shadow">
        <Link to={`/jobadvert/${job.id}`} className="card-link nav-link">
          <img src={job.image} className="card-img-top rounded-2" alt={job.title} />
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <hr className="my-2" />
            <p className="card-text mb-2">{job.company}</p>
            <p className="card-text mb-3 text-muted fst-italic">{job.location}</p>
            <p className="card-text">{job.description}</p>
            <button className="btn btn-success">Başvur</button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdvertCard;