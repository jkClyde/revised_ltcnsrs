import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import Statistics from 'components/Statistics';

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

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({ slot }) => {
  const theme = useTheme();
  const statsData = Statistics();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      // theme.palette.primary[600]
      colors: ['#ff0000', '#ffcccc', ' #2ecc71', '#FFFF00'],
      xaxis: {
        categories:
          slot === 'month' || slot === 'week' || slot === 'day'
            ? [
                'Alno',
                'Alapang',
                'Pico',
                'Wangal',
                'Cruz',
                'Poblacion',
                'Puguis',
                'Ambiong',
                'Balili',
                'Bahong',
                'Beckel',
                'Bineng',
                'Betag',
                'Lubas',
                'Shilan',
                'Tawang'
              ]
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
        tickAmount: slot === 'month' ? 15 : 15
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
      name: 'Severely underweight',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Underweight',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Normal',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Overweight',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Severely underweight',
        data:
          slot === 'month' ? statsData.data_wfa_severe : slot === 'day' ? statsData.data_wfl_severe_and_wasted : statsData.data_lfa_severe
      },

      {
        name: slot === 'day' ? 'obese' : 'Underweight',
        data: slot === 'month' ? statsData.data_wfa_underweight : slot === 'day' ? statsData.data_wfl_obese : statsData.data_lfa_underweight
      },
      {
        name: 'Normal',
        data: slot === 'month' ? statsData.data_wfa_normal : slot === 'day' ? statsData.data_wfa_normal : statsData.data_lfa_normal
      },
      {
        name: 'Overweight',
        data:
          slot === 'month' ? statsData.data_wfa_overweight : slot === 'day' ? statsData.data_wfl_overweight : statsData.data_lfa_overweight
      }
    ]);
  }, [slot, statsData.data_wfa_severe, statsData.data_wfa_underweight, statsData.data_wfa_normal, statsData.data_wfa_overweight]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
  slot: PropTypes.string
};

export default IncomeAreaChart;
