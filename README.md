# Ayoub Ameur — Portfolio

<div align="center">
  <br />
  <img src="./public/assets/ayoublogo.png" width="160" alt="Ayoub Ameur Logo" />
  <br />
  <br />
  <p align="center">
    <strong>Software Engineering & AI Student at ENSA Fès</strong>
    <br />
    <em>Backend architectures, high-performance web platforms, automated QA systems, and applied AI systems.</em>
  </p>
  
  <p align="center">
    <a href="https://github.com/AyoubAmeur-crypto">GitHub</a> •
    <a href="https://linkedin.com/in/ayoub-ameur-772a70362">LinkedIn</a> •
    <a href="mailto:ayoubameur.tech@gmail.com">Email</a>
  </p>
</div>

---

## ⚡ Technical Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger), Lenis Smooth Scroll, Lucide Icons
- **Backend / Serverless**: Vercel Serverless Functions (`/api`), Nodemailer (Gmail SMTP), GitHub GraphQL API
- **Tooling & Optimization**: Vite 6, Rollup chunk splitting, WebP image compression, Core Web Vitals optimization

---

## 🚀 Vercel Deployment

This project is 100% pre-configured for instant zero-configuration deployment on **Vercel**.

### Step 1: Deploy to Vercel
1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com/) and click **Add New... > Project**.
3. Import this repository. Vercel will automatically detect the **Vite** framework preset, `dist` output directory, and the `/api` serverless functions.

### Step 2: Configure Environment Variables
In **Project Settings → Environment Variables**, add:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `EMAIL_USER` | Gmail address used by Nodemailer to send contact emails | `ayoubameur.tech@gmail.com` |
| `EMAIL_PASS` | 16-character Google App Password (without spaces) | `xxxx xxxx xxxx xxxx` |
| `EMAIL_TO` | Destination inbox for contact submissions (optional, defaults to EMAIL_USER) | `ayoubameur.tech@gmail.com` |
| `GITHUB_TOKEN` | GitHub Personal Access Token (`read:user` scope) | `ghp_xxxxxxxxxxxx` |
| `GITHUB_USERNAME` | GitHub username to fetch contribution stats for | `AyoubAmeur-crypto` |

Click **Deploy**!

---

## 💻 Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and fill in your credentials:
```bash
cp .env.example .env
```

### 3. Run development server
```bash
npm run dev
```
Visit `http://localhost:3000`. The Vite dev server includes built-in proxy middleware for `/api/contact` and `/api/github/contributions`.

---

## 📦 Production Build & Quality Check

```bash
# Type check without emitting
npm run lint

# Production build with chunk splitting and asset optimization
npm run build

# Preview production build locally
npm run preview
```

---

<p align="center">
  Crafted with precision by <strong>Ayoub Ameur</strong>
</p>
