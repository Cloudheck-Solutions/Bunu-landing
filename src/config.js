// ==============================|| THEME CONFIG  ||============================== //

const config = {
  defaultPath: '',
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr',
  apiUrl:
    process.env.REACT_APP_ENVIRONMENT && process.env.REACT_APP_ENVIRONMENT !== 'dev' ? 'http://api.bunuapp.com' : 'http://127.0.0.1:8000',
  pusherApiKey: '52e38a6290a9e7ef4246',
  pusherCluster: 'mt1',
  pusherAuthEndpoint: '/broadcasting/auth'
};

export default config;
export const drawerWidth = 260;

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';
