import React, { useState, useCallback } from 'react';
import { Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import { ChildSection, ParentSection, ChildHealthInfo, AddressSection } from './sections/index';
import { SuccessModal, ClearConfirmationModal } from './modals/index';
import { InitialFormData, childSchema } from './includes/index';
import { addChild } from './includes/index';

// Memoize ChildSection component
const MemoizedChildSection = React.memo(ChildSection);
// Memoize AddressSection component
const MemoizedAddressSection = React.memo(AddressSection);
// Memoize ParentSection component
const MemoizedParentSection = React.memo(ParentSection);
// Memoize ChildHealthInfo component
const MemoizedChildHealthInfo = React.memo(ChildHealthInfo);

function StylishForm() {
  const [clearConfirmationOpen, setClearConfirmationOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: InitialFormData,
    validationSchema: childSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      addChild(values, setSuccess);
    }
  });

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      formik.setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    },
    [formik]
  );

  const handleClearForm = useCallback(() => {
    setClearConfirmationOpen(true);
  }, []);

  const handleConfirmClear = useCallback(() => {
    formik.resetForm();
    setClearConfirmationOpen(false);
  }, [formik]);

  const handleCloseClearConfirmation = useCallback(() => {
    setClearConfirmationOpen(false);
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* Use memoized components */}
        <MemoizedChildSection formik={formik} handleInputChange={handleInputChange} />
        <br />
        <MemoizedAddressSection formik={formik} handleInputChange={handleInputChange} />
        <br />
        <MemoizedParentSection formik={formik} handleInputChange={handleInputChange} />
        <br />
        <MemoizedChildHealthInfo formik={formik} handleInputChange={handleInputChange} />
        <br />
        <SuccessModal open={success} setSuccess={setSuccess} />
        <ClearConfirmationModal open={clearConfirmationOpen} onClose={handleCloseClearConfirmation} onConfirmClear={handleConfirmClear} />
        <Box display="flex" justifyContent="center">
          <Box m={1}>
            <Button variant="contained" color="error" onClick={handleClearForm}>
              Clear
            </Button>
          </Box>
          <Box m={1}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
      <br />
    </div>
  );
}

export default StylishForm;
