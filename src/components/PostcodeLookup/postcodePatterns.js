const postcodePatterns = (country) => {
  switch (country) {
    case 'GB':
      return '(GIR 0AA)|((([A-Z][0-9][0-9]?)|(([A-Z][A-HJ-Y][0-9][0-9]?)|(([A-Z][0-9][A-Z])|([A-Z][A-HJ-Y][0-9]?[A-Z])))) [0-9][A-Z]{2})';
    default:
      return '^(?!\s*$).+'; // Temporarily to allow non-UK postcodes on Donate for CWG
  }
};

export default postcodePatterns;
