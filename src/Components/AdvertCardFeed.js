import React from 'react';
import AdvertCard from './AdvertCard';

const AdvertCardFeed = ({ jobs }) => {
    return (
        <div className="row">
          {jobs.map((job, index) => (
            <AdvertCard key={index} job={job} />
          ))}
        </div>
      );
};

export default AdvertCardFeed;