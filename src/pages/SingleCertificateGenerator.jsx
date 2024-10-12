import React, { useState } from 'react';
import pdfMake from '../utils/pdfmake';
import { backgroundImages } from '../utils/backgroundImages';
import { Link } from 'react-router-dom';

const SingleCertificateGenerator = () => {
  const [certificateData, setCertificateData] = useState({
    name: '',
    program: '',
    description: '',
    organizer: '',
    incharge: '',
    organizerSignature: '',
    inchargeSignature: '',
    logo: '',
    id: '',
    verificationUrl: '',
    backgroundColor: 'red',
  });

  const [senderEmail, setSenderEmail] = useState('');
  const [senderPassword, setSenderPassword] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [loading, setLoading] = useState(false); // New state for handling loading state

  const sendEmailWithPDF = async (pdfBase64) => {
    setLoading(true);
    const emailData = {
      senderEmail,
      senderPassword,
      toEmail: recipientEmail,
      subject: 'Your Certificate of Achievement',
      message: `Dear ${certificateData.name},\n\nCongratulations on completing the ${certificateData.program} program! Attached is your certificate of achievement.\n\nBest regards,\n${certificateData.organizer}`,
      pdfBase64,
    };
  
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log('Email sent successfully:', result);
        alert('Certificate emailed successfully!');
      } else {
        console.error('Failed to send email:', result);
        alert('Failed to send certificate.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCertificateData((prev) => ({ ...prev, [name]: event.target.result }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setCertificateData((prev) => ({ ...prev, backgroundColor: value }));
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

  const generatePDF = async () => {
    try {
      const logoBase64 = await getBase64FromUrl(certificateData.logo);
      const organizerSignatureBase64 = await getBase64FromUrl(certificateData.organizerSignature);
      const inchargeSignatureBase64 = await getBase64FromUrl(certificateData.inchargeSignature);
      const backgroundImageBase64 = backgroundImages[certificateData.backgroundColor] || '';

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
            text: certificateData.name,
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
            text: certificateData.program,
            style: 'subheader',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: `The program was designed to provide valuable knowledge and skills in ${certificateData.description || 'emerging technologies and development practices'}.`,
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
                    text: certificateData.organizer,
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
                    text: certificateData.incharge,
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
            text: `Certificate ID: ${certificateData.id}`,
            style: 'footer',
            alignment: 'center',
            margin: [0, 20, 0, 0],
          },
          {
            text: `Verify at: ${certificateData.verificationUrl || `https://gdgpdeacoem.in/certificates/${certificateData.id}`}`,
            style: 'footer',
            alignment: 'center',
            margin: [0, 10, 0, 0],
          },
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

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);

      pdfDocGenerator.getBase64((pdfBase64) => {
        sendEmailWithPDF(pdfBase64);
        pdfDocGenerator.download('certificate.pdf');
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
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
        <h2 className="text-4xl font-bold mb-4">Single Certificate Generator</h2>
        <div className="w-full max-w-3xl space-y-4">
          <input name="name" value={certificateData.name} onChange={handleChange} placeholder="Enter Participant Name" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
          <input name="program" value={certificateData.program} onChange={handleChange} placeholder="Enter Program Name" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
          <textarea name="description" value={certificateData.description} onChange={handleChange} placeholder="Enter Program Description" rows="3" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500"></textarea>
          <input name="organizer" value={certificateData.organizer} onChange={handleChange} placeholder="Enter Organizer's Name" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
          <input name="incharge" value={certificateData.incharge} onChange={handleChange} placeholder="Enter In-charge's Name" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor="organizerSignature" className="text-lg">Upload Organizer's Signature:</label>
            <input type="file" name="organizerSignature" accept="image/*" onChange={handleFileChange} className="w-full" />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor="inchargeSignature" className="text-lg">Upload In-charge's Signature:</label>
            <input type="file" name="inchargeSignature" accept="image/*" onChange={handleFileChange} className="w-full" />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label htmlFor="logo" className="text-lg">Upload Logo:</label>
            <input type="file" name="logo" accept="image/*" onChange={handleFileChange} className="w-full" />
          </div>
          <input name="id" value={certificateData.id} onChange={handleChange} placeholder="Enter Certificate ID" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
          <input name="verificationUrl" value={certificateData.verificationUrl} onChange={handleChange} placeholder="Enter Verification URL" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
          <select name="backgroundColor" value={certificateData.backgroundColor} onChange={handleColorChange} className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
          <input name="senderEmail" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} placeholder="Enter Your Email" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
          <input name="senderPassword" value={senderPassword} onChange={(e) => setSenderPassword(e.target.value)} type="password" placeholder="Enter Your Email Password" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
          <input name="recipientEmail" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="Enter Recipient's Email" className="w-full p-2 rounded bg-gray-700 border border-gray-500 focus:border-blue-500" />
          <button
            onClick={generatePDF}
            className={`w-full p-3 rounded-lg bg-blue-600 text-white font-bold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Sending Certificate...' : 'Generate and Send Certificate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCertificateGenerator;
