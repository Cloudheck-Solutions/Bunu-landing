import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';

// render - login
const Landing = Loadable(lazy(() => import('pages/landing')));

// ==============================|| AUTH ROUTING ||============================== //

const LandingRoutes = {
  path: '/',
  children: [
    {
      path: '',
      element: <Landing />
    }
  ]
};

export default LandingRoutes;
