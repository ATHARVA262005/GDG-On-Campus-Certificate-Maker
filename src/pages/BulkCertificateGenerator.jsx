import React, { useState } from 'react';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Progress } from '../components/ui/Progress';
import CertificatePreview from '../components/CertificatePreview';
import pdfMake from '../utils/pdfmake';
import { backgroundImages } from '../utils/backgroundImages';
import { Link } from 'react-router-dom';

const BulkCertificateGenerator = () => {
  const [file, setFile] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [previewData, setPreviewData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const processCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(header => header.trim());
    return lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      if (values.length !== headers.length) {
        console.warn(`Skipping malformed line: ${line}`);
        return null;
      }
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || '';
        return obj;
      }, {});
    }).filter(obj => obj !== null);
  };

  const generateCertificates = async () => {
    if (!file) {
      setError('Please upload a CSV file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const data = processCSV(text);
        if (data.length === 0) {
          setError('No valid data found in the CSV file.');
          return;
        }
        setCertificates(data);

        for (let i = 0; i < data.length; i++) {
          await generatePDF(data[i]);
          setProgress(((i + 1) / data.length) * 100);
        }

        setPreviewData(data[0]);
      } catch (err) {
        setError(`Error processing CSV: ${err.message}`);
      }
    };
    reader.onerror = () => {
      setError('Error reading the file.');
    };
    reader.readAsText(file);
  };

  const generatePDF = async (data) => {
    try {
      const logoBase64 = await getBase64FromUrl(data.logo);
      const organizerSignatureBase64 = await getBase64FromUrl(data.organizerSignature);
      const inchargeSignatureBase64 = await getBase64FromUrl(data.inchargeSignature);
      const backgroundImageBase64 = backgroundImages[data.backgroundColor] || '';

      const docDefinition = {
        pageSize: { width: 1280, height: 720 },
        pageMargins: [0, 0, 0, 0],
        background: [
          {
            image: backgroundImageBase64,
            width: 1280,
            height: 720,
          },
        ],
        content: [
          {
            text: 'Certificate of Achievement',
            style: 'header',
            alignment: 'center',
            margin: [0, 120, 0, 0],
          },
          {
            text: 'This is to certify that',
            style: 'body',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: data.name,
            style: 'name',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: 'has demonstrated exceptional skills and dedication by successfully completing the',
            style: 'body',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: data.program,
            style: 'subheader',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: `The program was designed to provide valuable knowledge and skills in ${data.description || 'emerging technologies and development practices'}.`,
            style: 'body',
            alignment: 'center',
            margin: [120, 20, 120, 0],
          },
          {
            columns: [
              {
                stack: [
                  {
                    image: organizerSignatureBase64,
                    width: 120,
                    height: 50,
                    alignment: 'right',
                    margin: [0, 10, 0, 0],
                  },
                  {
                    text: data.organizer,
                    style: 'signatory',
                    alignment: 'right',
                    margin: [0, 20, 0, 0],
                  },
                ],
                width: '36.5%',
                alignment: 'right',
              },
              {
                stack: [
                  {
                    image: logoBase64,
                    width: 150,
                    height: 150,
                    alignment: 'center',
                    margin: [0, -20, 0, 0],
                  },
                ],
                width: '40%',
                alignment: 'center',
              },
              {
                stack: [
                  {
                    image: inchargeSignatureBase64,
                    width: 120,
                    height: 50,
                    alignment: 'center',
                    margin: [0, 10, 0, 0],
                  },
                  {
                    text: data.incharge,
                    style: 'signatory',
                    alignment: 'center',
                    margin: [0, 20, 0, 0],
                  },
                ],
                width: '10%',
                alignment: 'left',
              },
            ],
            margin: [0, 60, 150, 0],
          },
          {
            text: `Certificate ID: ${data.id}`,
            style: 'footer',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: `Verify at: https://gdgpdeacoem.in/certificates/${data.id}`,
            style: 'footer',
            alignment: 'center',
            margin: [0, 10, 0, 0],
          },
        ],
        styles: {
          header: { fontSize: 30, bold: true, color: '#111827' },
          subheader: { fontSize: 18, italics: true, color: '#111827' },
          body: { fontSize: 16, color: '#111827' },
          name: { fontSize: 24, bold: true, color: '#111827' },
          signatory: { fontSize: 14, bold: true, color: '#111827' },
          footer: { fontSize: 10, color: '#111827' },
        },
      };

      pdfMake.createPdf(docDefinition).download(`${data.name}_Certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const getBase64FromUrl = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-start bg-gradient-to-b from-slate-900 to-black text-white py-8 px-4">
      <div className="w-full max-w-4xl">
        <Link
          to="/"
          className="flex justify-center my-5 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 text-lg shadow-lg transform hover:scale-105 transition-transform"
        >
          Back to Home
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-8">
        <h2 className="text-4xl font-bold mb-4">Bulk Certificate Generator</h2>
        <div className="flex flex-col space-y-4">
          <Input type="file" accept=".csv" onChange={handleFileChange} />
          <Button onClick={generateCertificates}>Generate Certificates</Button>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {progress > 0 && (
            <div>
              <Progress value={progress} className="w-full" />
              <p className="mt-2">{Math.round(progress)}% complete</p>
            </div>
          )}
          {previewData && (
            <div>
              <h3 className="text-xl font-semibold mt-6 mb-2">Preview</h3>
              <div className="text-black lg:scale-100 lg:rotate-0 -scale-50 rotate-180">
                <CertificatePreview data={previewData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkCertificateGenerator;
