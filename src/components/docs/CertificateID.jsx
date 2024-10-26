import React from 'react';

function CertificateID() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Certificate ID for Unique Identification</h2>
      <p>
        Each certificate generated should have a unique identifier known as the Certificate ID. This ID is essential for tracking, verification, and ensuring the authenticity of the certificates issued.
      </p>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mt-4">Certificate Display Area</h3>
        <div className="w-64 h-36 border border-gray-400 bg-black mt-2 flex items-center justify-center">
          <img src="src/assets/images/demo/certificate id.png" alt="certificate id place image" />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-4">Importance of Unique Certificate IDs</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Prevents Duplicates:</strong> Unique IDs help to avoid issuing the same certificate multiple times.</li>
        <li><strong>Facilitates Verification:</strong> Recipients can verify their certificates using the unique ID.</li>
        <li><strong>Easy Tracking:</strong> Organizers can track certificates issued to each participant with ease.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">How to Generate Unique Certificate IDs</h3>
      <p>
        You can generate Certificate IDs using various methods, such as:
      </p>
      <ol className="list-decimal list-inside space-y-2">
        <li><strong>Sequential IDs:</strong> Start from 1 and increment for each new certificate.</li>
        <li><strong>Randomized IDs:</strong> Use a random string generator to create unique identifiers (e.g., using UUIDs).</li>
        <li><strong>Event-Based IDs:</strong> Combine the event name with a number (e.g., <em>Hackathon2024-001</em>).</li>
      </ol>

      <h3 className="text-xl font-semibold mt-4">Best Practices for Certificate IDs</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Ensure IDs are unique across all issued certificates.</li>
        <li>Keep the format simple and easy to understand.</li>
        <li>Document the ID generation process for transparency.</li>
      </ul>
    </div>
  );
}

export default CertificateID;
