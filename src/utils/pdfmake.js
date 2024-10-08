import pdfMake from 'pdfmake/build/pdfmake';

// Access fonts directly from the pdfMake object
import vfs_fonts from './vfs_fonts';

pdfMake.vfs = vfs_fonts.pdfMake.vfs;

export default pdfMake;

// utils/pdfmake.js


export const getBase64FromUrl = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error; // Re-throw for handling in calling code
  }
};