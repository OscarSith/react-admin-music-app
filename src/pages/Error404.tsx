import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="w-50 mx-auto mt-5 text-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Regresar al Home</Link>
    </div>
  );
};
