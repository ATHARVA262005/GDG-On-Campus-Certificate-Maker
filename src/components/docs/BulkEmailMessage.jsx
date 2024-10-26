import React from 'react';

function BulkEmailMessage() {
  const sampleEmailMessage = `Dear [Participant's Name],

Thank you for participating in [Event Name]! We appreciate your involvement and contributions. 

Attached to this email, you will find your Certificate of Participation, which recognizes your commitment and effort. 

If you have any questions or require further information, please feel free to contact us at [Organizer's Email].

Best regards,
[Organizer's Name]
[Event Name] Team`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleEmailMessage)
      .then(() => {
        alert('Sample email message copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Email Message for Bulk Certificate Recipients</h2>
      <p>
        When sending certificates via email, the message body is an important aspect of communication with recipients. Below is a template for the email message that participants will receive, along with details on how to customize it.
      </p>

      <h3 className="text-xl font-semibold mt-4">Sample Email Message</h3>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
{sampleEmailMessage}
      </pre>

      <button 
        onClick={copyToClipboard} 
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
      >
        Copy Sample Email
      </button>

      <h3 className="text-xl font-semibold mt-4">Customization Instructions</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Replace <strong>[Participant's Name]</strong> with the recipient's actual name.</li>
        <li>Replace <strong>[Event Name]</strong> with the name of the event.</li>
        <li>Provide an appropriate <strong>Organizer's Email</strong> for any inquiries.</li>
        <li>Include the <strong>Organizer's Name</strong> at the end of the message.</li>
      </ol>

      <h3 className="text-xl font-semibold mt-4">Notes</h3>
      <p>
        - Ensure that the email is clear and concise to enhance the recipient's experience.
        - You may also attach the generated certificate file to this email for easy access.
      </p>
    </div>
  );
}

export default BulkEmailMessage;
