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
  const [certificates, setCertificates] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPassword, setSenderPassword] = useState('');
  const [emailSubject, setEmailSubject] = useState('Your Certificate');
  const [emailMessage, setEmailMessage] = useState('Please find your certificate attached.');

  const [logo, setLogo] = useState(null);
  const [organizerSignature, setOrganizerSignature] = useState(null);
  const [inchargeSignature, setInchargeSignature] = useState(null);

  const [program, setProgram] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [verifyAtUrl, setVerifyAtUrl] = useState('');

  const [organizerName, setOrganizerName] = useState('');
  const [inchargeName, setInchargeName] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleImageUpload = async (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await getBase64(file);
      setter(base64);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(header => header.trim());

    const requiredHeaders = ['name', 'email', 'id'];
    const validHeaders = headers.filter(header => requiredHeaders.includes(header));

    return lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const obj = {};

      validHeaders.forEach((header, index) => {
        obj[header] = values[headers.indexOf(header)] || '';
      });

      return Object.keys(obj).length === requiredHeaders.length ? obj : null;
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
  
        const updatedData = data.map(item => ({
          ...item,
          program: program || item.program,
          description: description || item.description,
          backgroundColor: backgroundColor || item.backgroundColor,
          verifyAtUrl: verifyAtUrl || item.verifyAtUrl,
        }));
  
        setCertificates(updatedData);

        const zip = new JSZip();
        const certificatesFolder = zip.folder("certificates");
        const emailPromises = [];
  
        for (let i = 0; i < updatedData.length; i++) {
          const certData = updatedData[i];
          const pdfBase64 = await generatePDF(certData);
          
          // Add to zip file
          certificatesFolder.file(`${certData.name}_certificate.pdf`, pdfBase64, {base64: true});
          
          // Prepare email data
          emailPromises.push({ email: certData.email, pdfBase64 });
          
          setProgress(Math.round((i + 1) / updatedData.length * 50)); // First 50% for generation
        }
  
        // Generate zip file
        const content = await zip.generateAsync({type:"blob"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "certificates.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        setProgress(75); // 75% after zip download
  
        // Send emails
        await sendBulkEmail(emailPromises);
  
        setProgress(100); // 100% after emails sent
        setPreviewData(updatedData[0]);
      } catch (err) {
        setError(`Error processing CSV: ${err.message}`);
      }
    };
    reader.onerror = () => {
      setError('Error reading the file.');
    };
    reader.readAsText(file);
  };
  
  const sendBulkEmail = async (certificates) => {
    try {
      const response = await fetch('https://backend-certgdgoncampus.vercel.app/send-bulk-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certificates,
          subject: emailSubject,
          message: `Dear Member,\n\nCongratulations on completing the ${program} program! Attached are your certificates of achievement.\n\nBest regards,\n${organizerName}`,
          senderEmail,
          senderPassword,
        }),
      });
  
      if (!response.ok) throw new Error('Bulk email sending failed.');
    } catch (error) {
      console.error('Error sending bulk email:', error);
    }
  };

  const generatePDF = async (certificateData) => {
    try {
      const logoBase64 = await getBase64FromUrl(logo);
      const organizerSignatureBase64 = await getBase64FromUrl(organizerSignature);
      const inchargeSignatureBase64 = await getBase64FromUrl(inchargeSignature);
      let backgroundImageBase64 = '';
  
      try {
        backgroundImageBase64 = backgroundImages[backgroundColor] || '';
      } catch (error) {
        console.warn('Error loading background image:', error);
      }
  
      const docDefinition = {
        pageSize: { width: 1280, height: 720 },
        pageMargins: [0, 0, 0, 0],
        content: [
          { text: 'Certificate of Achievement', style: 'header', alignment: 'center', margin: [0, 120, 0, 0] },
          { text: 'This is to certify that', style: 'body', alignment: 'center', margin: [0, 20, 0, 0] },
          { text: certificateData.name, style: 'name', alignment: 'center', margin: [0, 20, 0, 0] },
          { text: 'has demonstrated exceptional skills and dedication by successfully completing the', style: 'body', alignment: 'center', margin: [0, 20, 0, 0] },
          { text: certificateData.program, style: 'subheader', alignment: 'center', margin: [0, 20, 0, 0] },
          { text: `The program was designed to provide valuable knowledge and skills in ${certificateData.description || 'emerging technologies and development practices'}.`, style: 'body', alignment: 'center', margin: [120, 20, 120, 0] },
          {
            columns: [
              {
                stack: [
                  { image: organizerSignatureBase64, width: 120, height: 50, alignment: 'right', margin: [0, 10, 0, 0] },
                  { text: organizerName, style: 'signatory', alignment: 'right', margin: [0, 20, 0, 0] },
                ],
                width: '36.5%',
                alignment: 'right',
              },
              {
                stack: [
                  { image: logoBase64, width: 150, height: 150, alignment: 'center', margin: [0, -20, 0, 0] },
                ],
                width: '40%',
                alignment: 'center',
              },
              {
                stack: [
                  { image: inchargeSignatureBase64, width: 120, height: 50, alignment: 'center', margin: [0, 10, 0, 0] },
                  { text: inchargeName, style: 'signatory', alignment: 'center', margin: [0, 20, 0, 0] },
                ],
                width: '10%',
                alignment: 'left',
              },
            ],
            margin: [0, 60, 150, 0],
          },
          { text: `Certificate ID: ${certificateData.id}`, style: 'footer', alignment: 'center', margin: [0, 20, 0, 0] },
          { text: `Verify at: ${certificateData.verifyAtUrl || `https://gdgpdeacoem.in/certificates`}/${certificateData.id}`, style: 'footer', alignment: 'center', margin: [0, 10, 0, 0] },
        ],
        styles: {
          header: { fontSize: 30, bold: true, color: '#111827' },
          subheader: { fontSize: 25, bold: true, color: '#111827' },
          body: { fontSize: 18, margin: [0, 5, 0, 5], color: '#111827' },
          name: { fontSize: 22, bold: true, italics: true, color: '#111827' },
          signatory: { fontSize: 14, color: '#111827' },
          footer: { fontSize: 12, color: '#111827', italics: true },
        },
      };
  
      // Only add background if the image was successfully loaded
      if (backgroundImageBase64) {
        docDefinition.background = [{ image: backgroundImageBase64, width: 1280, height: 720 }];
      }
  
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  
      return new Promise((resolve) => {
        pdfDocGenerator.getBase64((pdfBase64) => {
          resolve(pdfBase64);
        });
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
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
        <Input type="file" accept=".csv" id="csvFile" onChange={handleFileChange} className="w-full"/>
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Sender Email:</label>
        <Input type="email" value={senderEmail} onChange={e => setSenderEmail(e.target.value)} placeholder="Your Email" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Sender Password:</label>
        <Input type="password" value={senderPassword} onChange={e => setSenderPassword(e.target.value)} placeholder="Your Password" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Email Subject:</label>
        <Input type="text" value={emailSubject} onChange={e => setEmailSubject(e.target.value)} placeholder="Subject" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Email Message:</label>
        <Input type="text" value={emailMessage} onChange={e => setEmailMessage(e.target.value)} placeholder="Message"  className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500"/>
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Logo:</label>
        <Input type="file" accept="image/*" onChange={e => handleImageUpload(e, setLogo)} className="w-full" />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Organizer Signature:</label>
        <Input type="file" accept="image/*" onChange={e => handleImageUpload(e, setOrganizerSignature)} className="w-full"/>
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">In-Charge Signature:</label>
        <Input type="file" accept="image/*" onChange={e => handleImageUpload(e, setInchargeSignature)} className="w-full" />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Program:</label>
        <Input type="text" value={program} onChange={e => setProgram(e.target.value)} placeholder="Program Name" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Description:</label>
        <Input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description"  className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500"/>
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Organizer Name:</label>
        <Input type="text" placeholder="Organizer Name" value={organizerName} onChange={(e) => setOrganizerName(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Incharge Nmae:</label>
        <Input type="text" placeholder="Incharge Name" value={inchargeName} onChange={(e) => setInchargeName(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
      </div>

      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Background Color:</label>
        <select name="backgroundColor" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
      </div>


      <div className="flex flex-col items-start space-y-2">
        <label className="block text-sm font-medium mb-1">Verify At URL:</label>
        <Input type="text" value={verifyAtUrl} onChange={e => setVerifyAtUrl(e.target.value)} placeholder="Verify At URL" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
      </div>
      <Button className={`w-full p-3 rounded-lg bg-blue-600 text-white font-bold`} onClick={generateCertificates} disabled={progress > 0 && progress < 100} >Generate Certificates</Button>
      {error && <Alert className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
      {progress > 0 && <Progress value={progress} className="mt-4" />}
      
    </div>
      <Link to="/bulk-certificate" className="mt-4 text-blue-500 underline">Bulk Generate Again</Link>
    </div>


    
    </div>



  );
};

export default BulkCertificateGenerator;
