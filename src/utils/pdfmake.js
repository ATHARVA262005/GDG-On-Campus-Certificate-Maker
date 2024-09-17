import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Set up the fonts for pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default pdfMake;
