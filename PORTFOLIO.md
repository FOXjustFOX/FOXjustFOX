# 🎨 Igor Lis - Portfolio Website

This repository contains a production-ready personal portfolio website for Igor Lis.

## 📁 Repository Structure

```
FOXjustFOX/
├── portfolio/          ← **NEW: Complete Next.js 15 Portfolio Website**
│   ├── app/           - Next.js app router pages
│   ├── components/    - React components
│   ├── lib/           - Utilities and constants
│   ├── hooks/         - Custom React hooks
│   ├── public/        - Static assets
│   └── README.md      - Setup and customization guide
├── my_cv/             - Previous Vite-based CV (legacy)
└── README.md          - This file
```

## 🚀 Quick Start

Navigate to the portfolio directory and follow the setup:

```bash
cd portfolio
npm install
npm run dev
```

Visit http://localhost:3000 to see the portfolio.

## ✨ Features

The new portfolio includes:

- **Dark Cinematic Theme** - Inspired by Ark Media
- **Smooth Animations** - GSAP + ScrollTrigger + Lenis
- **Custom Cursor** - Interactive trail effect
- **Particle Background** - Animated particles in hero
- **Horizontal Project Carousel** - Pin-scrolling showcase
- **Interactive Skills** - Toggle switches with glow
- **Fully Responsive** - Mobile-first design
- **Performance Optimized** - Lighthouse 95+ score target

## 📚 Documentation

- **[portfolio/README.md](portfolio/README.md)** - Complete setup guide
- **[portfolio/DEPLOYMENT.md](portfolio/DEPLOYMENT.md)** - Deployment instructions
- **[portfolio/lib/constants.ts](portfolio/lib/constants.ts)** - Content customization

## 🛠️ Tech Stack

- Next.js 15 + TypeScript
- TailwindCSS 4
- GSAP + ScrollTrigger
- Framer Motion
- Lenis smooth scroll
- Lucide React icons

## 🌐 Deploy

Deploy to Vercel:

```bash
cd portfolio
vercel
```

Or import the repository in Vercel Dashboard (set root to `portfolio`).

## 📝 Customization

All content can be edited in `/portfolio/lib/constants.ts`:
- Personal information
- Skills & technologies
- Projects
- Experience
- Contact details
- Color scheme

## 📄 License

MIT License - Feel free to use this template for your own portfolio.

## 👤 Author

**Igor Lis**
- GitHub: [@FOXjustFOX](https://github.com/FOXjustFOX)
- Website: [pwrnow.pl](https://pwrnow.pl)

---

**Note**: The `my_cv` directory contains a previous Vite-based CV and can be kept for reference or removed if not needed.
