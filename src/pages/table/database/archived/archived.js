import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarColumnsButton, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Box, TextField } from '@mui/material';

import fetchChildData from 'pages/table/actions/action';
import { columns } from './columns';

function Archived() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [childData, setChildData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChildData();
      setChildData(data);
      setFilteredData(data);
      console.log(filteredData);
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = childData.filter(
      (row) =>
        row.is_archieved &&
        Object.values(row).some((value) => value !== null && value.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [searchQuery, childData]);

  return (
    <Box
      m="0px 10px"
      sx={{
        '& .MuiDataGrid-root': {
          border: 'none'
        },
        '& .MuiDataGrid-cell': {
          border: '1px solid',
          borderColor: '#a4a9fc',
          justifyContent: 'center'
        },
        '& .centered-cell': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '& .name-column--cell': {
          color: '#2e7c67'
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#a4a9fc',
          borderBottom: 'none'
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: '#f2f0f0'
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: '#a4a9fc'
        },
        '& .MuiCheckbox-root': {
          color: '#1e5245'
        }
      }}
    >
      <Box display="flex" justifyContent="flex-end" alignItems="center" p="10px">
        <TextField label="Search" variant="outlined" value={searchQuery} onChange={handleSearchChange} style={{ marginRight: '10px' }} />
      </Box>

      <DataGrid
        rows={filteredData}
        columns={columns}
        sx={{ height: '65vh' }}
        onRowClick={(params, event) => handleRowClick(params, event)}
        components={{
          Toolbar: () => (
            <div>
              <GridToolbarColumnsButton />
              <GridToolbarFilterButton />
            </div>
          )
        }}
      />
    </Box>
  );
}

export default Archived;
