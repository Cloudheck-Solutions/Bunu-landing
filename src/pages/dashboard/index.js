import { useState, useEffect } from 'react';

// material-ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// project import
import PaymentTable from './PaymentTable';
import UserChart from './UserChart';
import PaymentBarChart from './PaymentBarChart';
import MainCard from 'components/MainCard';
import AnalyticCard from 'components/cards/statistics/AnalyticCard';
import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { serviceError, summaryValueCheck } from 'utils/helper';
import { useDispatch } from 'react-redux';
import { paymentChart, summary } from 'services/dashboardService';
import PageLoader from 'components/PageLoader';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [slot, setSlot] = useState('week');
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [artisan, setArtisan] = useState(null);
  const [client, setClient] = useState(null);
  const [payment, setPayment] = useState(null);

  const [totalPayment, setTotalPayment] = useState(0);
  const [paymentChartData, setpaymentChartData] = useState([
    {
      data: [0, 0, 0, 0, 0, 0, 0]
    }
  ]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await summary();
        if (res.status === 200) {
          setUser(res.data.data.users);
          setArtisan(res.data.data.artisans);
          setClient(res.data.data.clients);
          setPayment(res.data.data.payments);
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    fetchSummary();
  }, [dispatch]);

  useEffect(() => {
    const fetchPaymentChart = async () => {
      try {
        const res = await paymentChart();
        if (res.status === 200) {
          setTotalPayment(res.data.data.total);
          setpaymentChartData([
            {
              data: res.data.data.data
            }
          ]);
        }
      } catch (err) {
        dispatch(setAlertMessage({ alertMessage: serviceError(err) }));
        dispatch(setAlertType({ alertType: 'error' }));
        dispatch(setShowAlert({ showAlert: true }));
        setTimeout(() => {
          dispatch(setShowAlert({ showAlert: false }));
        }, 3000);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    fetchPaymentChart();
  }, [dispatch]);
  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {/* row 1 */}
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticCard
              title="Total Users"
              count={summaryValueCheck(user, user ? user.total : '0')}
              percentage={summaryValueCheck(user, user ? user.percentage : '0')}
              extra={summaryValueCheck(user, user ? user.today : '0')}
              isLoss={user ? user.percentage < 0 : true}
              color={user ? (user.percentage === 0 ? 'warning' : user.percentage > 0 ? 'primary' : 'error') : 'error'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticCard
              title="Total Artisans"
              count={summaryValueCheck(artisan, artisan ? artisan.total : '0')}
              percentage={summaryValueCheck(artisan, artisan ? artisan.percentage : '0')}
              extra={summaryValueCheck(artisan, artisan ? artisan.today : '0')}
              isLoss={artisan ? artisan.percentage < 0 : true}
              color={artisan ? (artisan.percentage === 0 ? 'warning' : artisan.percentage > 0 ? 'primary' : 'error') : 'error'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticCard
              title="Total Clients"
              count={summaryValueCheck(client, client ? client.total : '0')}
              percentage={summaryValueCheck(client, client ? client.percentage : '0')}
              extra={summaryValueCheck(client, client ? client.today : '0')}
              isLoss={client ? client.percentage < 0 : true}
              color={client ? (client.percentage === 0 ? 'warning' : client.percentage > 0 ? 'primary' : 'error') : 'error'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticCard
              title="Total Payment"
              count={`₦${summaryValueCheck(payment, payment ? payment.total : '0')}`}
              percentage={summaryValueCheck(payment, payment ? payment.percentage : '0')}
              extra={summaryValueCheck(payment, payment ? payment.today : '0')}
              isLoss={payment ? payment.percentage < 0 : true}
              color={payment ? (payment.percentage === 0 ? 'warning' : payment.percentage > 0 ? 'primary' : 'error') : 'error'}
            />
          </Grid>

          <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

          {/* row 2 */}
          <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">User Signup</Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={0}>
                  <Button
                    size="small"
                    onClick={() => setSlot('month')}
                    color={slot === 'month' ? 'primary' : 'secondary'}
                    variant={slot === 'month' ? 'outlined' : 'text'}
                  >
                    Month
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setSlot('week')}
                    color={slot === 'week' ? 'primary' : 'secondary'}
                    variant={slot === 'week' ? 'outlined' : 'text'}
                  >
                    Week
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            <MainCard content={false} sx={{ mt: 1.5 }}>
              <Box sx={{ pt: 1, pr: 2 }}>
                <UserChart slot={slot} />
              </Box>
            </MainCard>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Payment Overview</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Stack spacing={2}>
                  <Typography variant="h6" color="textSecondary">
                    This Week Statistics
                  </Typography>
                  <Typography variant="h3">₦{totalPayment.toLocaleString()}</Typography>
                </Stack>
              </Box>
              <PaymentBarChart paymentChartData={paymentChartData} />
            </MainCard>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Recent Payments</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <PaymentTable />
            </MainCard>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DashboardDefault;
