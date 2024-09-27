import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BulkCertificateGenerator from './pages/BulkCertificateGenerator';
import { Analytics } from "@vercel/analytics/react"
import Home  from './pages/Home';
import SingleCertificateGenerator from './pages/SingleCertificateGenerator';

function App() {
  return (
    <>
    <Analytics/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single-certificate" element={<SingleCertificateGenerator />} />
        <Route path="/bulk-certificate" element={<BulkCertificateGenerator />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
