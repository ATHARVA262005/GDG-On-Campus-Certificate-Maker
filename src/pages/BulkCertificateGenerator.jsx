import React, { useState } from 'react';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Progress } from '../components/ui/Progress';
import pdfMake from '../utils/pdfmake';
import { backgroundImages } from '../utils/backgroundImages';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';

const BulkCertificateGenerator = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mongodbUri, setMongodbUri] = useState('');
  const [formData, setFormData] = useState({
    senderEmail: '',
    senderPassword: '',
    emailSubject: 'Your Certificate of Achievement',
    emailMessage: '',
    program: '',
    description: '',
    backgroundColor: 'red',
    verifyAtUrl: 'https://gdgpdeacoem.in/certificates',
    organizerName: '',
    inchargeName: '',
    logo: null,
    mongodbUri: '',
    organizerSignature: null,
    inchargeSignature: null
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    // Specifically handle the mongoUri input separately
    if (name === 'mongodbUri') {
      setmongodbUri(value);
      setFormData((prev) => ({
        ...prev,
        mongodbUri: value,  // Update formData.mongoUri
      }));
    }
  };

  const handleFileChange = (e, fieldName = 'file') => {
    if (fieldName === 'file') {
      setFile(e.target.files[0]);
      setError('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: reader.result,
      }));
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const processCSV = (text) => {
    try {
      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line);

      const headers = lines[0].toLowerCase().split(',').map((header) => header.trim());
      const requiredHeaders = ['name', 'email', 'id'];

      if (!requiredHeaders.every((header) => headers.includes(header))) {
        throw new Error('CSV must contain name, email, and id columns');
      }

      return lines.slice(1).map((line) => {
        const values = line.split(',').map((value) => value.trim());
        const entry = {};

        headers.forEach((header, index) => {
          if (requiredHeaders.includes(header)) {
            entry[header] = values[index] || '';
          }
        });

        return entry;
      }).filter((entry) => entry.name && entry.email && entry.email.includes('@') && entry.id);
    } catch (error) {
      throw new Error(`CSV Processing Error: ${error.message}`);
    }
  };

  const generatePDF = async (certificateData) => {
    try {
      
      const docDefinition = {
        pageSize: { width: 1280, height: 720 },
        pageMargins: [0, 0, 0, 0],
        background: formData.backgroundColor ? [
          {
            image: backgroundImages[formData.backgroundColor],
            width: 1280,
            height: 720,
          }
        ] : undefined,
        content: [
          {
            text: 'Certificate of Achievement',
            style: 'header',
            alignment: 'center',
            margin: [0, 100, 0, 0],
          },
          {
            text: 'This is to certify that',
            style: 'subheader',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: certificateData.name,
            style: 'name',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: `has demonstrated exceptional skills and dedication by successfully completing the`,
            style: 'body',
            alignment: 'center',
            margin: [0, 10, 0, 0],
          },
          {
            text: formData.program,
            style: 'program',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: formData.description,
            style: 'description',
            alignment: 'center',
            margin: [120, 20, 120, 0],
          },
          {
            columns: [
              {
                stack: [
                  formData.organizerSignature && {
                    image: formData.organizerSignature,
                    width: 120,
                    height: 50,
                    alignment: 'right',
                  },
                  {
                    text: formData.organizerName,
                    style: 'signatory',
                    alignment: 'right',
                  },
                ],
                width: '35%',
              },
              {
                stack: [
                  formData.logo && {
                    image: formData.logo,
                    width: 150,
                    height: 150,
                    alignment: 'center',
                  },
                ],
                width: '30%',
              },
              {
                stack: [
                  formData.inchargeSignature && {
                    image: formData.inchargeSignature,
                    width: 120,
                    height: 50,
                    alignment: 'left',
                  },
                  {
                    text: formData.inchargeName,
                    style: 'signatory',
                    alignment: 'left',
                  },
                ],
                width: '35%',
              },
            ],
            margin: [0, 40, 0, 0],
          },
          {
            text: `Certificate ID: ${certificateData.id}`,
            style: 'footer',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: `Verify at: ${formData.verifyAtUrl}/${certificateData.id}`,
            style: 'footer',
            alignment: 'center',
            margin: [0, 10, 0, 0],
          },
        ],
        styles: {
          header: { fontSize: 30, bold: true, color: '#111827' },
          subheader: { fontSize: 20, color: '#111827' },
          name: { fontSize: 24, bold: true, italics: true, color: '#111827' },
          body: { fontSize: 18, color: '#111827' },
          program: { fontSize: 22, bold: true, color: '#111827' },
          description: { fontSize: 16, color: '#111827' },
          signatory: { fontSize: 14, color: '#111827' },
          footer: { fontSize: 12, color: '#111827', italics: true },
        },
      };
  
      return new Promise((resolve) => {
        pdfMake.createPdf(docDefinition).getBase64(resolve);
      });
    } catch (error) {
      console.error('PDF Generation Error:', error);
      throw new Error('Failed to generate PDF');
    }
  };
  
  

  const generateCertificates = async () => {
    try {
      setLoading(true);
      setProgress(0);
      setError('');
  
      if (!file) {
        throw new Error('Please upload a CSV file');
      }
  
      if (!formData.program || !formData.organizerName || !formData.inchargeName) {
        throw new Error('Please fill in all required fields');
      }
  
      const fileText = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsText(file);
      });
  
      const certificatesData = processCSV(fileText);
      if (certificatesData.length === 0) {
        throw new Error('No valid data found in CSV');
      }
  
      const zip = new JSZip();
      const certificatesFolder = zip.folder("certificates");
      const emailPromises = [];
  
      for (let i = 0; i < certificatesData.length; i++) {
        const certData = certificatesData[i];
        const pdfBase64 = await generatePDF(certData);
  
        certificatesFolder.file(`${certData.name}_certificate.pdf`, pdfBase64, {base64: true});
  
        // Save certificate data to the database
        await saveCertificateToDB(certData);
  
        emailPromises.push({
          email: certData.email,
          pdfBase64,
          name: certData.name
        });
  
        setProgress(Math.round((i + 1) / certificatesData.length * 50));
      }
  
      const zipBlob = await zip.generateAsync({type: "blob"});
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "certificates.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
  
      setProgress(75);
  
      if (formData.senderEmail && formData.senderPassword) {
        await fetch('https://backend-certgdgoncampus.vercel.app/send-bulk-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            certificates: emailPromises,
            subject: formData.emailSubject,
            message: formData.emailMessage || `Dear {name},\n\nCongratulations on completing the ${formData.program}! Please find your certificate attached.\n\nBest regards,\n${formData.organizerName}`,
            senderEmail: formData.senderEmail,
            senderPassword: formData.senderPassword
          })
        });
      }
  
      setProgress(100);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  const saveCertificateToDB = async (certificateData) => {
    const certificateDetails = {
      recipientName: certificateData.name,
      eventName: formData.program,
      certificateId: certificateData.id,
      certificateUrl: `http://localhost:5000/certificates/${certificateData.id}`,
      organizerName: formData.organizerName,
      inChargeName: formData.inchargeName,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/generate-certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Mongo-URI': mongodbUri, // Use formData.mongoUri here
        },
        body: JSON.stringify(certificateDetails),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Certificate saved to DB:', result);
      } else {
        console.error('Failed to save certificate:', result);
      }
    } catch (error) {
      console.error('Error saving certificate:', error);
    }
  };
  


  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-between bg-gradient-to-b from-slate-900 to-black text-white py-8 px-4">
      <div className="w-full max-w-4xl">
        <Link
          to="/"
          className="flex justify-center my-5 bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-2 rounded-lg hover:bg-blue-600 text-lg shadow-lg transform hover:scale-105 transition-transform"
        >
          Back to Certificates
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-8">
      <h2 className="text-4xl font-bold mb-4">Bulk Certificate Generator</h2>
      <div className="w-full max-w-3xl space-y-4">
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1" htmlFor="csvFile">Upload CSV File: <br /> Column: name, email, id </label>
    <Input type="file" accept=".csv" id="csvFile" onChange={e => handleFileChange(e)} className="w-full"/>
  </div>
  <input name="mongodbUri" value={mongodbUri} onChange={(e) => setMongodbUri(e.target.value)} placeholder="Enter MongoDB URI" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Sender Email:</label>
    <Input type="email" name="senderEmail" value={formData.senderEmail} onChange={handleFormChange} placeholder="Your Email" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Sender Password:</label>
    <Input type="password" name="senderPassword" value={formData.senderPassword} onChange={handleFormChange} placeholder="Your Password" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Email Subject:</label>
    <Input type="text" name="emailSubject" value={formData.emailSubject} onChange={handleFormChange} placeholder="Subject" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Email Message:</label>
    <Input type="text" name="emailMessage" value={formData.emailMessage} onChange={handleFormChange} placeholder="Message"  className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500"/>
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Program:</label>
    <Input type="text" name="program" value={formData.program} onChange={handleFormChange} placeholder="Program Name" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500"/>
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Description:</label>
    <Input type="text" name="description" value={formData.description} onChange={handleFormChange} placeholder="Certificate Description" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500"/>
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Verify URL:</label>
    <Input type="text" name="verifyAtUrl" value={formData.verifyAtUrl} onChange={handleFormChange} placeholder="Verification URL" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500"/>
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Organizer Name:</label>
    <Input type="text" name="organizerName" value={formData.organizerName} onChange={handleFormChange} placeholder="Organizer Name" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500"/>
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Incharge Name:</label>
    <Input type="text" name="inchargeName" value={formData.inchargeName} onChange={handleFormChange} placeholder="In-Charge Name" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500"/>
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Logo:</label>
    <Input type="file" accept="image/*" onChange={e => handleFileChange(e, 'logo')} className="w-full"/>
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Organizer Signature:</label>
    <Input type="file" accept="image/*" onChange={e => handleFileChange(e, 'organizerSignature')} className="w-full"/>
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">In-Charge Signature:</label>
    <Input type="file" accept="image/*" onChange={e => handleFileChange(e, 'inchargeSignature')} className="w-full"/>
  </div>
  <div className="flex flex-col items-start space-y-2">
    <label className="block text-sm font-medium mb-1">Background Color:</label>
    <select name="backgroundColor" value={formData.backgroundColor} onChange={handleFormChange} className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500">
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
      <option value="yellow">Yellow</option>
    </select>
  </div>
  <Button className={`w-full p-3 rounded-lg bg-blue-600 text-white font-bold`} onClick={generateCertificates} disabled={progress > 0 && progress < 100}>Generate Certificates</Button>
  {error && <Alert className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
  {progress > 0 && <Progress value={progress} className="mt-4" />}
</div>

      <Link to="/bulk-certificate" className="mt-4 text-blue-500 underline">Bulk Generate Again</Link>
    </div>


    
    </div>



  );
};

export default BulkCertificateGenerator;
