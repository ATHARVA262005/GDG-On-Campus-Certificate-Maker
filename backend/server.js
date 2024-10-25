const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Certificate = require('./models/Certificate');

dotenv.config();

const app = express();

const allowedOrigins = ['https://certgdgoncampus.vercel.app', 'http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Mongo-URI']
}));

app.use(express.json({ limit: '20mb' }));

// MongoDB connection (moved to the generate-certificate endpoint)
let mongoConnectionEstablished = false;

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
            await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
            mongoConnectionEstablished = true;
            console.log('MongoDB connected');
        } catch (err) {
            return res.status(500).json({ message: 'MongoDB connection error', error: err });
        }
    }

    const certificateUrl = `http://yourdomain.com/certificate/${certificateId}`;

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
    const { senderEmail, senderPassword, toEmail, subject, message, pdfBase64, recipientName, eventName, certificateId, organizerName, inChargeName } = req.body;

    const certificateUrl = `http://yourdomain.com/certificate/${certificateId}`;

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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderEmail,
                pass: senderPassword,
            },
        });

        const mailOptions = {
            from: senderEmail,
            to: toEmail,
            subject,
            text: message,
            attachments: [{ filename: 'certificate.pdf', content: pdfBase64, encoding: 'base64' }],
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!', info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
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
            const { email, pdfBase64, recipientName, eventName, certificateId, organizerName, inChargeName } = certificate;
            const certificateUrl = `http://yourdomain.com/certificate/${certificateId}`;

            const cert = new Certificate({
                recipientName,
                eventName,
                certificateId,
                certificateUrl,
                organizerName,
                inChargeName
            });

            await cert.save();

            const mailOptions = {
                from: senderEmail,
                to: email,
                subject,
                text: message,
                attachments: [{ filename: 'certificate.pdf', content: pdfBase64, encoding: 'base64' }],
            };

            return transporter.sendMail(mailOptions);
        });

        await Promise.all(emailPromises);
        res.status(200).json({ message: 'All emails sent successfully!' });
    } catch (error) {
        console.error('Error sending bulk email:', error);
        res.status(500).json({ error: 'Failed to send bulk emails.' });
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
