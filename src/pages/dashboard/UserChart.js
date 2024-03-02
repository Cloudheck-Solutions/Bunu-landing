import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

import { setShowAlert, setAlertType, setAlertMessage } from 'store/reducers/alert';
import { serviceError } from 'utils/helper';
import { useDispatch } from 'react-redux';
import { userStats } from 'services/dashboardService';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| USER CHART ||============================== //

const UserChart = ({ slot }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories:
          slot === 'month'
            ? Array.from({ length: 31 }, (_, index) => (index + 1).toString())
            : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
  }, [primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([
    {
      name: 'Clients',
      data:
        slot === 'month'
          ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          : [0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Artisans',
      data:
        slot === 'month'
          ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          : [0, 0, 0, 0, 0, 0, 0]
    }
  ]);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await userStats(slot);
        if (res.status === 200) {
          setSeries(res.data.data);
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
    fetchChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

UserChart.propTypes = {
  slot: PropTypes.string
};

export default UserChart;
