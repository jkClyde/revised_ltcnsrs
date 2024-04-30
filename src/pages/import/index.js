import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import keyMapping from './functions/key_mapping';
import { swapDayMonth, mapGender, mapPT, formatDateToYYYYMMDD } from './functions/functions';
import { calculateAgeInMonths } from 'pages/form/Data/Calculations';
import { lengthForAgeStatus, weightForAgeStatus, weigthForLengthStatus } from 'pages/form/Data/Calculations';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  LinearProgress
} from '@mui/material';

const ImportFile = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

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
      Promise.all(promises).then(() => {
        setOpenModal(true);
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFile(null);
    setFileName('');
    setSuccessCount(0);
    setFailCount(0);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
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
            <Typography variant="h5">Successes: {successCount}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Failures: {failCount}</Typography>
          </Grid>
          <Grid item xs={12}>
            {successCount + failCount > 0 && (
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <LinearProgress variant="determinate" value={(successCount / (successCount + failCount)) * 100} />
                </Box>
                <Box minWidth={35}>
                  <Typography variant="h4" color="textSecondary">
                    {((successCount / (successCount + failCount)) * 100).toFixed(0)}% Complete
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Upload Results</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Successes: {successCount}</Typography>
          <Typography variant="body1">Failures: {failCount}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ImportFile;
