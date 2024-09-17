// Import pdfMake and its fonts
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Assign the fonts to pdfMake
if (pdfMake) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
}

// Export pdfMake for usage in other files
export default pdfMake;
