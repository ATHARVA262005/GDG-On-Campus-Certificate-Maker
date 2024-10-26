import React from 'react';

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center  p-4 ">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4 text-center">
        If you have any questions or issues, please feel free to reach out.
      </p>
      
      <div className="flex flex-col space-y-4">
        <a
          href="https://github.com/ATHARVA262005/GDG-On-Campus-Certificate-Maker"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Raise an Issue on GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/atharvaralegankar/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Connect on LinkedIn
        </a>
      </div>
    </div>
  );
}

export default Contact;
