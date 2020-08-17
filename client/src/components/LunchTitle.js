import React from 'react';
import { Link } from '@reach/router';

export default ({ launch }) => {
  const { id, mission, rocket } = launch;
  return(
    <Link
    to={`/launch/${id}`}
    >
    <div style={{ backgroundColor: '#f5f5f5'}}>
      <h3>{mission.name}</h3>
      <h5>{rocket.name}</h5>
    </div>
    </Link>
  )
}
