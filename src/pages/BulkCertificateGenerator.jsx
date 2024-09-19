import React, { useState } from 'react';
import CertificatePreview from '../components/CertificatePreview';
import exceljs from 'exceljs';
import jszip from 'jszip';

const BulkCertificateGenerator = () => {
  const [recipientData, setRecipientData] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  const handleExcelFileChange = (event) => {
    setExcelFile(event.target.files[0]);
  };

  const handleGenerateCertificates = () => {
    const workbook = new exceljs.Workbook();
    workbook.xlsx.readFile(excelFile).then(() => {
      const recipientNames = workbook.sheets['Sheet1'].getData().map((row) => row[0].value);
      setRecipientData(recipientNames.map((name) => ({ name })));
    });
  };

  const handleDownloadZip = () => {
    const zip = new jszip();
    recipientData.forEach((recipient) => {
      const certificate = CertificatePreview({ data: recipient });
      zip.file(`${recipient.name}_Certificate.pdf`, certificate);
    });
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      setZipFile(blob);
    });
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleExcelFileChange} />
      <button onClick={handleGenerateCertificates}>Generate Certificates</button>
      {recipientData.length > 0 && (
        <div>
          <CertificatePreview data={recipientData[0]} />
          <button onClick={handleDownloadZip}>Download Zip</button>
        </div>
      )}
      {zipFile && (
        <a href={URL.createObjectURL(zipFile)} download="certificates.zip">
          Download Zip
        </a>
      )}
    </div>
  );
};

export default BulkCertificateGenerator;