
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Configure pdfMake with fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default pdfMake;


// utils/pdfmake.js
export const getBase64FromUrl = async (url) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.responseType = 'blob';
      xhr.open('GET', url, true);
      xhr.send();
    });
  };
  