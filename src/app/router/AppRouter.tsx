import { Route, Routes } from 'react-router-dom';

import { LandingPage } from '../../pages/Landing';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};