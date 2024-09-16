import React, { useState } from 'react';
import CertificateEditor from '../components/CertificateEditor';
import CertificatePreview from '../components/CertificatePreview';

const CertificateGenerator = () => {
  const [certificateData, setCertificateData] = useState({});

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-6">
        <CertificateEditor onUpdate={setCertificateData} />
      </div>
        
      <div className='w-full min-h-screen'>
        <CertificatePreview data={certificateData} />
      </div>
    </div>
  );
};

export default CertificateGenerator;
