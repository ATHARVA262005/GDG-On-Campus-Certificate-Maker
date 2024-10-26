import React from 'react';

const sampleCSV = `name,email,id
John Doe,johndoe@example.com,1
Jane Smith,janesmith@example.com,2
Alice Johnson,alicejohnson@example.com,3`;

const downloadCSV = () => {
  const blob = new Blob([sampleCSV], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', 'sample_certificates.csv');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

function CSVFormat() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold md:text-3xl">CSV Format for Bulk Certificate Generation</h2>
      <p className="text-sm md:text-base lg:text-lg">
        To generate certificates in bulk, you need to provide a CSV file with the following columns:
      </p>

      <h3 className="text-xl font-semibold md:text-2xl mt-2">Required Columns</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Name:</strong> The name of the participant.</li>
        <li><strong>Email:</strong> The email address of the participant.</li>
        <li><strong>ID:</strong> A unique identifier for the participant (e.g., registration ID).</li>
      </ul>

      <h3 className="text-xl font-semibold md:text-2xl mt-4">Sample CSV Format</h3>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {sampleCSV}
      </pre>

      <button 
        onClick={downloadCSV} 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Download Sample CSV File
      </button>

      <h3 className="text-xl font-semibold md:text-2xl mt-4">How to Create a CSV File Using Google Sheets</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Open <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Google Sheets</a>.</li>
        <li>Click on the “Blank” option to create a new spreadsheet.</li>
        <li>In the first row, enter the column headers: <strong>Name</strong>, <strong>Email</strong>, and <strong>ID</strong>.</li>
        <li>Fill in the rows with the participants' information.</li>
        <li>Once done, click on “File” in the top left corner.</li>
        <li>Hover over “Download” and select “Comma-separated values (.csv, current sheet)” to download your CSV file.</li>
      </ol>
    </div>
  );
}

export default CSVFormat;
