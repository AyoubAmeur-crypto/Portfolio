import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import dns from 'dns';

// Force Node to use IPv4 first to prevent ENETUNREACH errors with Gmail SMTP
dns.setDefaultResultOrder('ipv4first');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Set up Gmail transporter with sanitized password (spaces stripped from 16-character app password)
const emailUser = process.env.EMAIL_USER;
const emailPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

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

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const mailOptions = {
    from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || 'ayoubameur.tech@gmail.com',
    replyTo: email,
    subject: `New Portfolio Contact from ${name}`,
    text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    html: `
      <h3>New Portfolio Contact</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    let errMsg = error?.message || 'Failed to send email';
    if (errMsg.includes('534-5.7.9') || errMsg.includes('WebLoginRequired')) {
      errMsg = 'Google SMTP 534: Please verify that EMAIL_PASS is a 16-character App Password generated for ' + (process.env.EMAIL_USER || 'your account') + ' (not a different Gmail). If already created, visit https://accounts.google.com/DisplayUnlockCaptcha in your browser and click Continue.';
    }
    res.status(500).json({ error: errMsg });
  }
});

app.get('/api/github/contributions', async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'AyoubAmeur-crypto';
  const yearStr = req.query.year as string;

  if (!token) {
    return res.status(500).json({ error: 'GitHub token is not configured in the backend' });
  }

  let fromToArgs = '';
  if (yearStr) {
    fromToArgs = `(from: "${yearStr}-01-01T00:00:00Z", to: "${yearStr}-12-31T23:59:59Z")`;
  }

  const query = `
    query($userName:String!) {
      user(login: $userName){
        followers {
          totalCount
        }
        repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            url
            stargazerCount
            primaryLanguage {
              name
              color
            }
          }
        }
        recentRepositories: repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, first: 4, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            name
            description
            url
            stargazerCount
            pushedAt
            primaryLanguage {
              name
              color
            }
          }
        }
        contributionsCollection${fromToArgs} {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('GitHub API error:', errText);
      return res.status(response.status).json({ error: 'Failed to fetch GitHub contributions' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Network error fetching GitHub contributions:', error);
    res.status(500).json({ error: 'Network error fetching GitHub contributions' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
