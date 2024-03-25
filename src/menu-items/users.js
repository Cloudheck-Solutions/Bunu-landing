// assets
import { UserOutlined, ToolOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined,
  ToolOutlined
};

// ==============================|| MENU ITEMS - USERS ||============================== //
const users = {
  id: 'group-user',
  title: 'Account & Service Management',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/admin/users',
      icon: icons.UserOutlined
    },
    {
      id: 'services',
      title: 'Services',
      type: 'item',
      url: '/admin/services',
      icon: icons.ToolOutlined
    },
    {
      id: 'admin-users',
      title: 'Admin Users',
      type: 'item',
      url: '/admin/admin-users',
      icon: icons.UserOutlined
    }
  ]
};

export default users;
