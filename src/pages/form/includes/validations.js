import * as Yup from 'yup';

export const childSchema = Yup.object().shape({
  last_name: Yup.string().required('Surname is required'),
  first_name: Yup.string().required('First name is required'),
  middle_name: Yup.string().required('Middle name is required'),
  date_of_birth: Yup.date().required('Birthdate is required'),
  gender: Yup.string().required('Gender is required'),
  birth_weight: Yup.number().required('Birth weight is required'),
  birth_order: Yup.number().required('Birth order is required'),
  house_number: Yup.string().required('House number is required'),
  sitio: Yup.string().required('Sitio is required'),
  barangay: Yup.string().required('Barangay is required'),
  status_of_residency: Yup.string().required('Status of residency is required'),
  length_of_stay: Yup.number().required('Length of stay is required'),
  duration_type: Yup.string().required('Duration type is required'),

  father_first_name: Yup.string().required('Surname is required'),
  father_last_name: '',
  father_middle_name: '',
  father_suffix: '',
  father_age: '',
  father_ethnicity: '',
  father_occupation: '',
  father_religion: '',
  father_contact_number: ''
});
