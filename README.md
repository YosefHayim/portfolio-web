# Joseph Sabag - Portfolio Website

A modern, interactive portfolio website showcasing my journey as a Full-Stack Developer. Built with React 19, TypeScript, and a focus on performance, animations, and user experience.

![Portfolio Preview](client/public/screenshots/portfolio-preview.png)

## About Me

I'm Joseph Sabag, a Software Developer at **Predicto AI** with a passion for building impactful software solutions. My journey includes:

- **Military Service**: Combat operations, tactical leadership, and performance under pressure
- **Insurance Industry**: Automated workflows using Python bots, saving significant time and costs
- **Full-Stack Bootcamp**: IITC comprehensive program covering modern web technologies
- **Current Role**: Building AI-powered products at Predicto AI

**Philosophy**: _"Trying to get better everyday"_

## Featured Projects

| Project                                                                      | Description                                                       | Tech Stack                            |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------- |
| **[eBay MCP API Server](https://github.com/YosefHayim/ebay-api-mcp-server)** | Open source MCP server for eBay APIs - 230+ tools, 99.1% coverage | TypeScript, Node.js, OAuth 2.1        |
| **AutoBay SaaS**                                                             | Amazon to eBay dropshipping platform                              | Next.js, AWS, Firebase, Multiple APIs |
| **Quiz AI**                                                                  | React Native app for AI-powered quiz generation                   | React Native, Expo, OpenAI            |
| **Udemy Clone**                                                              | Full-stack learning platform                                      | React, Node.js, MongoDB, Redux        |
| **OCR Parse AI**                                                             | Invoice data extraction with AI                                   | React, Tesseract.js, OpenAI           |

## Tech Stack

### Frontend

- React 19 with TypeScript
- Vite 6 (build tool)
- Tailwind CSS v4
- Framer Motion (animations)
- React Router v7
- shadcn/ui components

### Backend (API)

- Node.js with Express
- TypeScript
- OpenAI SDK
- Zod validation

### Code Quality

- Biome (linting & formatting)
- Prettier with Tailwind plugin
- Husky (git hooks)
- TypeScript strict mode

## Project Structure

```
portfolio-web/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   ├── Pages/          # Route page components
│   │   ├── animations/     # Framer Motion variants
│   │   ├── data/           # Static data (projects, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── utils/          # Helper utilities
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Express API backend
│   └── src/
│       ├── config/         # Environment & prompts
│       ├── middleware/     # Express middleware
│       └── routes/         # API routes
├── package.json            # Root workspace config
└── pnpm-workspace.yaml     # pnpm workspace definition
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+ (`npm install -g pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/YosefHayim/portfolio-web.git
cd portfolio-web

# Install all dependencies
pnpm install
```

### Development

```bash
# Start frontend only
pnpm dev

# Start backend only
pnpm dev:server

# Start both frontend and backend
pnpm dev:all
```

### Build

```bash
# Build frontend
pnpm build

# Build backend
pnpm build:server

# Build everything
pnpm build:all
```

### Code Quality

```bash
# Format code
pnpm format

# Lint code
pnpm lint
```

## Environment Variables

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:3001
```

### Server (`server/.env`)

```env
OPENAI_API_KEY=your-openai-key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Key Features

### Portfolio Sections

- **Homepage**: Hero section with animated tech icons and personal intro
- **About**: Interactive journey timeline with career milestones
- **Projects**: Showcase of 12+ projects with detailed views
- **Tech Stack**: Organized skills by category with visual badges
- **Certifications**: Professional certifications and achievements

### Technical Highlights

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Smooth Animations**: Page transitions, scroll effects, hover states
- **Dark Theme**: Carefully crafted dark mode with neon accents
- **Performance**: Optimized bundle size, lazy loading, efficient rendering
- **Type Safety**: Full TypeScript coverage with strict mode
- **AI Chat**: Optional AI assistant for portfolio questions (requires API key)

## Design System

### Colors

| Color         | Hex       | Usage                            |
| ------------- | --------- | -------------------------------- |
| Primary Green | `#05df72` | CTAs, highlights, success states |
| Cyan          | `#00d9ff` | Secondary accent, tech badges    |
| Yellow        | `#fdc700` | Warnings, achievements           |
| Background    | `#0a0e1a` | Main background                  |
| Card          | `#1a1f2e` | Card backgrounds                 |

### Typography

- Font: System font stack for optimal performance
- Headings: Bold, tracking-tight
- Body: Relaxed line height for readability

## Deployment

The frontend is optimized for static hosting:

- **Vercel**: Zero-config deployment
- **Netlify**: Works out of the box
- **GitHub Pages**: With proper routing configuration

The backend can be deployed to:

- **Render**: Free tier available
- **Railway**: Simple deployment
- **AWS Lambda**: Serverless option

## Contributing

This is a personal portfolio, but suggestions are welcome! Feel free to:

1. Open an issue for bugs or suggestions
2. Fork and create a PR for improvements
3. Star the repo if you find it useful

## Connect With Me

- **GitHub**: [@YosefHayim](https://github.com/YosefHayim)
- **LinkedIn**: [Joseph Sabag](https://www.linkedin.com/in/yosefhayim/)
- **WhatsApp**: [Contact Me](https://wa.me/546187549)
- **Discord**: josephsabag

## License

MIT License - feel free to use this as inspiration for your own portfolio!

---

Built with passion by Joseph Sabag
