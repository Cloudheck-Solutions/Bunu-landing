// assets
import { SlidersOutlined, CreditCardOutlined } from '@ant-design/icons';

// icons
const icons = {
  SlidersOutlined,
  CreditCardOutlined
};

// ==============================|| MENU ITEMS - PAYMENTS ||============================== //

const payment = {
  id: 'group-payment',
  title: 'Payment',
  type: 'group',
  children: [
    {
      id: 'payment-transactions',
      title: 'Payment Transactions',
      type: 'item',
      url: '/admin/payment-transactions',
      icon: icons.CreditCardOutlined
    },
    {
      id: 'payment-configurations',
      title: 'Payment Configurations',
      type: 'item',
      url: '/admin/payment-configurations',
      icon: icons.SlidersOutlined
    }
  ]
};

export default payment;
