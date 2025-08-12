# Overview

This is a Productivity Tips Pro application - a full-stack web application that displays and manages productivity tips. The app allows users to browse tips by category, search for specific tips, favorite tips, and add new tips. It features a modern glassmorphism design with a React frontend and Express.js backend, using in-memory storage for development. The application now contains over 50 comprehensive productivity tips across 8 categories including Leadership, Technology, Time Management, Planning, Focus & Concentration, Efficiency, Wellness, and Organization.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript running on Vite for fast development and building
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom glassmorphism design system and CSS variables for theming
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation via Hookform/resolvers

## Backend Architecture
- **Framework**: Express.js with TypeScript for RESTful API endpoints
- **Development**: Hot reloading with Vite integration in development mode
- **Storage Layer**: Abstract storage interface (`IStorage`) with in-memory implementation for development
- **API Design**: RESTful endpoints for tips, categories, favorites, and user stats with proper error handling
- **Request Logging**: Middleware for API request/response logging with timing

## Data Storage
- **Database**: PostgreSQL configured via Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon Database serverless PostgreSQL connection
- **Development Storage**: In-memory storage implementation with full feature parity for development

## Database Schema
- **Tips**: Core entity with text, category, views, favorites count, rating, and timestamps
- **Categories**: Category management with tip counts
- **Favorites**: User favorites linking to tips
- **User Stats**: Daily tip counts, streaks, and activity tracking
- **UUID Primary Keys**: Generated server-side for all entities

## External Dependencies
- **Database**: Neon Database (PostgreSQL) for production data storage
- **Fonts**: Google Fonts (Inter, DM Sans, Fira Code, Geist Mono, Architects Daughter)
- **Images**: Unsplash for workspace inspiration gallery
- **Development**: Replit-specific tooling including cartographer and runtime error overlay
- **Session Management**: PostgreSQL session store via connect-pg-simple
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date manipulation and formatting

## Development Features
- **Hot Reload**: Full-stack development with Vite HMR
- **TypeScript**: Strict typing across client, server, and shared code
- **Path Aliases**: Configured for clean imports (@/, @shared/, @assets/)
- **Code Quality**: ESLint-ready configuration with proper module resolution
- **Build Process**: Separate client (Vite) and server (esbuild) build pipelines