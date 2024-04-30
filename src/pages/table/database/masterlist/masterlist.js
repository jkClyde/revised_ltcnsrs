import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbarColumnsButton, GridToolbarFilterButton } from '@mui/x-data-grid';

import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Typography } from '@mui/material';

import { DownloadOutlined as DownloadOutlinedIcon } from '@mui/icons-material';
import fetchChildData from 'pages/table/actions/action';
import { columns } from './columns';
import * as XLSX from 'xlsx';
import keyMapping from './functions/key_mapping';
import { swapDayMonth, mapGender, mapPT, formatDateToYYYYMMDD } from './functions/functions';
import { calculateAgeInMonths } from 'pages/form/Data/Calculations/calculateAgeInMonths';
import { lengthForAgeStatus, weightForAgeStatus, weigthForLengthStatus } from 'pages/form/Data/Calculations';

function MyDataGrid() {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [childData, setChildData] = useState([]);
  const [openImportModal, setOpenImportModal] = useState(false); // State to control the modal

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);

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

  const handleImportToggle = () => {
    setFile(null);
    setFileName('');
    setSuccessCount(0);
    setFailCount(0);
    setOpenImportModal((prev) => !prev);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setFile(true);
    setFileName(file.name);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const line7Value = sheet['A7'].v;
      const barangayName = line7Value.length > 1 ? line7Value[1].trim() : '';
      const formattedBarangayName = barangayName.charAt(0).toUpperCase() + barangayName.slice(1).toLowerCase();
      const barangayJSON = {
        barangay: formattedBarangayName
      };

      const json = XLSX.utils.sheet_to_json(sheet, { range: 8 });
      json.forEach((item) => {
        Object.assign(item, barangayJSON);
      });

      const transformedData = json.map((item) => {
        const transformedItem = {};
        for (const sourceKey in item) {
          if (keyMapping[sourceKey]) {
            if (sourceKey === 'DOB' || sourceKey === 'DOW' || sourceKey === '__EMPTY_4' || sourceKey === '__EMPTY_3') {
              transformedItem[keyMapping[sourceKey]] = swapDayMonth(formatDateToYYYYMMDD(item[sourceKey]));
            } else if (sourceKey === 'SEX' || sourceKey === '__EMPTY_2') {
              transformedItem[keyMapping[sourceKey]] = mapGender(item[sourceKey]);
            } else if (sourceKey === 'P/T' || sourceKey === '__EMPTY_12') {
              transformedItem[keyMapping[sourceKey]] = mapPT(item[sourceKey]);
            } else if (sourceKey === 'NAME OF CHILD' || sourceKey === '__EMPTY_1') {
              const [last_name, first_name] = item[sourceKey].split(',').map((namePart) => namePart.trim());
              transformedItem['first_name'] = first_name;
              transformedItem['last_name'] = last_name || '';
            } else {
              transformedItem[keyMapping[sourceKey]] = item[sourceKey];
            }
          }
        }
        transformedItem['aim'] = calculateAgeInMonths(transformedItem[keyMapping['DOB']]);
        transformedItem['lfa'] = lengthForAgeStatus(
          transformedItem[keyMapping['DOB']],
          transformedItem[keyMapping['HT']],
          transformedItem[keyMapping['SEX']]
        );

        transformedItem['wfa'] = weightForAgeStatus(
          transformedItem[keyMapping['DOB']],
          transformedItem[keyMapping['WT']],
          transformedItem[keyMapping['SEX']]
        );

        transformedItem['wfl'] = weigthForLengthStatus(
          transformedItem[keyMapping['DOB']],
          transformedItem[keyMapping['HT']],
          transformedItem[keyMapping['WT']],
          transformedItem[keyMapping['SEX']]
        );
        return transformedItem;
      });

      const promises = transformedData.map((item) => {
        return fetch('http://127.0.0.1:8000/child/add-child/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        })
          .then((response) => {
            if (response.ok) {
              setSuccessCount((prevCount) => prevCount + 1);
            } else {
              setFailCount((prevCount) => prevCount + 1);
            }
          })
          .catch((error) => {
            console.error('Error sending data:', error);
            setFailCount((prevCount) => prevCount + 1);
          });
      });
      Promise.all(promises).then(() => {});
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    const filtered = childData.filter(
      (row) =>
        !row.is_archieved &&
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

        <Button
          sx={{
            backgroundColor: '#a4a9fc',
            color: '#141414',
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
            marginRight: '10px'
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: '10px' }} />
          Export Data
        </Button>
        <Button
          sx={{
            backgroundColor: '#a4a9fc',
            color: '#141414',
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
            marginRight: '10px'
          }}
          onClick={handleImportToggle} // Toggle modal on button click
        >
          <DownloadOutlinedIcon sx={{ mr: '10px' }} />
          Import Data
        </Button>
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

      {/* Import Data Modal */}
      <Dialog open={openImportModal} onClose={handleImportToggle} maxWidth="sm" fullWidth>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input type="file" onChange={handleFileUpload} />
            </Grid>
            <Grid item xs={12}>
              {file && (
                <Typography variant="h2" style={{ fontSize: '36px', fontWeight: 'bold', color: 'blue' }}>
                  Uploaded File: {fileName}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {successCount + failCount > 0 && (
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <Typography variant="body1">Successes: {successCount}</Typography>
                    <Typography variant="body1">Failures: {failCount}</Typography>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImportToggle}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MyDataGrid;
