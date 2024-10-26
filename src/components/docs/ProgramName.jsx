import React from 'react';

function ProgramName() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Program Name</h2>
      
      <p>
        The program name is essential as it identifies the specific event or activity for which the certificate is issued. This name will be prominently displayed on the certificate.
      </p>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mt-4">Certificate Display Area</h3>
        <div className="w-64 h-36 border border-gray-400 bg-black mt-2 flex items-center justify-center">
          <img src="src/assets/images/demo/programName.png" alt="program Name place image" />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-4">Entering the Program Name</h3>
      <p>
        Please provide the full name of the program or event. Ensure that the name is clear and accurately reflects the nature of the activity.
      </p>

      <h3 className="text-xl font-semibold mt-4">Format Requirements</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Length:</strong> The program name should be concise, ideally not exceeding 50 characters.</li>
        <li><strong>Clarity:</strong> Use clear and straightforward language.</li>
        <li><strong>Relevance:</strong> Ensure the name captures the essence of the program.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Example</h3>
      <p>
        Below are some sample program names:
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li>Advanced JavaScript Workshop</li>
        <li>Introduction to Data Science</li>
        <li>Design Sprint Challenge</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Importance of the Program Name</h3>
      <p>
        A well-defined program name not only helps in identification but also adds credibility to the certificate and reflects the professionalism of the organizing body.
      </p>
    </div>
  );
}

export default ProgramName;
