# replit.md

## Overview

This is a vanilla JavaScript portfolio application showcasing a Computer Science Engineer's work and experience, based on the blue1x GitHub repository. The application features a sleek, terminal-inspired design with interactive elements including a background brick breaker game, dark/light theme switching, and smooth animations. Built entirely with vanilla HTML, CSS, and JavaScript for maximum performance and compatibility.

## System Architecture

### Frontend Architecture
- **Framework**: Vanilla JavaScript with ES6+ features
- **Styling**: Custom CSS with CSS variables for theming
- **Fonts**: JetBrains Mono and Fira Code monospace fonts
- **Animations**: CSS animations and JavaScript-powered interactions
- **Game Engine**: Canvas-based brick breaker game in hero background
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: JavaScript with ES modules
- **Static Serving**: Express static middleware for assets
- **Development**: Simple file watching and auto-reload

## Key Components

### Client-Side Features
1. **Terminal Preloader**: Animated loading screen with typing animation and progress bar
2. **Brick Breaker Game**: Interactive canvas-based game running in hero section background
3. **Theme System**: Dark/light theme toggle with JetBrains Mono/Fira Code font switching
4. **Navigation**: Auto-hiding navigation with smooth scrolling to sections
5. **Portfolio Sections**: Hero, About, Work, Contact with intersection observer animations
6. **Interactive Elements**: Hover effects, particle systems, and floating code elements

### Server-Side Components
1. **Static File Server**: Express.js serving HTML, CSS, JS, and assets
2. **Security Headers**: Content security and caching optimization
3. **Error Handling**: Basic error middleware for production stability

### Game Features
- **Enhanced Controls**: Mouse, touch, and keyboard (arrow keys/WASD) paddle control
- **Code-Themed Bricks**: Programming keywords and symbols displayed on each brick
- **Reduced Blur Effects**: Minimized glow effects for better gameplay visibility
- **Code Particle System**: Destroyed bricks create rotating code character particles
- **Smart Grid Background**: Subtle grid pattern for better visual structure
- **Live Score Display**: Real-time score tracking with monospace font
- **Mobile Support**: Touch controls for mobile devices

## Data Flow

1. **Client Request**: User interactions trigger API calls through TanStack Query
2. **Server Processing**: Express routes handle requests with appropriate business logic
3. **Database Operations**: Drizzle ORM manages database interactions with type safety
4. **Response Delivery**: JSON responses with proper error handling and status codes
5. **Client Updates**: React Query manages cache invalidation and UI updates

## External Dependencies

### Core Technologies
- **Neon Database**: Serverless PostgreSQL for cloud deployment
- **Vite**: Development server and build tooling
- **Tailwind CSS**: Utility-first styling framework
- **Radix UI**: Accessible component primitives

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast JavaScript bundling for production
- **PostCSS**: CSS processing with Tailwind integration

### UI/UX Libraries
- **Lucide React**: Icon library for consistent iconography
- **Date-fns**: Date manipulation utilities
- **Class Variance Authority**: Component variant management

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations deploy schema changes

### Environment Configuration
- **Development**: Local development with Vite dev server and hot reloading
- **Production**: Compiled Express server serving static files
- **Database**: Environment-based DATABASE_URL configuration

### Performance Optimizations
- **Asset Caching**: Long-term caching headers for static assets
- **Code Splitting**: Vite automatically splits code for optimal loading
- **Font Loading**: Preconnect and optimized font loading strategies
- **SEO**: Comprehensive meta tags and Open Graph optimization

## Changelog

```
Changelog:
- July 01, 2025. Enhanced brick breaker game with code-themed design
- Reduced blur effects for better gameplay visibility
- Added programming keywords and symbols to bricks
- Implemented code character particle system on brick destruction
- Added keyboard controls (arrow keys/WASD) alongside mouse/touch
- Created subtle grid background pattern for better visual structure
- Fixed server startup error by creating proper TypeScript server structure
- July 01, 2025. Converted from React to vanilla JavaScript portfolio
- Added brick breaker game in hero background
- Implemented terminal preloader with typing animations
- Created responsive design with dark/light theme switching
- Integrated all content from blue1x GitHub repository
- Removed React dependencies and created pure vanilla implementation
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Project Type: Complete vanilla JavaScript implementation (no frameworks)
Game Feature: Brick breaker game integrated in landing page background
```