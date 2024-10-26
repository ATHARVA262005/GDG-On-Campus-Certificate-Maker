import React from 'react';

function BulkProgramDescription() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Program Description</h2>
      <p>
        The program description provides context and details about the event or course that the participant has completed. This information is important for both record-keeping and to acknowledge the significance of the achievement.
      </p>

      <h3 className="text-xl font-semibold mt-4">Entering the Program Description</h3>
      <p>
        Please provide a brief yet informative description of the program. This should include the main objectives, key activities, and outcomes of the program.
      </p>

      <h3 className="text-xl font-semibold mt-4">Format Requirements</h3>
      <ul className="list-disc list-inside space-y-2">
        <li><strong>Length:</strong> The description should be concise, ideally between 50 to 150 words.</li>
        <li><strong>Clarity:</strong> Use clear and simple language to ensure that the description is easily understood.</li>
        <li><strong>Relevance:</strong> Focus on the aspects of the program that highlight its value and impact.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">Example</h3>
      <p>
        Below is a sample description that could be used:
      </p>
      <blockquote className="border-l-4 border-blue-500 pl-4 italic">
        "This program aimed to enhance the participants' skills in software development through hands-on workshops and collaborative projects. Participants learned the latest technologies and methodologies, preparing them for real-world challenges."
      </blockquote>

      <h3 className="text-xl font-semibold mt-4">Importance of the Description</h3>
      <p>
        A well-crafted program description helps to convey the significance of the participant's accomplishment and can also enhance the credibility of the certificate itself.
      </p>
    </div>
  );
}

export default BulkProgramDescription;
