import React, { useState } from 'react';
import pdfMake from '../utils/pdfmake';
import { backgroundImages } from '../utils/backgroundImages';
import { Link } from 'react-router-dom';

const BulkCertificateGenerator = () => {
  const [certificates, setCertificates] = useState([{ name: '', email: '', id: '' }]);
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPassword, setSenderPassword] = useState('');
  const [mongodbUri, setMongodbUri] = useState('');
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('red');

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newCertificates = [...certificates];
    newCertificates[index][name] = value;
    setCertificates(newCertificates);
  };

  const handleAddCertificate = () => {
    setCertificates([...certificates, { name: '', email: '', id: '' }]);
  };

  const handleRemoveCertificate = (index) => {
    const newCertificates = certificates.filter((_, i) => i !== index);
    setCertificates(newCertificates);
  };

  const sendEmailWithPDF = async (pdfBase64, recipientEmail) => {
    setLoading(true);
    const emailData = {
      senderEmail,
      senderPassword,
      toEmail: recipientEmail,
      subject: 'Your Certificate of Achievement',
      message: 'Congratulations on completing the program! Attached is your certificate of achievement.',
      pdfBase64,
    };

    try {
      const response = await fetch('https://backend-certgdgoncampus.vercel.app/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Email sent successfully:', result);
      } else {
        console.error('Failed to send email:', result);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCertificateToDB = async (pdfBase64, certificateDetails) => {
    try {
      const response = await fetch('http://localhost:5000/generate-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Mongo-URI': mongodbUri,
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

  const generatePDF = async (index) => {
    const { name, id } = certificates[index];
    const certificateDetails = {
      recipientName: name,
      certificateId: id,
      certificateUrl: `http://localhost:5000/certificates/${id}`,
    };

    const docDefinition = {
      pageSize: { width: 1280, height: 720 },
      pageMargins: [0, 0, 0, 0],
      background: [
        {
          image: backgroundImages[backgroundColor] || '',
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
          text: `This is to certify that ${name}`,
          style: 'body',
          alignment: 'center',
          margin: [0, 20, 0, 0],
        },
        {
          text: `has successfully completed the program with ID: ${id}`,
          style: 'body',
          alignment: 'center',
          margin: [0, 20, 0, 0],
        },
      ],
      styles: {
        header: { fontSize: 30, bold: true, color: '#111827' },
        body: { fontSize: 18, margin: [0, 5, 0, 5], color: '#111827' },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    pdfDocGenerator.getBase64((pdfBase64) => {
      saveCertificateToDB(pdfBase64, certificateDetails);
      sendEmailWithPDF(pdfBase64, certificates[index].email);
      pdfDocGenerator.download(`certificate_${id}.pdf`);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    certificates.forEach((_, index) => generatePDF(index));
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
        <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-4">
          {certificates.map((cert, index) => (
            <div key={index} className="border p-4 rounded bg-gray-700">
              <input
                name="name"
                value={cert.name}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter Participant Name"
                className="w-full p-2 rounded bg-gray-600 border border-gray-500 focus:border-blue-500"
              />
              <input
                name="email"
                value={cert.email}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter Recipient's Email"
                className="w-full p-2 rounded bg-gray-600 border border-gray-500 focus:border-blue-500"
              />
              <input
                name="id"
                value={cert.id}
                onChange={(e) => handleChange(index, e)}
                placeholder="Enter Certificate ID"
                className="w-full p-2 rounded bg-gray-600 border border-gray-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveCertificate(index)}
                className="text-red-600 hover:underline"
              >
                Remove Certificate
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddCertificate} className="text-blue-600 hover:underline">
            Add Another Certificate
          </button>
          <input
            value={mongodbUri}
            onChange={(e) => setMongodbUri(e.target.value)}
            placeholder="Enter MongoDB URI"
            className="w-full p-2 rounded bg-gray-600 border border-gray-500 focus:border-blue-500"
          />
          <select
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-full p-2 rounded bg-gray-600 border border-gray-500 focus:border-blue-500"
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
          <button
            type="submit"
            className={`w-full p-3 rounded-lg bg-blue-600 text-white font-bold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Sending Certificates...' : 'Generate and Send Certificates'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BulkCertificateGenerator;
