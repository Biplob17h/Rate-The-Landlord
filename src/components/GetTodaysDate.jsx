// Function to get the current date in DD/MM/YYYY format
export const getCurrentDateString = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  