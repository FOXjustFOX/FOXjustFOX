# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Navigate to the portfolio directory:
```bash
cd portfolio
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to link to your Vercel account

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Set the root directory to `portfolio`
5. Click "Deploy"

## Environment Variables

No environment variables are required for the basic setup.

## Custom Domain

After deployment, you can add a custom domain in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Build Settings

The project uses the following default settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (automatic)
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## Performance Optimizations

The following optimizations are already configured:
- Image optimization with Next/Image
- Code splitting
- CSS optimization (experimental)
- Font optimization with Google Fonts
- Static page generation

## Troubleshooting

### Build fails on Vercel

1. Check Node.js version (should be 18.x or higher)
2. Clear Vercel cache and redeploy
3. Verify all dependencies are in package.json

### Fonts not loading

The project uses Google Fonts (Inter) via CSS import. If blocked, fonts will fall back to system fonts.

### GSAP animations not working

GSAP is registered client-side only. Ensure JavaScript is enabled in the browser.

## Local Development

```bash
cd portfolio
npm install
npm run dev
```

Visit http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

The optimized production build will be created in `.next` folder.
