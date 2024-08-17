const validateEmail = (userEmail) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const res = emailRegex.test(userEmail);
  if (!res) return "Enter Valid Email";

  return null;
};

const validatePassword = (userPassword) => {
  const passwordRegex = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const res = passwordRegex.test(userPassword);
  if (!res) return "Enter Valid Password";

  return null;
};

export const checkDataValidation = (userEmail, userPassword) => {
  const emailRes = validateEmail(userEmail);
  // const passwordRes = validatePassword(userPassword);
  const passwordRes = null;

  return [emailRes, passwordRes];
};
