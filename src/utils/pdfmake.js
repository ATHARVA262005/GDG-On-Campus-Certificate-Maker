// src/utils/pdfmake.js
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Configure pdfMake with fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default pdfMake;
