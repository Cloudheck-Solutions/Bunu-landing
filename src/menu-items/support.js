// assets
import { NotificationOutlined, MessageOutlined } from '@ant-design/icons';

// icons
const icons = {
  NotificationOutlined,
  MessageOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //
const users = {
  id: 'group-support',
  title: 'Notification & Support',
  type: 'group',
  children: [
    {
      id: 'notification',
      title: 'Notifications',
      type: 'item',
      url: '/admin/notifications',
      icon: icons.NotificationOutlined
    },
    {
      id: 'chat',
      title: 'Support Messages',
      type: 'item',
      url: '/admin/chats',
      icon: icons.MessageOutlined
    }
  ]
};

export default users;
