import React from 'react';

function ParticipantName() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Participant's Name</h2>
      <p>
        The participant's name is a crucial component of the certificate, as it recognizes the individual who has completed the program or event.
      </p>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mt-4">Certificate Display Area</h3>
        <div className="w-64 h-36 border border-gray-400 bg-black mt-2 flex items-center justify-center">
          <img src="src/assets/images/demo/participantsName.png" alt="program description place image" />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-4">Entering the Participant's Name</h3>
      <p>
        Please enter the full name of the participant as you would like it to appear on the certificate. Ensure that the spelling is correct to maintain accuracy.
      </p>

      <h3 className="text-xl font-semibold mt-4">Format Requirements</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>First Name:</strong> The given name of the participant.</li>
        <li><strong>Last Name:</strong> The family name of the participant.</li>
        <li><strong>Maximum Length:</strong> Names should not exceed 50 characters.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Example</h3>
      <p>
        Below is an example of how the participant's name should be formatted on the certificate:
      </p>
      <div className="border p-4 rounded-md shadow-md bg-gray-100">
        <p className="text-xl font-semibold">John Doe</p>
      </div>

      <h3 className="text-xl font-semibold mt-4">Importance of the Name</h3>
      <p>
        The participant's name on the certificate serves as a formal acknowledgment of their achievement. It is essential that it reflects their identity accurately.
      </p>
    </div>
  );
}

export default ParticipantName;
