import { Route, Routes } from 'react-router-dom';

import { LandingPage } from '../../pages/Landing';
import { LoginPage } from '../../pages/Login';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};