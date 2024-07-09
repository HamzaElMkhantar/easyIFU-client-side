export const convertDateToYYMMDD = (inputDate) => {
  if (!inputDate) {
    console.error("Invalid date input");
    return null; // Return null for invalid input
  }
    // Split the input date into day, month, and year
    const [year, month, day ] = inputDate.split('-');
  
    // Ensure the date components are valid
    if (day && month && year) {
      // Create a JavaScript Date object
      const jsDate = new Date(`${year}-${month}-${day}`);
  
      // Extract the year, month, and day components
      const yy = jsDate.getFullYear().toString().slice(-2);
      const mm = (jsDate.getMonth() + 1).toString().padStart(2, '0');
      const dd = jsDate.getDate().toString().padStart(2, '0');
  
      // Concatenate the components in "yymmdd" format
      const yymmdd = `${yy}${mm}${dd}`;
  
      return yymmdd;
    } else {
      // Return null for invalid input
      return null;
    }
  };