import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Ensure vfs is set correctly
if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else {
  console.error('pdfFonts or pdfFonts.pdfMake.vfs is undefined');
}

