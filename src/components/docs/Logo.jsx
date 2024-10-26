import React from 'react';

function Logo() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Club Logo for Certificate</h2>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mt-4">Certificate Display Area</h3>
        <div className="w-64 h-36 border border-gray-400 bg-black mt-2 flex items-center justify-center">
          <img src="src/assets/images/demo/logo.png" alt="logo place image" />
        </div>
      </div>

      <p>
        The club logo is a vital part of the certificate, representing your organization and adding a professional touch. It should be uploaded in a suitable format to ensure clarity and quality on the final certificate.
      </p>

      <h3 className="text-xl font-semibold mt-4">Logo Format Requirements</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>File Types:</strong> The logo should be uploaded in PNG, JPG, or JPEG format.</li>
        <li><strong>Transparency:</strong> If using a PNG file, ensure that the logo has a transparent background to fit well with the certificate design.</li>
        <li><strong>Resolution:</strong> A higher resolution is recommended (at least 300 DPI) for better clarity when printed.</li>
        <li><strong>Max Upload Size:</strong> The maximum file size for the logo is 20 MB.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">How to Prepare Your Club Logo</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Design your logo using a graphic design tool (e.g., Adobe Illustrator, Canva).</li>
        <li>Export the logo in PNG, JPG, or JPEG format.</li>
        <li>If necessary, use an image editing tool to crop or adjust the logo's size.</li>
        <li>Make sure the logo is saved with a transparent background if required.</li>
      </ol>

      <h3 className="text-xl font-semibold mt-4">Uploading the Logo</h3>
      <p>
        During the certificate generation process, you will be prompted to upload the club logo. Ensure that you have the prepared image ready for a smooth upload experience.
      </p>
    </div>
  );
}

export default Logo;
