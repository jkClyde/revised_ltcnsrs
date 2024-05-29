import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

const Forms = Loadable(lazy(() => import('pages/form')));
const Database = Loadable(lazy(() => import('pages/table')));
const Calendar = Loadable(lazy(() => import('pages/calendar/Calendar')));
const Import = Loadable(lazy(() => import('pages/import/index.js')));
const Profile = Loadable(lazy(() => import('pages/profile/index')));
const Users = Loadable(lazy(() => import('pages/users/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: '/free',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    },
    {
      path: 'forms',
      element: <Forms />
    },
    {
      path: 'database',
      element: <Database />
    },
    {
      path: 'calendar',
      element: <Calendar />
    },
    {
      path: 'import',
      element: <Import />
    },
    {
      path: 'profile',
      element: <Profile />
    },
    {
      path: 'users',
      element: <Users />
    }
  ]
};

export default MainRoutes;
