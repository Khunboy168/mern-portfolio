import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import Contact from './models/Contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Basic Route
app.get('/', (req, res) => {
    res.send('MERN Portfolio API is running...');
});

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Save to Database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Send Email Notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: ['ks9397235@gmail.com', 'khunksk562@gmail.com'], // Your destination emails
            subject: `New Freelance Portfolio Contact from: ${name}`,
            text: `You have a new message from your portfolio website!\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
            html: `
                <h3>New Portfolio Contact</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // Only try to send email if credentials exist
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log("Email not sent: EMAIL_USER or EMAIL_PASS missing in .env");
        }

        res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
