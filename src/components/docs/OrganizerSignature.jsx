import React from 'react';

function OrganizerSignature() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Organizer's Signature</h2>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mt-4">Certificate Display Area</h3>
        <div className="w-64 h-36 border border-gray-400 bg-black mt-2 flex items-center justify-center">
          <img src="src/assets/images/demo/OrganizerSignature.png" alt="organizer signature place image" />
        </div>
      </div>

      <p>
        The organizer's signature adds a personal touch to the certificate, making it official and authentic. It signifies the approval and validation of the issued certificate.
      </p>

      <h3 className="text-xl font-semibold mt-4">Uploading the Organizer's Signature</h3>
      <p>
        Please upload an image of the organizer's signature in a transparent format (PNG, JPG, JPEG). This will ensure that the signature blends seamlessly with the certificate's background.
      </p>

      <h3 className="text-xl font-semibold mt-4">Format Requirements</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>File Type:</strong> PNG, JPG, or JPEG are accepted formats.</li>
        <li><strong>Transparency:</strong> For best results, use a signature with a transparent background.</li>
        <li><strong>Maximum Upload Size:</strong> Ensure that the file size does not exceed 20 MB.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Example</h3>
      <p>
        Below is an example of how the signature may appear on a certificate:
      </p>
      <img src="path_to_example_signature.png" alt="Example Organizer Signature" className="w-64 h-auto border rounded-md shadow-md" />

      <h3 className="text-xl font-semibold mt-4">Importance of the Signature</h3>
      <p>
        The signature is a key element that enhances the credibility of the certificate. Ensure that the uploaded signature is clear and legible, reflecting the professionalism of your organization.
      </p>
    </div>
  );
}

export default OrganizerSignature;
