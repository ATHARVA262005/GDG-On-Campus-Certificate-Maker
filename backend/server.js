const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

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
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '20mb' }));

app.post('/send-email', async (req, res) => {
  const { senderEmail, senderPassword, toEmail, subject, message, pdfBase64 } = req.body;

  try {
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