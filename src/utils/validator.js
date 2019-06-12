const isArrayNotEmpty = value => Array.isArray(value) && value.length > 0;

export const validate = (validation, value) => {
  let isValid;
  switch (validation.type) {
    case 'email':
      isValid = !value || /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(value);
      break;
    case 'number':
      isValid = /[^\d,]/g.test(value);
      break;
    case 'tel':
      isValid = /^(.{4})(.*)(.{6})$/g.test(value);
      break;
    case 'comparePasswords':
      isValid = value && value.newPassword === value.confirmPassword;
      break;
    case 'isRequired':
      isValid = value && value !== null && value !== '';
      break;
    case 'minSize':
      if (value) {
        isValid = value && value.length >= validation.condition;
      } else isValid = true;
      break;
    case 'maxSize':
      if (value) {
        isValid = value && value.length <= validation.condition;
      } else isValid = true;
      break;
    default:
      break;
  }
  if (!isValid) {
    return validation;
  }
  return false;
};

export const validateAll = (validations, values) => {
  const valids = Object.keys(validations);
  if (valids.length > 0) {
    return valids.reduce((acc, key) => {
      if (isArrayNotEmpty(validations[key])) {
        const result = validations[key].map(v => validate(v, values[key])).filter(e => !!e);
        return (isArrayNotEmpty(result)) ? { ...acc, [key]: result } : acc;
      } return acc;
    }, {});
  } return {};
};

export default validateAll;
