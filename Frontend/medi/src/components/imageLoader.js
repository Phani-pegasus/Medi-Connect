export const getImagePath = (doctorName) => {
    const imageName = doctorName.replace(/\s+/g, '_'); // Replace spaces with underscores
    try {
      return require(`./images/${imageName}.jpg`); // Assuming images are in JPG format
    } catch (error) {
      return null; // Return null if image doesn't exist
    }
  };
  