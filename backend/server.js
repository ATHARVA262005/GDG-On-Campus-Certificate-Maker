const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Certificate = require('./models/Certificate');

dotenv.config();

const app = express();

const allowedOrigins = ['https://certgdgoncampus.vercel.app', 'http://localhost:5173', 'https://backend-certgdgoncampus.vercel.app','http://localhost:3000','https://backend-certgdgoncampus.vercel.app/send-email'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization', 'Mongo-URI']
}));

// Increase payload limit for large PDFs
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB connection (moved to the generate-certificate endpoint)
let mongoConnectionEstablished = false;

app.get('/test', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Generate Certificate Endpoint
app.post('/generate-certificate', async (req, res) => {
    const { recipientName, eventName, certificateId, organizerName, inChargeName } = req.body;
    const mongoUri = req.headers['mongo-uri'];

    if (!mongoUri) {
        return res.status(400).json({ message: 'MongoDB URI is required' });
    }

    // Establish MongoDB connection if not already connected
    if (!mongoConnectionEstablished) {
        try {
            await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 20000 });
            mongoConnectionEstablished = true;
            console.log('MongoDB connected');
        } catch (err) {
            return res.status(500).json({ message: 'MongoDB connection error', error: err });
        }
    }

    const certificateUrl = `https://backend-certgdgoncampus.vercel.app/certificate/${certificateId}`;

    try {
        const certificate = new Certificate({ 
            recipientName, 
            eventName, 
            certificateId, 
            certificateUrl, 
            organizerName, 
            inChargeName 
        });
        await certificate.save();
        res.status(201).json({ message: 'Certificate generated', certificateUrl });
    } catch (error) {
        res.status(500).json({ message: 'Error generating certificate', error });
    }
});

// Retrieve Certificate Endpoint
app.get('/certificate/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const certificate = await Certificate.findOne({ certificateId: id });
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        res.json(certificate);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving certificate', error });
    }
});

// Send Email Endpoint
app.post('/send-email', async (req, res) => {
    console.log('Received email request');
    
    try {
        const { 
            senderEmail, 
            senderPassword, 
            toEmail, 
            subject, 
            message, 
            pdfBase64,
            recipientName,
            eventName,
            certificateId,
            organizerName,
            inChargeName 
        } = req.body;

        if (!senderEmail || !senderPassword || !toEmail || !pdfBase64) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                error: 'Missing required fields',
                details: 'Email, password, recipient, and PDF are required'
            });
        }

        console.log('Configuring email transport');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: senderEmail,
                pass: senderPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        console.log('Verifying transport');
        await transporter.verify();

        console.log('Preparing email content');
        const mailOptions = {
            from: senderEmail,
            to: toEmail,
            subject: subject,
            text: message,
            attachments: [{
                filename: 'certificate.pdf',
                content: Buffer.from(pdfBase64, 'base64'),
                contentType: 'application/pdf'
            }]
        };

        console.log('Sending email');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);

        res.status(200).json({ 
            success: true,
            message: 'Email sent successfully!',
            messageId: info.messageId 
        });

    } catch (error) {
        console.error('Detailed email error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to send email',
            details: error.message,
            code: error.code
        });
    }
});




// Send Bulk Email Endpoint
app.post('/send-bulk-email', async (req, res) => {
    const { senderEmail, senderPassword, subject, message, certificates } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderEmail,
                pass: senderPassword,
            },
        });

        const emailPromises = certificates.map(async (certificate) => {
            const { email, pdfBase64 } = certificate;
            
            const mailOptions = {
                from: senderEmail,
                to: email,
                subject: subject,
                text: message,
                attachments: [{
                    filename: 'certificate.pdf',
                    content: Buffer.from(pdfBase64, 'base64'),
                    contentType: 'application/pdf'
                }]
            };

            return transporter.sendMail(mailOptions);
        });

        await Promise.all(emailPromises);
        res.status(200).json({ message: 'All emails sent successfully!' });
    } catch (error) {
        console.error('Error sending bulk email:', error.message); // Log specific error message
        res.status(500).json({ error: 'Failed to send bulk emails.', details: error.message });
    }
    
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// For Vercel deployment
module.exports = app;
