import axios from 'axios';
import { lengthForAgeStatus, weightForAgeStatus, weigthForLengthStatus, calculateAgeInMonths } from '../Data/Calculations';

// Handle submit button click
export const addChild = async (formData, setSuccess) => {
  try {
    const data = {};

    // Iterate over the keys in formData and add them to the data object
    Object.entries(formData).forEach(([key, value]) => {
      const snakeCaseKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      data[snakeCaseKey] = value;
    });

    // Calculate additional data
    const lfa = lengthForAgeStatus(formData.date_of_birth, formData.height, formData.gender);
    const wfa = weightForAgeStatus(formData.date_of_birth, formData.weight, formData.gender);
    const wfl = weigthForLengthStatus(formData.date_of_birth, formData.height, formData.weight, formData.gender);
    const aim = calculateAgeInMonths(formData.date_of_birth);
    // Add additional data to the data object
    data['lfa'] = lfa;
    data['wfa'] = wfa;
    data['wfl'] = wfl;
    data['aim'] = aim;

    // Log the data object to the console
    console.log(data);

    // Send POST request
    const response = await axios.post('http://127.0.0.1:8000/child/add-child/', data);

    // Handle successful response
    console.log('Response:', response.data);
    setSuccess(true);
  } catch (error) {
    // Handle error
    console.error('Error:', error);
  }
};
