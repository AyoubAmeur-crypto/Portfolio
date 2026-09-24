import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import dns from 'dns';

// Force Node to use IPv4 first to prevent ENETUNREACH errors with Gmail SMTP
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields (name, email, message) are required.' });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');
    const emailTo = process.env.EMAIL_TO || 'ayoubameur.tech@gmail.com';

    if (!emailUser || !emailPass) {
      console.error('Email credentials missing in serverless environment.');
      return res.status(500).json({ error: 'Email service is not properly configured on server.' });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `Portfolio Contact <${emailUser}>`,
      to: emailTo,
      replyTo: email,
      subject: `New Portfolio Contact from ${name}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
          <h3 style="color: #2563eb; margin-bottom: 16px;">New Portfolio Contact</h3>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f5; padding: 14px; border-radius: 8px; border-left: 4px solid #2563eb; white-space: pre-wrap;">${escapeHtml(message)}</div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error: any) {
    console.error('Error sending email via Vercel serverless function:', error);
    let errMsg = error?.message || 'Failed to send email.';
    if (errMsg.includes('534-5.7.9') || errMsg.includes('WebLoginRequired')) {
      errMsg = 'Google SMTP 534: Please verify that EMAIL_PASS is a 16-character App Password generated for your Gmail account.';
    }
    return res.status(500).json({ error: errMsg });
  }
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
