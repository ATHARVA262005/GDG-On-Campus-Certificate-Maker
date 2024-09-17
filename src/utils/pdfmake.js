// src/utils/pdfmake.js
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Assign the fonts to pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default pdfMake;
