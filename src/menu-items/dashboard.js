// assets
import { DashboardOutlined, ChromeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  ChromeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Menu',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
    // {
    //   id: 'sample-page',
    //   title: 'Sample Page',
    //   type: 'item',
    //   url: '/admin/sample-page',
    //   icon: icons.ChromeOutlined
    // }
  ]
};

export default dashboard;
