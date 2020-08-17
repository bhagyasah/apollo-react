import React from 'react';

const LaunchDetail = ({ id, site, rocket, mission }) => (
  <div>
    <h3>
      {rocket && rocket.name} ({rocket && rocket.type})
    </h3>
<h3>{mission.name}</h3>
    <h5>{site}</h5>
  </div>
);

/**
 * STYLED COMPONENTS USED IN THIS FILE ARE BELOW HERE
 */

export default LaunchDetail;
