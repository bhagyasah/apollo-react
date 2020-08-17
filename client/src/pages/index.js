import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Launches from './launches';
import Launch from './launch';
import { Footer, PageContainer,  } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <div>
        <Router primary={false} component={Fragment}>
          <Launches path="/" />
          <Launch path="launch/:launchId" />
        </Router>
      </div>
    </Fragment>
  );
}
