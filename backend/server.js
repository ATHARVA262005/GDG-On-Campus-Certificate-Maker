const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const allowedOrigins = ['https://certgdgoncampus.vercel.app'];

const app = express();
app.use(cors({
    origin: ['https://certgdgoncampus.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials if needed
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cors());
app.use(express.json({ limit: '20mb' })); // Adjust the limit as necessary

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

// New Endpoint for Bulk Email Sending
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

app.listen(5000, () => {
  console.log('Server running on https://backend-certgdgoncampus.vercel.app');
});
