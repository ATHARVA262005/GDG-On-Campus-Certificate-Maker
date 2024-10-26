import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ParticipantName from '../components/docs/ParticipantName';
import ProgramName from '../components/docs/ProgramName';
import ProgramDescription from '../components/docs/ProgramDescription';
import OrganizerName from '../components/docs/OrganizerName';
import InchargeName from '../components/docs/InchargeName';
import OrganizerSignature from '../components/docs/OrganizerSignature';
import InchargeSignature from '../components/docs/InchargeSignature';
import Logo from '../components/docs/Logo';
import CertificateID from '../components/docs/CertificateID';
import VerificationURL from '../components/docs/VerificationURL';
import MongoDBURI from '../components/docs/MongoDBURI';
import BackgroundColor from '../components/docs/BackgroundColor';
import Email from '../components/docs/Email';
import AppPassword from '../components/docs/AppPassword';
import RecipientEmail from '../components/docs/RecipientEmail';
import BulkCSVFormat from '../components/docs/BulkCSVFormat';
import BulkEmailSubject from '../components/docs/BulkEmailSubject';
import BulkEmailMessage from '../components/docs/BulkEmailMessage';
import BulkProgramDescription from '../components/docs/BulkProgramDescription';
import Contact from '../components/docs/Contact';

function Docs() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('single_overview');

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSidebarOpen(false);
    };

    const renderContent = () => {
        switch (currentPage) {
            case 'participant_name': return <ParticipantName />;
            case 'program_name': return <ProgramName />;
            case 'program_description': return <ProgramDescription />;
            case 'organizer_name': return <OrganizerName />;
            case 'incharge_name': return <InchargeName />;
            case 'organizer_signature': return <OrganizerSignature />;
            case 'incharge_signature': return <InchargeSignature />;
            case 'logo': return <Logo />;
            case 'certificate_id': return <CertificateID />;
            case 'verification_url': return <VerificationURL />;
            case 'mongodb_uri': return <MongoDBURI />;
            case 'background_color': return <BackgroundColor />;
            case 'email': return <Email />;
            case 'app_password': return <AppPassword />;
            case 'recipient_email': return <RecipientEmail />;
            // Bulk Certificate Generator unique cases
            case 'csv_format': return <BulkCSVFormat />;
            case 'bulk_email_subject': return <BulkEmailSubject />;
            case 'bulk_email_message': return <BulkEmailMessage />;
            case 'bulk_program_description': return <BulkProgramDescription />;
            //contact
            case 'contact': return <Contact />;
            default: return <ParticipantName />;

            
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onPageChange={handlePageChange} />
            <div className="flex-1 p-4">
                <button onClick={toggleSidebar} className="text-2xl p-2 rounded-md">
                    {isSidebarOpen ? '✕' : '☰'}
                </button>
                <div className="mt-4">{renderContent()}</div>
            </div>
        </div>
    );
}

export default Docs;
