import React from 'react';

function InchargeSignature() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">In-Charge Signature for Certificate</h2>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mt-4">Certificate Display Area</h3>
        <div className="w-64 h-36 border border-gray-400 bg-black mt-2 flex items-center justify-center">
          <img src="src/components/docs/InchargeSignature.jsx" alt="incharge signature place image" />
        </div>
      </div>

      <p>
        The In-Charge Signature is an essential element on the certificate, providing authenticity and validation. It must be in a transparent format to ensure it blends seamlessly with the certificate background.
      </p>

      <h3 className="text-xl font-semibold mt-4">Signature Format Requirements</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>File Types:</strong> The signature should be uploaded in one of the following formats: PNG, JPG, or JPEG.</li>
        <li><strong>Transparency:</strong> Ensure the signature image has a transparent background to avoid any color clashes with the certificate design.</li>
        <li><strong>Resolution:</strong> A higher resolution is recommended for a clearer and more professional appearance.</li>
        <li><strong>Max Upload Size:</strong> The maximum file size for the logo is 20 MB.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">How to Prepare Your Signature</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Sign your name on a white sheet of paper.</li>
        <li>Use a scanner or a smartphone camera to capture the signature.</li>
        <li>Use an image editing tool to crop the signature and remove the background, ensuring it is transparent.</li>
        <li>Save the image in PNG, JPG, or JPEG format.</li>
      </ol>

      <h3 className="text-xl font-semibold mt-4">Uploading the Signature</h3>
      <p>
        During the certificate generation process, you will be prompted to upload the In-Charge Signature. Ensure that you have the prepared image ready for a smooth upload experience.
      </p>
    </div>
  );
}

export default InchargeSignature;
