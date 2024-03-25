// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { Snackbar } from '@mui/material';

import { useSelector } from 'react-redux';
import { useState } from 'react';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const [state] = useState({
    vertical: 'top',
    horizontal: 'center'
  });
  const { vertical, horizontal } = state;

  const { showAlert, alertMessage } = useSelector((state) => state.alert);
  return (
    <ThemeCustomization>
      <ScrollTop>
        {showAlert && (
          <Snackbar anchorOrigin={{ vertical, horizontal }} open={showAlert} message={alertMessage} key={vertical + horizontal} />
        )}
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
