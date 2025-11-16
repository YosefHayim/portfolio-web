# Joseph Sabag - Portfolio Web

> *"Trying to get better everyday"*

A modern, interactive portfolio website showcasing my journey as a full-stack developer. Built with React 19, TypeScript, and Vite, this portfolio demonstrates my technical skills, professional growth, and creative problem-solving through carefully curated projects and experiences.

## 🌟 Overview

This portfolio serves as a comprehensive hub to present my professional identity, technical expertise, and development philosophy. From zero coding background to building production-ready applications, every project here represents real problems solved with practical solutions.

**Live Site:** [View Portfolio](https://yosefhayim.github.io/portfolio-web/) *(if deployed)*

## ✨ Features

### Current Features
- **🎨 Modern UI/UX**: Clean, minimalist design with smooth animations and transitions
- **📱 Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **🚀 Fast Performance**: Vite-powered build with optimized assets
- **♿ Accessible**: Semantic HTML, ARIA labels, keyboard navigation support
- **🎯 Sections**:
  - **Hero**: Quick introduction with social links and CTA
  - **About**: Career journey timeline from military service to software engineering
  - **Projects**: 12+ projects ranging from automation scripts to full-stack applications
  - **Tech Stack**: Comprehensive skills organized by category (Frontend, Backend, DevOps, etc.)
  - **Certifications**: Professional development and course completions
  - **404 Page**: Custom error page with navigation

### Planned Features (Three.js Transformation)
> See `CLAUDE.md` for full roadmap

The portfolio will evolve into an immersive 3D experience featuring:
- 🌌 **Matrix-inspired Hero Scene**: Falling code particles with interactive terminal
- 🪐 **Projects Solar System**: Projects as orbiting planets with realistic physics
- ⭐ **Tech Stack Constellation**: Skills displayed as an interactive star map
- 🚂 **Journey Railway**: Career timeline as a 3D train journey through milestones
- 🏆 **Trophy Case**: Certifications in a museum-style 3D display
- 🎮 **Easter Eggs**: Hidden interactions and personality-driven animations

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: React 19 (latest)
- **Language**: TypeScript 5.7
- **Build Tool**: Vite 6.x
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 (with @tailwindcss/vite plugin)
- **Package Manager**: pnpm

### UI & Design
- **Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React, React Icons
- **Animations**: tw-animate-css
- **Theme**: CSS variables with "new-york" style, neutral base color

### Code Quality & Tooling
- **Linter/Formatter**: Biome (extends ultracite config)
- **Code Formatting**: Prettier with Tailwind class sorting
- **Pre-commit Hooks**: Husky + lint-staged
- **Type Checking**: TypeScript with strict null checks

### Planned 3D Tech Stack
- Three.js
- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing
- GSAP (animations)

## 📁 Project Structure

```
portfolio-web/
├── public/
│   ├── favicon/              # Favicon assets
│   ├── images-of-me/         # Profile images
│   ├── resume/               # CV/Resume files
│   ├── screenshots/          # Project screenshots
│   └── svgs/                 # SVG assets
├── src/
│   ├── Components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── Navbar/           # Navigation component
│   │   ├── Footer/           # Footer component
│   │   ├── Sidebar/          # Mobile sidebar
│   │   └── [various]/        # Social buttons, alerts, etc.
│   ├── Pages/
│   │   ├── Homepage/         # Hero section
│   │   ├── About/            # Journey timeline
│   │   ├── Projects/         # Project showcase
│   │   ├── TechStack/        # Skills organized by category
│   │   ├── Certifications/   # Certifications display
│   │   └── NotFound404/      # 404 error page
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utilities (cn() for className merging)
│   ├── App.tsx               # Main app component with routing
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── CLAUDE.md                 # Detailed project instructions for Claude Code
├── GEMINI.md                 # Project overview for Gemini
├── README.md                 # This file
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── biome.json                # Biome linter config
└── components.json           # shadcn/ui configuration

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YosefHayim/portfolio-web.git
   cd portfolio-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```
   The site will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   pnpm build
   ```

5. **Preview production build**
   ```bash
   pnpm preview
   ```

## 📜 Development Commands

```bash
# Start development server (Hot Module Replacement enabled)
pnpm dev

# Build for production (TypeScript check + Vite build)
pnpm build

# Preview production build locally
pnpm preview

# Format code (Prettier + Biome)
pnpm format

# Lint code (Biome)
pnpm lint

# Prepare git hooks (Husky)
pnpm prepare
```

## 🎯 Featured Projects

This portfolio showcases **12+ real-world projects** across various domains:

### 🚀 Production & SaaS
1. **[eBay MCP API Server](https://www.npmjs.com/package/ebay-api-mcp-server)** - Published npm package
   - Model Context Protocol server for eBay API
   - OAuth 2.1 authentication, OpenAPI schema conversion
   - Integrates with Claude Desktop & Gemini CLI
   - **Tech**: TypeScript, Node.js, Express, Vitest

2. **AutoBay DropShipping SaaS** *(In Development)*
   - Full-stack Amazon to eBay dropshipping platform
   - Trademark/patent verification, multi-API integration
   - **Tech**: Next.js, TypeScript, Playwright, AWS, Stripe, PayPal

### 📱 Mobile & AI
3. **Quiz AI React Native** *(In Development)*
   - iOS/Android quiz generation from PDFs, images, YouTube
   - OpenAI Agents for content parsing
   - **Tech**: React Native, Expo, Supabase, OpenAI API

4. **Telegram AI Calendar Assistant** *(In Development)*
   - AI-powered Google Calendar management via Telegram
   - Natural language event creation and reminders
   - **Tech**: Node.js, Grammy.js, Google API, OpenAI Agents

### 🎓 Full-Stack Applications
5. **[Udemy Clone](https://udemy-clone-ron-and-ben-front.onrender.com/)**
   - Complete course platform with authentication & payments
   - **Tech**: React, Node.js, MongoDB, Redux, TypeScript

6. **[Tim Trailers](https://iitc-b-frontend-vanilla-tim-trailers.onrender.com/)**
   - Movie trailer platform with TMDB API
   - **Tech**: Vanilla JavaScript, TMDB API

7. **[OCR Parse AI](https://pdf-extractor-data-helping-mom-fronted.onrender.com/)**
   - AI-powered PDF invoice data extraction tool
   - Built to solve real business problem
   - **Tech**: React, Node.js, Tesseract.js (OCR), OpenAI API, Sharp

### 🤖 Automation & Scrapers
8. **Amazon ASIN Scraper** - CAPTCHA bypass automation
9. **eBay Sellers Title Scraper** - Multi-page data collection
10. **HarABituah Government Scraper** - Process automation (first Python project)
11. **Stock Trading Bots** - MACD, RSI, SMA strategies (Interactive Brokers API)
12. **Crypto Trading Bots** - Automated Binance trading (Binance API)

> **Note**: Projects 8-12 were built with **zero coding background** using ChatGPT as a learning tool, demonstrating rapid self-learning and problem-solving skills.

## 🎨 Design Philosophy

### Current Design
- **Minimalist & Professional**: Clean layouts with purposeful whitespace
- **Dark Theme**: Charcoal background (`#111827`) with high contrast
- **Accent Colors**: WhatsApp green (`#05df72`) for primary actions
- **Typography**: JetBrains Mono for code-like aesthetic
- **Responsive First**: Mobile-optimized with progressive enhancement

### Planned 3D Design
- **Matrix Aesthetic**: Cyberpunk coding environment meets Mac OS elegance
- **Color Palette**:
  - Background: `#0a0e1a` (deep void)
  - Primary Glow: `#05df72` (neon green)
  - Secondary: `#00d9ff` (cyan)
  - Accent: `#fdc700` (yellow achievements)
- **Performance Targets**:
  - Desktop: 60 FPS (1080p)
  - Mobile: 30 FPS (simplified scenes)
  - Load Time: <3s

## 🏗️ Architecture & Conventions

### Import Alias
Use `@/` for all internal imports:
```typescript
import { Component } from '@/Components/Component';
import { cn } from '@/lib/utils';
```

### Component Organization
- **PascalCase** for component files matching component name
- Nested directory pattern: each component in its own folder
- Use `cn()` helper for conditional/merged Tailwind classes

### Routing Structure
```
/               → Homepage (Hero)
/about          → Career journey timeline
/projects       → Project showcase
/techStack      → Skills by category
/certifications → Professional development
/404            → Custom error page
```

### Code Quality
- **TypeScript**: Strict null checks enabled
- **Biome**: Primary linter (ultracite config)
- **Prettier**: Tailwind class auto-sorting
- **Husky**: Pre-commit hooks for quality checks

## 🌐 Browser Support

- ✅ Chrome 90+ (optimal)
- ✅ Firefox 88+ (good)
- ✅ Safari 15+ (acceptable)
- ✅ Edge 90+ (optimal)
- ⚠️ Mobile Safari (simplified for 3D features)

## 📊 Performance Metrics (Goals)

- **Lighthouse Performance**: 90+
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **Cumulative Layout Shift**: <0.1

## 🗺️ Roadmap

### Phase 1: Current (Completed ✅)
- [x] Core portfolio structure
- [x] Responsive design
- [x] Project showcase
- [x] Tech stack display
- [x] Career timeline
- [x] Certifications page

### Phase 2-5: Three.js Transformation (Planned)
- [ ] Hero Matrix scene with falling code
- [ ] Projects solar system with orbital mechanics
- [ ] Tech stack constellation map
- [ ] Journey railway with train animation
- [ ] Certifications trophy case

### Phase 6-8: Advanced Features (Planned)
- [ ] Navigation system (WASD controls, minimap)
- [ ] Mobile optimization & fallback mode
- [ ] Post-processing effects (bloom, scanlines)
- [ ] Sound design & spatial audio

### Phase 9-10: Polish (Planned)
- [ ] Performance optimization (LOD, frustum culling)
- [ ] Easter eggs & personality features
- [ ] A/B testing & analytics

> Full roadmap details in `CLAUDE.md`

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is open source and available for learning purposes. Feel free to use as inspiration for your own portfolio, but please don't copy it wholesale.

## 📞 Contact & Social

- **GitHub**: [@YosefHayim](https://github.com/YosefHayim)
- **LinkedIn**: [Joseph Sabag](https://www.linkedin.com/in/joseph-sabag/)
- **Discord**: Available on request
- **WhatsApp**: Available via portfolio site
- **Email**: Available on LinkedIn

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful, accessible UI components
- **Vercel** - Inspiration for clean design patterns
- **Bruno Simon** - Three.js portfolio inspiration
- **IITC Bootcamp** - Foundational full-stack training
- **ChatGPT** - Learning companion during early automation projects

---

**Built with ❤️ and a growth mindset** | *Trying to get better everyday*
