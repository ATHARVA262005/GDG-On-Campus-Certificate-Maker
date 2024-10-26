import React from 'react';

function VerificationURL() {
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl font-bold">Verification URL</h2>

      <div className="flex flex-col items-center">
        <h3 className="text-xl font-semibold mt-4">Certificate Display Area</h3>
        <div className="w-64 h-36 border border-gray-400 bg-black mt-2 flex items-center justify-center">
          <img src="src/assets/images/demo/verify at id.png" alt="Verify At place image" />
        </div>
      </div>

      <p>
        The Verification URL is a unique link that participants can use to validate their certificates. It ensures the authenticity of the issued certificates and allows easy verification by employers or institutions.
      </p>

      <h3 className="text-xl font-semibold mt-4">How to Create a Verification URL</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Generate a unique ID for each certificate. This ID will be part of the URL.</li>
        <li>Construct the URL using your base verification link. For example:
          <pre className="bg-gray-100 p-2 rounded-md">https://yourdomain.com/verify?id=UNIQUE_ID</pre>
        </li>
        <li>Replace <code>UNIQUE_ID</code> with the actual ID assigned to the certificate.</li>
      </ol>

      <h3 className="text-xl font-semibold mt-4">Example of a Verification URL</h3>
      <p>
        A sample verification URL might look like this:
        <pre className="bg-gray-100 p-2 rounded-md">https://yourdomain.com/verify?id=123456</pre>
      </p>

      <h3 className="text-xl font-semibold mt-4">Importance of Verification URLs</h3>
      <p>
        Verification URLs help to prevent certificate fraud and ensure that only genuine certificates are accepted. They also provide a seamless way for recipients to prove their accomplishments to potential employers or educational institutions.
      </p>

      <h3 className="text-xl font-semibold mt-4">Usage Instructions</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>Ensure that the Verification URL is included in the certificate email sent to participants.</li>
        <li>Advise recipients to keep the URL secure and use it when asked for certificate verification.</li>
        <li>Make sure that the link leads to a valid verification page that checks the certificate ID in your database.</li>
      </ul>
    </div>
  );
}

export default VerificationURL;
