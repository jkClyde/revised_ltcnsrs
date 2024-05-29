import { Box } from '@mui/material';
// import Header from "../../../components/dashboard_components/Header";
// import PieChart from "../../../components/charts/LineChart";

import PieChart from 'components/charts/PieChart';
import Header from 'components/Header';

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Population" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Line;
