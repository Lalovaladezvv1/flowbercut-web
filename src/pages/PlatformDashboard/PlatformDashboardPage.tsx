import { useNavigate } from 'react-router-dom';

import { PlatformDashboardTemplate } from '../../components/templates/PlatformDashboardTemplate';

export const PlatformDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <PlatformDashboardTemplate
      onManageTenants={() => navigate('/platform/barberias')}
    />
  );
};