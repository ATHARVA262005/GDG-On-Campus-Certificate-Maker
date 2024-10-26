import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Sidebar = ({ isOpen, toggleSidebar, onPageChange }) => {
    const [expandedTopics, setExpandedTopics] = useState({});

    const topics = {
        single_docs: {
            title: 'Single Certificate Generator',
            subtopics: [
                { id: 'participant_name', label: "Participant's Name" },
                { id: 'program_name', label: 'Program Name' },
                { id: 'program_description', label: 'Program Description' },
                { id: 'organizer_name', label: "Organizer's Name" },
                { id: 'incharge_name', label: "Incharge's Name" },
                { id: 'organizer_signature', label: "Organizer's Signature" },
                { id: 'incharge_signature', label: "Incharge's Signature" },
                { id: 'logo', label: 'Logo' },
                { id: 'certificate_id', label: 'Certificate ID' },
                { id: 'verification_url', label: 'Verification URL' },
                { id: 'mongodb_uri', label: 'MongoDB URI' },
                { id: 'background_color', label: 'Background Color' },
                { id: 'email', label: 'Email' },
                { id: 'app_password', label: 'Gmail App Password' },
                { id: 'recipient_email', label: "Recipient's Email" },
            ]
        },
        bulk_docs: {
            title: 'Bulk Certificate Generator',
            subtopics: [
                { id: 'csv_format', label: 'CSV' },
                { id: 'mongodb_uri', label: 'MongoDB URI' },
                { id: 'email', label: 'Email' },
                { id: 'app_password', label: 'Gmail App Password' },
                { id: 'bulk_email_subject', label: 'Subject of Email' },
                { id: 'bulk_email_message', label: 'Email Message to Send' },
                { id: 'program_name', label: 'Program Name' },
                { id: 'bulk_program_description', label: 'Program Description' },
                { id: 'verification_url', label: 'Verification URL' },
                { id: 'organizer_name', label: "Organizer's Name" },
                { id: 'incharge_name', label: "Incharge's Name" },
                { id: 'logo', label: 'Logo' },
                { id: 'organizer_signature', label: "Organizer's Signature" },
                { id: 'incharge_signature', label: "Incharge's Signature" },
                { id: 'background_color', label: 'Background Color' },
            ]
        },
        contact: { title: 'Contact' },
    };
    

    const toggleTopic = (topic) => {
        setExpandedTopics((prev) => ({
            ...prev,
            [topic]: !prev[topic],
        }));
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 bg-gradient-to-r from-slate-800 to-slate-700 text-white w-64 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <h1 className="text-lg font-bold">Documentation</h1>
                <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">
                    Close
                </button>
            </div>
            <nav className="mt-4 h-[calc(100vh-64px)] overflow-y-auto">
                <ul>
                    {Object.keys(topics).map((topic) => (
                        <li key={topic} className="p-2 hover:bg-slate-700 cursor-pointer">
                            <div onClick={() => (topics[topic].subtopics ? toggleTopic(topic) : onPageChange(topic))}>
                                {topics[topic].title}
                            </div>
                            {expandedTopics[topic] && topics[topic].subtopics && (
                                <ul className="ml-4 mt-2">
                                    {topics[topic].subtopics.map((subtopic) => (
                                        <li
                                            key={subtopic.id}
                                            onClick={() => onPageChange(subtopic.id)}
                                            className="p-2 hover:bg-slate-600 cursor-pointer"
                                        >
                                            {subtopic.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <Link to="/" >
                    <div className='mt-10 p-2 bg-slate-700 hover:bg-slate-700 cursor-pointer'>
                        Back To Website
                    </div>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
