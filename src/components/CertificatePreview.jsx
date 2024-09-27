import React from 'react';
import pdfMake from '../utils/pdfmake'; // Adjust the path as necessary
import { backgroundImages } from '../utils/backgroundImages'; // Adjust the path as necessary

const CertificatePreview = ({ data }) => {
    const getBase64FromUrl = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Error fetching image:', error);
            return null;
        }
    };

    const generatePDF = async () => {
        try {
            const logoBase64 = await getBase64FromUrl(data.logo);
            const organizerSignatureBase64 = await getBase64FromUrl(data.organizerSignature);
            const inchargeSignatureBase64 = await getBase64FromUrl(data.inchargeSignature);
            const backgroundImageBase64 = backgroundImages[data.backgroundColor] || ''; // Default to empty string if color not found

            const docDefinition = {
                pageSize: { width: 1280, height: 720 },
                pageMargins: [0, 0, 0, 0],
                background: [
                    {
                        image: backgroundImageBase64,
                        width: 1280,
                        height: 720,
                    },
                ],
                content: [
                    {
                        text: 'Certificate of Achievement',
                        style: 'header',
                        alignment: 'center',
                        margin: [0, 120, 0, 0],
                    },
                    {
                        text: 'This is to certify that',
                        style: 'body',
                        alignment: 'center',
                        margin: [0, 20, 0, 0],
                    },
                    {
                        text: data.name,
                        style: 'name',
                        alignment: 'center',
                        margin: [0, 20, 0, 0],
                    },
                    {
                        text: 'has demonstrated exceptional skills and dedication by successfully completing the',
                        style: 'body',
                        alignment: 'center',
                        margin: [0, 20, 0, 0],
                    },
                    {
                        text: data.program,
                        style: 'subheader',
                        alignment: 'center',
                        margin: [0, 20, 0, 0],
                    },
                    {
                        text: `The program was designed to provide valuable knowledge and skills in ${data.description || 'emerging technologies and development practices'}.`,
                        style: 'body',
                        alignment: 'center',
                        margin: [120, 20, 120, 0],
                    },
                    {
                        columns: [
                            {
                                stack: [
                                    {
                                        image: organizerSignatureBase64,
                                        width: 120,
                                        height: 50,
                                        alignment: 'right',
                                        margin: [0, 10, 0, 0],
                                    },
                                    {
                                        text: data.organizer,
                                        style: 'signatory',
                                        alignment: 'right',
                                        margin: [0, 20, 0, 0],
                                    },
                                ],
                                width: '36.5%',
                                alignment: 'right',
                            },
                            {
                                stack: [
                                    {
                                        image: logoBase64,
                                        width: 150,
                                        height: 150,
                                        alignment: 'center',
                                        margin: [0, -20, 0, 0],
                                    },
                                ],
                                width: '40%',
                                alignment: 'center',
                            },
                            {
                                stack: [
                                    {
                                        image: inchargeSignatureBase64,
                                        width: 120,
                                        height: 50,
                                        alignment: 'center',
                                        margin: [0, 10, 0, 0],
                                    },
                                    {
                                        text: data.incharge,
                                        style: 'signatory',
                                        alignment: 'center',
                                        margin: [0, 20, 0, 0],
                                    },
                                ],
                                width: '10%',
                                alignment: 'left',
                            },
                        ],
                        margin: [0, 60, 150, 0],
                    },
                    {
                        text: `Certificate ID: ${data.id}`,
                        style: 'footer',
                        alignment: 'center',
                        margin: [0, 20, 0, 0],
                    },
                    {
                        text: `Verify at: https://gdgpdeacoem.in/certificates/${data.id}`,
                        style: 'footer',
                        alignment: 'center',
                        margin: [0, 10, 0, 0],
                    },
                ],
                styles: {
                    header: { fontSize: 30, bold: true, color: '#111827' },
                    subheader: { fontSize: 18, italics: true, color: '#111827' },
                    body: { fontSize: 16, color: '#111827' },
                    name: { fontSize: 24, bold: true, color: '#111827' },
                    signatory: { fontSize: 14, bold: true, color: '#111827' },
                    footer: { fontSize: 10, color: '#111827' },
                },
            };

            pdfMake.createPdf(docDefinition).download(`${data.name}_Certificate.pdf`, function (error) {
                if (error) {
                    console.error('PDF download failed:', error);
                }
            });
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <>
            <div
                className="relative mx-auto my-10 w-[1280px] h-[720px] bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImages[data.backgroundColor] || ''})` }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '120px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        textAlign: 'center',
                    }}
                >
                    <h1 className="text-3xl font-bold">Certificate of Achievement</h1>
                    <p className="mt-2 text-lg">This is to certify that</p>
                    <p className="mt-2 text-2xl font-semibold">{data.name}</p>
                    <p className="mt-4">
                        has demonstrated exceptional skills and dedication by successfully completing the
                    </p>
                    <p className="mt-4 text-lg">{data.program}</p>
                    <p className="mt-4 ">
                        The program was designed to provide valuable knowledge and skills in{' '}
                        {data.description || 'emerging technologies and development practices'}, and we commend the participant
                        for their dedication and active involvement.
                    </p>
                    <div className="mt-6 flex justify-around">
                        <img src={data.organizerSignature} alt="Organizer Signature" className="w-72 h-20 mr-10" />
                        <img src={data.logo} alt="Logo" className="w-24 h-24" />
                        <img src={data.inchargeSignature} alt="Incharge Signature" className="w-72 h-20 ml-10" />
                    </div>
                    <div className="mt-6 flex justify-around">
                        <p className="mt-2 mr-24 text-sm font-semibold">{data.organizer}</p>
                        <p className="mt-2 mr-20 text-sm font-semibold">{data.incharge}</p>
                    </div>
                    <div className=" flex flex-col justify-center items-center">
                        <p className="text-xs font-semibold">Certificate ID: {data.id}</p>
                        <p className="text-xs font-semibold">
                            Verify at: {data.verificationUrl}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    onClick={generatePDF}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Download Certificate
                </button>
            </div>
        </>
    );
};

export default CertificatePreview;