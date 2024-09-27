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
            text: `Verify at: https://gdgpdeacoem.in/certificates/${certificateData.id}`,
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

      pdfMake.createPdf(docDefinition).download(`${certificateData.name}_Certificate.pdf`, function (error) {
        if (error) {
          console.error('PDF download failed:', error);
        }
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen p-10 flex flex-col items-center justify-between bg-gradient-to-b from-slate-900 to-black text-white py-8 px-4">
      <div className="w-full max-w-4xl">
        <Link
          to={"/"}
          className="flex justify-center my-5 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 text-lg shadow-lg transform hover:scale-105 transition-transform"
        >
          Back to Home
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-8">
        <h2 className="text-4xl font-bold mb-4">Single Certificate Generator</h2>
        <div className="w-full max-w-4xl space-y-6">
          <div className="p-6 bg-white rounded shadow-lg text-black">
            <h2 className="text-xl font-semibold mb-4">Certificate Editor</h2>
            <div className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Recipient Name"
                className="w-full p-2 border rounded"
                onChange={handleChange}
              />
              <input
                type="text"
                name="program"
                placeholder="Program"
                className="w-full p-2 border rounded"
                onChange={handleChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Program Description"
                className="w-full p-2 border rounded"
                onChange={handleChange}
              />
              <input
                type="text"
                name="organizer"
                placeholder="Organizer Name"
                className="w-full p-2 border rounded"
                onChange={handleChange}
              />
              <input
                type="text"
                name="incharge"
                placeholder="Incharge Name"
                className="w-full p-2 border rounded"
                onChange={handleChange}
              />
              <input
                type="text"
                name="logo"
                placeholder="Logo URL"
                className="w-full p-2 border rounded"
                onChange={handleChange}
              />
              <label className="block">Upload Organizer Signature:</label>
              <input
                type="file"
                name="organizerSignature"
                accept="image/*"
                className="w-full p-2 border rounded"
                onChange={handleFileChange}
              />
              <label className="block">Upload Incharge Signature:</label>
              <input
                type="file"
                name="inchargeSignature"
                accept="image/*"
                className="w-full p-2 border rounded"
                onChange={handleFileChange}
              />
              <input
                type="text"
                name="id"
                placeholder="Certificate ID"
                className="w-full p-2 border rounded"
                onChange={handleChange}
              />
              <input
                type="url"
                name="verificationUrl"
                placeholder="Verification URL"
                className="w-full p-2 border rounded"
                onChange={handleChange}
              />
              <select className="w-full p-2 border rounded" onChange={handleColorChange}>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
              <button
                className="w-full bg-gradient-to-r from-slate-800 to-black text-white p-4 rounded hover:bg-gradient-to-l hover:from-black hover:to-slate-800 transition"
                onClick={generatePDF}
              >
                Generate Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCertificateGenerator;
