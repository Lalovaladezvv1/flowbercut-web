import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router';

import { useEffect } from 'react';
import { secureApiRequest } from '../services/api/secureApiClient';

export const App = () => {

  useEffect(() => {
    secureApiRequest<{ message: string }>(
      '/api/v1/security/test',
      {
        method: 'POST',
        body: {
          message: 'FLOWBERCUT secure test',
        },
      },
    )
      .then((response) => {
        console.log(
          'Respuesta segura:',
          response,
        );
      })
      .catch((error) => {
        console.error(
          'Error de payload seguro:',
          error,
        );
      });
  }, []);


  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};