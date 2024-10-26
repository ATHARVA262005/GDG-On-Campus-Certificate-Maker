import React from 'react';

function InchargeName() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">In-Charge Name for Certificate</h2>

      
      <p>
        The In-Charge Name represents the individual responsible for overseeing the event or program for which the certificates are being issued. This person may be a faculty member or a member of your club.
      </p>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mt-4">Certificate Display Area</h3>
        <div className="w-64 h-36 border border-gray-400 bg-black mt-2 flex items-center justify-center">
          <img src="src/assets/images/demo/inchargeName.png" alt="incharge name place image" />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-4">Who Can Be the In-Charge?</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Faculty Members:</strong> Professors or instructors who are supervising the event.</li>
        <li><strong>Club Members:</strong> Active members of your club who take on the responsibility of managing the event.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Importance of Specifying the In-Charge Name</h3>
      <p>
        Including the In-Charge Name on the certificate adds a personal touch and enhances the credibility of the certificate. It signifies the authority behind the event and assures participants of the recognition from a responsible figure.
      </p>

      <h3 className="text-xl font-semibold mt-4">How to Specify the In-Charge Name</h3>
      <p>
        When generating the certificate, ensure you input the full name of the In-Charge, including any titles (e.g., Dr., Prof., etc.) that may be applicable. This detail can be added in the appropriate field during the certificate generation process.
      </p>
    </div>
  );
}

export default InchargeName;
