import React, { useState } from 'react';

const CertificateEditor = ({ onUpdate }) => {
  const [data, setData] = useState({
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
    backgroundColor: 'red', // Default color
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    onUpdate({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setData((prev) => ({ ...prev, [name]: event.target.result }));
        onUpdate({ ...data, [name]: event.target.result });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, backgroundColor: value }));
    onUpdate({ ...data, backgroundColor: value });
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg">
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
          type="text"
          name="verificationUrl"
          placeholder="Verify Certificate URL"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <label className="block">Background Color:</label>
        <select
          name="backgroundColor"
          className="w-full p-2 border rounded"
          value={data.backgroundColor}
          onChange={handleColorChange}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          
        </select>
      </div>
    </div>
  );
};

export default CertificateEditor;
