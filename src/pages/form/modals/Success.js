import { Typography, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const SuccessModal = ({ open, setSuccess }) => {
  const onClose = () => {
    setSuccess(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h6">Success</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">Child added successfully!</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessModal;
