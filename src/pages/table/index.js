import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

// Tabs
import Masterlist from './database/masterlist/masterlist';
import Archived from './database/archived/archived';
const Team = () => {
  const [tabValue, setTabValue] = useState(0); // State to manage active tab

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box m="10px">
      <Tabs value={tabValue} onChange={handleChangeTab} aria-label="Tabs">
        <Tab label="Masterlist" />
        <Tab label="Archived" />
      </Tabs>
      {tabValue === 0 && <Masterlist />}
      {tabValue === 1 && <Archived />}
    </Box>
  );
};

export default Team;
