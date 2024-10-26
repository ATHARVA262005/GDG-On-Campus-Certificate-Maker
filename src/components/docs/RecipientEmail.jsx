import React from 'react';

function RecipientEmail() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Recipient Email</h2>
      

      <p>
        The recipient email is crucial for delivering the certificate directly to the participant's inbox. Ensure that you provide a valid and active email address.
      </p>

      <h3 className="text-xl font-semibold mt-4">Format Requirements</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Correct Format:</strong> The email should be in the format <code>example@domain.com</code>.</li>
        <li><strong>No Spaces:</strong> Ensure there are no spaces before, within, or after the email address.</li>
        <li><strong>Active Email:</strong> Verify that the email address is active and accessible by the recipient.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Examples of Valid Email Addresses</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>participant@example.com</li>
        <li>john.doe@gmail.com</li>
        <li>alice123@yahoo.com</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Common Mistakes to Avoid</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Including typos (e.g., <code>example@gnail.com</code>).</li>
        <li>Using placeholder emails (e.g., <code>user@unknown.com</code>).</li>
        <li>Missing the "@" symbol (e.g., <code>example.com</code>).</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Importance of Accurate Email Entry</h3>
      <p>
        Providing the correct email address is essential for ensuring the participant receives their certificate without issues. An incorrect email can lead to missed certificates and confusion.
      </p>
    </div>
  );
}

export default RecipientEmail;
