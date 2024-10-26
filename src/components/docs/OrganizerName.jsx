import React from 'react';

function OrganizerName() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">

      
      <h2 className="text-2xl font-bold">Organizer's Name</h2>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mt-4">Certificate Display Area</h3>
        <div className="w-64 h-36 border border-gray-400 bg-black mt-2 flex items-center justify-center">
          <img src="src/assets/images/demo/Organizername.png" alt="Organizer name place image" />
        </div>
      </div>

      <p>
        The organizer's name is an important element on the certificate, signifying the individual or team responsible for the event or program. This name will be prominently displayed on the certificate alongside the participant's details.
      </p>

      <h3 className="text-xl font-semibold mt-4">Entering the Organizer's Name</h3>
      <p>
        When filling out the certificate generation form, please provide the full name of the organizer. This can be an individual or a representative from your organization.
      </p>

      <h3 className="text-xl font-semibold mt-4">Format Requirements</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Full Name:</strong> Include both first and last names.</li>
        </ul>

      <h3 className="text-xl font-semibold mt-4">Example</h3>
      <p>
        <strong>John Doe</strong> 
      </p>

      <h3 className="text-xl font-semibold mt-4">Importance of Accuracy</h3>
      <p>
        Ensure that the organizer's name is spelled correctly, as it will appear on all issued certificates. A well-presented name enhances the certificate's legitimacy and significance.
      </p>
    </div>
  );
}

export default OrganizerName;
