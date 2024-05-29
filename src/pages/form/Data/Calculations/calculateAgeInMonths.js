export const calculateAgeInMonths = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);

  let ageInMonths = (today.getFullYear() - birthDate.getFullYear()) * 12;
  ageInMonths -= birthDate.getMonth();
  ageInMonths += today.getMonth();

  return ageInMonths;
};
