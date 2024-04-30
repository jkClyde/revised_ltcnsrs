// assets
import { DashboardOutlined } from '@ant-design/icons';
import { FormOutlined } from '@ant-design/icons';
import { DatabaseOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  FormOutlined,
  DatabaseOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'forms',
      title: 'Forms',
      type: 'item',
      url: '/forms',
      icon: icons.FormOutlined,
      breadcrumbs: false
    },
    {
      id: 'database',
      title: 'Database',
      type: 'item',
      url: '/database',
      icon: icons.DatabaseOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
