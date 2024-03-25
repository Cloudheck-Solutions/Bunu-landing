import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const PaymentTransactions = Loadable(lazy(() => import('pages/payment-transactions')));
const PaymentConfigurations = Loadable(lazy(() => import('pages/payment-configuration')));

const Users = Loadable(lazy(() => import('pages/users')));
const User = Loadable(lazy(() => import('pages/user-detail')));
const AdminUsers = Loadable(lazy(() => import('pages/admin-users')));
const Skills = Loadable(lazy(() => import('pages/skills')));
const Notifications = Loadable(lazy(() => import('pages/notifications')));
const Chats = Loadable(lazy(() => import('pages/chats')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/admin',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <DashboardDefault />
    },
    {
      path: 'payment-transactions',
      element: <PaymentTransactions />
    },
    {
      path: 'payment-configurations',
      element: <PaymentConfigurations />
    },
    {
      path: 'users',
      element: <Users />
    },
    {
      path: 'user/:id',
      element: <User />
    },
    {
      path: 'admin-users',
      element: <AdminUsers />
    },
    {
      path: 'services',
      element: <Skills />
    },
    {
      path: 'notifications',
      element: <Notifications />
    },
    {
      path: 'chats',
      element: <Chats />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    }
  ]
};

export default MainRoutes;
