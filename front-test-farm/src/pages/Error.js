import React from 'react';
import PageContent from '../components/UI/PageContent';
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/Layout/MainNavigation';

const Error = () => {
  const error = useRouteError();

  let title = 'An ERROR occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not Found';
    message = 'OH! NO! 404...🤯';
  }
  return (
    <>
      <MainNavigation />
      <PageContent
        title={title}
        style={{ marginTop: '80px' }}
      >
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default Error;
