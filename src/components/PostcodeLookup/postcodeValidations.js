// Passed to the PCLU component as default prop value
const defaultPostcodeValidation = {
  GB: {
    pattern: '^((GIR 0AA)|((([A-Za-z][0-9][0-9]?)|(([A-Za-z][A-Ha-hJ-Yj-y][0-9][0-9]?)|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2}))$',
    errorMsg: 'Please enter a valid UK postcode, using a space. For non-UK addresses, please use manual entry below.',
  },
};

// Generic pattern and error message used if user selects a country
// that isn't selected above, or in any override
const fallbackPostcodeValidation = {
  pattern: '[^(?!\s*$).+]',
  errorMsg: 'Please enter a valid postcode',
};

// Goofy values just to show it working in a Story example
const postcodeValidationOverrideTest = {
  GB: {
    pattern: 'gb-regex-override',
    errorMsg: 'GB specific error OVERRIDE',
  },
  AF: {
    pattern: 'af-regex-override',
    errorMsg: 'AF specific error OVERRIDE',
  },
};

export { defaultPostcodeValidation, postcodeValidationOverrideTest, fallbackPostcodeValidation };
