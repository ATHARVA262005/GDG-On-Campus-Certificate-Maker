import React from 'react';

function BulkEmailSubject() {
  const sampleEmailSubject = 'Your Certificate of Participation';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleEmailSubject)
      .then(() => {
        alert('Sample email subject copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Email Subject for Bulk Certificate Recipients</h2>
      <p>
        The subject line is crucial for email communication as it gives recipients an idea of the content of the email. Below is a sample subject line that you can use when sending certificates via email.
      </p>

      <h3 className="text-xl font-semibold mt-4">Sample Email Subject</h3>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {sampleEmailSubject}
      </pre>

      <button 
        onClick={copyToClipboard} 
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
      >
        Copy Sample Subject
      </button>

      <h3 className="text-xl font-semibold mt-4">Customization Instructions</h3>
      <p>
        You may customize the subject line based on the event or the type of certificates being sent. Make sure it is clear and informative to enhance open rates.
      </p>

      <h3 className="text-xl font-semibold mt-4">Example Customization</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>For a coding event: <strong>Certificate of Completion: [Event Name]</strong></li>
        <li>For a workshop: <strong>Thank You for Attending [Workshop Title]</strong></li>
      </ul>
    </div>
  );
}

export default BulkEmailSubject;
