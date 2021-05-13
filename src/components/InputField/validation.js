import * as yup from 'yup';
import 'yup-phone';

const defaultValidationPatterns = {
  tel: /^[0-9 ]{11,}$/,
  number: /^[0-9]+$/,
  email: /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])/i,
  text: /^[\sA-Za-z0-9_.'&-]+$/,
};


function isEmpty(value, required, type) {
  let empty;
  if (required === true && (!value || value === false)) {
    empty = true;
  } else if (value && type !== 'checkbox') {
    empty = false;
  }
  return empty;
}


async function runYupValidation(type, value) {
  let schema;

  if (type === 'email') {
    schema = yup.object().shape({ email: yup.string().email() });
    return schema.isValid({ email: value });
  } else if (type === 'tel') {
    schema = yup.object().shape({ tel: yup.string().phone() });
    return schema.isValid({ tel: value });
  }
  return false;
}

async function isValidInput(type, props, fieldVal) {
  let valid;
  // use pattern override if it's defined, otherwise use default pattern above
  const patternOverride = typeof props.pattern === 'string' && props.pattern !== '' ? new RegExp(props.pattern) : props.pattern;
  const pattern = patternOverride || defaultValidationPatterns[type];

  if (props.yupValidation) {
    // check value, based on type, against Yup validation
    valid = await runYupValidation(type, fieldVal);
  } else if (type === 'number') {
    // Number fields need to not only pass the regex test,
    // but also pass min and max values allowed if they're set.
    const min = props.min;
    const max = props.max;
    const valueIsNumber = pattern.test(fieldVal);
    if (valueIsNumber === true) {
      // Value passes regex test.
      // Check if min or max or both exist and value passes accordingly
      if ((!min && max && fieldVal <= max) ||
        (min && !max && fieldVal >= min) ||
        (min && max && (fieldVal >= min && fieldVal <= max))) {
        // value is within the min/max boundaries
        valid = true;
      } else {
        // value is outside min/max boundaries
        valid = false;
      }
    } else {
      // value doesn't pass regex test
      valid = false;
    }
  } else {
    // Other input fields just have to pass the regex test
    valid = pattern.test(fieldVal);
  }
  return valid;
}


function getMessage(input, props, type, value) {
  // Input can be empty or invalid.
  // Use error message override if available otherwise use default empty/invalid message
  let message = input === 'empty' ? props.emptyError : props.invalidError;
  if (!message) {
    // Default error messages are based on the type of input field
    // and whether the input is empty or invalid
    const fieldName = props.label.toLowerCase();
    switch (type) {
      case 'number': {
        // Number field's error message contains min and max value messages if they're set
        const min = props.min;
        const max = props.max;
        if ((!min && max) && (input === 'empty' || value > max)) {
          message = input === 'empty' ? `Please fill in a value below ${max}` : `This field only accepts a number below ${max}`;
        } else if ((min && !max) && (input === 'empty' || value < min)) {
          message = input === 'empty' ? `Please fill in a value above ${min}` : `This field only accepts a number above ${min}`;
        } else if ((min && max) && (input === 'empty' || (value < min || value > max))) {
          message = input === 'empty' ? `Please fill in a value between ${min} and ${max}` : `This field only accepts a number between ${min} and ${max}`;
        } else {
          message = 'Please enter a number';
        }
        break;
      }
      case 'tel':
      case 'email':
        message = input === 'empty' ? `Please fill in your ${fieldName}` : `Please fill in a valid ${fieldName}`;
        break;
      case 'checkbox':
        message = `Please check the ${fieldName} checkbox`;
        break;
      case 'text':
      default:
        message = input === 'empty' ? `Please fill in your ${fieldName}` : 'This field only accepts alphanumeric characters and \' . - & _ ';
        break;
    }
  }
  return message;
}

/**
 * Validate input fields
 * returns validation object containing whether the field is valid and an error message
 */
export default async function fieldValidation(props, validation) {
  const updatedValidation = validation;
  const type = props.type;
  const value = type === 'checkbox' ? props.field.checked : props.field.value;
  const emptyField = isEmpty(value, props.required, type);
  updatedValidation.value = value;
  if (emptyField === true) {
    updatedValidation.valid = false;
    updatedValidation.message = getMessage('empty', props);
    updatedValidation.showErrorMessage = true;
  } else if (emptyField === false) {
    const validInput = await isValidInput(type, props, value);
    updatedValidation.valid = validInput !== false;
    updatedValidation.message = validInput === false ? getMessage('invalid', props, type, value) : '';
    updatedValidation.showErrorMessage = validInput !== true;
  } else {
    updatedValidation.valid = true;
    updatedValidation.message = '';
    updatedValidation.showErrorMessage = false;
  }
  return validation;
}

