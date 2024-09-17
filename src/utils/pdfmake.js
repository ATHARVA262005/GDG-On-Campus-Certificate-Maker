import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

// Configure pdfMake with fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;
