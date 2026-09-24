import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import nodemailer from 'nodemailer';

// Custom dev plugin to handle /api/github/contributions during `npm run dev`
const githubApiDevPlugin = (token: string, username: string) => ({
  name: 'github-api-dev-server',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url && req.url.startsWith('/api/github/contributions')) {
        const urlObj = new URL(req.url, 'http://localhost');
        const yearStr = urlObj.searchParams.get('year') || '';

        if (!token) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'GitHub token not found in .env' }));
          return;
        }

        let fromToArgs = '';
        if (yearStr) {
          fromToArgs = `(from: "${yearStr}-01-01T00:00:00Z", to: "${yearStr}-12-31T23:59:59Z")`;
        }

        const query = `
          query($userName:String!) {
            user(login: $userName){
              followers { totalCount }
              repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
                totalCount
                nodes {
                  name
                  description
                  url
                  stargazerCount
                  primaryLanguage { name color }
                }
              }
              recentRepositories: repositories(privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false, first: 4, orderBy: {field: PUSHED_AT, direction: DESC}) {
                nodes {
                  name
                  description
                  url
                  stargazerCount
                  pushedAt
                  primaryLanguage { name color }
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
          const ghRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              'Authorization': `bearer ${token}`,
              'Content-Type': 'application/json',
              'User-Agent': 'AyoubPortfolio',
            },
            body: JSON.stringify({ query, variables: { userName: username } }),
          });

          if (!ghRes.ok) {
            const errText = await ghRes.text();
            res.statusCode = ghRes.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: `GitHub GraphQL error: ${errText}` }));
            return;
          }

          const data = await ghRes.json();
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (err: any) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
        return;
      }
      next();
    });
  },
});

// Custom dev plugin to handle /api/contact during `npm run dev`
const contactApiDevPlugin = (env: Record<string, string>) => ({
  name: 'contact-api-dev-server',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url === '/api/contact' && req.method === 'POST') {
        let rawBody = '';
        req.on('data', (chunk: any) => {
          rawBody += chunk;
        });

        req.on('end', async () => {
          try {
            const body = JSON.parse(rawBody || '{}');
            const { name, email, message } = body;

            if (!name || !email || !message) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'All fields (name, email, message) are required.' }));
              return;
            }

            const emailUser = env.EMAIL_USER || process.env.EMAIL_USER;
            const emailPass = (env.EMAIL_PASS || process.env.EMAIL_PASS || '').replace(/\s+/g, '');
            const emailTo = env.EMAIL_TO || process.env.EMAIL_TO || 'ayoubameur.tech@gmail.com';

            if (!emailUser || !emailPass) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Email credentials not configured in environment.' }));
              return;
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

            await transporter.sendMail({
              from: `Portfolio Contact <${emailUser}>`,
              to: emailTo,
              replyTo: email,
              subject: `Portfolio Contact from ${name}`,
              text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
              html: `
                <h3>New Portfolio Contact</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
              `,
            });

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Email sent successfully!' }));
          } catch (err: any) {
            console.error('Contact email sending error:', err);
            let errMsg = err?.message || 'Failed to send email.';
            if (errMsg.includes('534-5.7.9') || errMsg.includes('WebLoginRequired')) {
              errMsg = 'Google SMTP 534: Please verify that EMAIL_PASS is a 16-character App Password generated for ' + (env.EMAIL_USER || 'your account') + ' (not a different Gmail). If already created, visit https://accounts.google.com/DisplayUnlockCaptcha in your browser and click Continue.';
            }
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: errMsg }));
          }
        });
        return;
      }
      next();
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const ghToken = env.GITHUB_TOKEN || process.env.GITHUB_TOKEN || '';
  const ghUser = env.GITHUB_USERNAME || 'AyoubAmeur-crypto';

  return {
    plugins: [
      react(),
      tailwindcss(),
      githubApiDevPlugin(ghToken, ghUser),
      contactApiDevPlugin(env),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      target: 'es2022',
      outDir: 'dist',
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              if (id.includes('gsap')) {
                return 'vendor-gsap';
              }
              if (id.includes('lenis')) {
                return 'vendor-scroll';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
