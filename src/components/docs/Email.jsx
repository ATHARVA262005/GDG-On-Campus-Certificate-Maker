import React from 'react';

function Email() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Club Email for Certificate Distribution</h2>
      <p>
        The club's email address is crucial for sending out certificates to participants. This email address will be used as the sender when generating and distributing certificates.
      </p>

      <h3 className="text-xl font-semibold mt-4">Importance of Using a Club Email</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Brand Recognition:</strong> Using a club email enhances the credibility of the certificates and ensures recipients recognize the source.</li>
        <li><strong>Professionalism:</strong> A dedicated email for certificate distribution maintains a professional image for your club.</li>
        <li><strong>Manageability:</strong> Centralizing certificate distribution through a single email makes it easier to manage communications.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">How to Set Up the Club Email</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Create an email account (if not already available) specifically for your club, such as <strong>gdg@example.com</strong>.</li>
        <li>Ensure the email is monitored regularly to respond to any inquiries regarding certificates.</li>
        <li>Use this email in the certificate generation process to send out certificates to recipients.</li>
      </ol>

      <h3 className="text-xl font-semibold mt-4">Best Practices for Using the Club Email</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Always use a professional tone in email communications.</li>
        <li>Include a clear subject line that indicates the purpose of the email.</li>
        <li>Ensure recipients can easily identify the email as coming from your club.</li>
      </ul>
    </div>
  );
}

export default Email;
