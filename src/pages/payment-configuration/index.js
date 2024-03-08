// material-ui
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Chip } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import PageLoader from 'components/PageLoader';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { paymentConfiguration, updatePaymentConfiguration } from 'services/paymentService';
import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { serviceError } from 'utils/helper';

// ==============================|| PAYMENT CONFIGURATIONS ||============================== //

const PaymentConfigurations = () => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentChannel, setPaymentChannel] = useState(['']);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchPaymentConfig = async () => {
      setIsLoading(true);
      try {
        const res = await paymentConfiguration();
        if (res.status === 200) {
          setPaymentAmount(res.data.data.amount);
          setPaymentChannel(res.data.data.channels);
        }
      } catch (err) {
        dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
        dispatch(setAlertType({ alertType: 'error' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
      }
      setIsLoading(false);
    };
    fetchPaymentConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const handlePaymentAmountChange = (event) => {
    setPaymentAmount(event.target.value);
  };

  const handlePaymentChannelChange = (event) => {
    const {
      target: { value }
    } = event;
    setPaymentChannel(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        amount: paymentAmount,
        channels: paymentChannel
      };
      const res = await updatePaymentConfiguration(payload);
      if (res.status === 200) {
        setReload((prev) => !prev);
      }
    } catch (err) {
      dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
      dispatch(setAlertType({ alertType: 'error' }));
      dispatch(setShowAlert({ showAlert: true }));
      setTimeout(() => {
        dispatch(setShowAlert({ showAlert: false }));
      }, 3000);
    }
  };

  return (
    <MainCard title="Payment Configuration">
      {isLoading ? (
        <PageLoader />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Connection Payment Amount" value={paymentAmount} onChange={handlePaymentAmountChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Paystack Payment Channel</InputLabel>
              <Select
                multiple
                value={paymentChannel}
                onChange={handlePaymentChannelChange}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                <MenuItem value="card">Card</MenuItem>
                <MenuItem value="bank">Bank</MenuItem>
                <MenuItem value="ussd">USSD</MenuItem>
                <MenuItem value="qr">QR</MenuItem>
                <MenuItem value="mobile_money">Mobile Money</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save Configuration
            </Button>
          </Grid>
        </Grid>
      )}
    </MainCard>
  );
};

export default PaymentConfigurations;
