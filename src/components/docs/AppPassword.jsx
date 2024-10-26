import React from 'react';

function AppPassword() {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold">Gmail App Password</h2>
      <p>
        A Gmail App Password is a unique 16-character password that allows third-party applications to securely access your Gmail account without requiring your main Google account password. This is particularly useful when sending automated emails from applications.
      </p>
      <h3 className="text-xl font-semibold">Steps to Create a Gmail App Password</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Ensure you have enabled <strong>2-Step Verification</strong> on your Google account:</li>
        <ul className="list-disc list-inside ml-6">
          <li>Go to <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Google Account Security</a>.</li>
          <li>Under the "Signing in to Google" section, enable 2-Step Verification if it’s not already enabled.</li>
        </ul>
        <li>Once 2-Step Verification is enabled, return to the <strong>Security</strong> section in your Google account.</li>
        <li>Under "Signing in to Google," locate and select <strong>App Passwords</strong>.</li>
        <li>Sign in to your account if prompted, then select <strong>Mail</strong> as the app and <strong>Other (Custom)</strong> for the device.</li>
        <li>Enter a custom name for the app, such as <em>MyApp</em>, then click <strong>Generate</strong>.</li>
        <li>
          Google will generate a 16-character app password. Copy and paste this password into your application’s settings where the email password is required.
        </li>
      </ol>
      <p>
        Note: This App Password only works for the specified app and device. Store it securely, as you won’t be able to view it again in Google’s settings once you navigate away from the page.
      </p>
    </div>
  );
}

export default AppPassword;
