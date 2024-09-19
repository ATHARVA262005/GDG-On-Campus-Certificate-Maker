import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CertificateGenerator from './pages/CertificateGenerator';
import BulkCertificateGenerator from './pages/BulkCertificateGenerator';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
    <Analytics/>
    <Router>
      <Routes>
        <Route path="/" element={<CertificateGenerator />} />
        <Route path="/certificate-generator" element={<CertificateGenerator />} />
        <Route path="/bulk-certificate-generator" element={<BulkCertificateGenerator />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
