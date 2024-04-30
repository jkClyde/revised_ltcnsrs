import React from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';

function ClearConfirmationModal({ open, onClose, onConfirmClear }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          width: '70%',
          maxWidth: 600,
          bgcolor: 'white',
          borderRadius: 8,
          boxShadow: 24,
          p: 4,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Confirm Form Clearance
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Are you sure you want to clear the form? This action cannot be undone.
        </Typography>
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="outlined" color="secondary" onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirmClear}>
            Clear
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ClearConfirmationModal;
