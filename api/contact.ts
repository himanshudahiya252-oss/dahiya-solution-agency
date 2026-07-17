import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message, date } = req.body;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.CONTACT_DESTINATION) {
    console.error('Missing email configuration');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_DESTINATION,
      subject: `New Enquiry from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Service: ${service || 'N/A'}
        Message: ${message}
        Date: ${date}
      `,
    });
    return res.status(200).json({ success: true, message: "Thank you. Your enquiry has been submitted successfully." });
  } catch (error) {
    console.error('Email sending failed:', error);
    return res.status(500).json({ error: 'Failed to send enquiry. Please try again.' });
  }
}
