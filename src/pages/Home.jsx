import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineDocumentScanner } from "react-icons/md";
import DotPattern from '../components/ui/DotPattern';
import { cn } from "../lib/utils";

// Tailwind CSS classes (adjusted for better layout)
const heroStyles = 'min-h-screen text-center flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-black text-white py-8 px-4';
const contentStyles = 'flex flex-col items-center space-y-8';
const buttonContainer = 'flex justify-center mt-8 space-x-4';
const textCenter = 'text-center';
const descriptionText = 'text-lg leading-loose mb-6';
const footerStyles = 'text-gray-400 text-center py-4 flex justify-center items-center';

const HomePage = () => {
  return (
    
    <div className={heroStyles}>
      <DotPattern
        opacity={0.4}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
      <div className={contentStyles}>  {/* New content section */}
        <div className="flex flex-col justify-center items-center h-full">  {/* Wrap content in a centered column */}
          <h1 className="text-4xl font-bold mb-4">Generate Certificates with Ease</h1>
          <p className={descriptionText}>
            This web application is designed to create user-friendly,
            customizable certificates for various events. Specifically developed
            for GDG On Campus chapters, this tool streamlines the process of
            generating and distributing certificates to participants.
          </p>
          <div className={buttonContainer}>
            <Link to="/single-certificate" className="bg-blue-500 text-white px-6 py-4 rounded-lg hover:bg-blue-600">Single Certificate</Link>
            <Link to="/bulk-certificate" className="bg-blue-500 text-white px-6 py-4 rounded-lg hover:bg-blue-600">Bulk Certificate</Link>
          </div>
          <div className="flex justify-center items-center">
            <div className={textCenter}>
              <p className="text-gray-400 mt-5 mb-2">Need Some help:</p>
              <a href="/docs" className="text-white hover:underline flex items-center">
                <MdOutlineDocumentScanner className="inline-block mr-2 text-3xl" />
                <span className='text-end'>Read Documentation</span>
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className={textCenter}>
              <p className="text-gray-400 mt-5">View project on GitHub:</p>
              <a href="https://github.com/ATHARVA262005/GDG-On-Campus-Certificate-Maker" className="text-white hover:underline flex items-center">
                <FaGithub className="inline-block mr-2 text-3xl" />
                <span className='text-end'>GDG-On-Campus-Certificate-Maker</span>
              </a>
            </div>
          </div>
          <p className={`${textCenter} text-gray-400 mt-8 mb-4`}>Used By:</p>
          <div className="flex justify-center my-5">
            <img src="https://pbs.twimg.com/profile_images/1835181413424873472/JPpOu_UA_400x400.jpg" alt="Logo 1" className="w-32 h-32 rounded-full" />
          </div>
        </div>
      </div>
      <div className={footerStyles}>
        <p>Created By <a href="https://atharvaralegankar.me" target="_blank" className="text-blue-500 hover:underline">Atharva Ralegankar</a> with lots of <FaHeart className="inline-block ml-2 text-red-500" /></p>  {/* Added link to Atharva's portfolio */}
      </div>

      
    </div>
  );
};

export default HomePage;