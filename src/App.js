// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { Alert } from '@mui/material';

import { useSelector } from 'react-redux';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const { showAlert, alertType, alertMessage } = useSelector((state) => state.alert);
  console.log(process.env.REACT_APP_ENVIRONMENT);
  return (
    <ThemeCustomization>
      <ScrollTop>
        {showAlert && <Alert severity={alertType}>{alertMessage}</Alert>}
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
