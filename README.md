# Atlys Demo

A social feed application built with React 18, TypeScript, Tailwind CSS 4, and Supabase authentication.

## Technologies

- **React**: v18.3.1
- **TypeScript**: v5.8.3
- **Tailwind CSS**: v4.1.10
- **Supabase**: v2.50.2
- **Vite**: v6.3.5

## Features

- User authentication (login/signup)
- Social feed with posts
- Create new posts with emoji support

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Login Credentials

Use the credentials specified in the [assignment document](https://goatlys.notion.site/Atlys-Frontend-Hiring-Task-20ed57ef738880f7a56ec4bdfab0c246).

## Design Implementation

The UI was implemented following the [Figma design](https://www.figma.com/design/9il6CZ3STFOcYutSsGNA2v/Front-end-hiring-assignment?node-id=0-1&p=f&t=PYXfud7ehEetpIQD-0) as closely as possible, including colors, fonts, and component structure.

## Project Structure

```
src/
├── assets/       # Static assets (images, icons)
├── components/   # Reusable UI components
├── context/      # React context (AuthContext)
├── hooks/        # Custom hooks
├── layouts/      # Layout components
├── pages/        # Page components
├── types/        # TypeScript type definitions
├── utils/        # Utility functions
└── provider/     # Provider components
```

## Notes

- The UI was manually implemented using Tailwind CSS classes
- Supabase integration and some helper functions were implemented with AI assistance
- Design is not responsive due to timeline constraints

## Repository & Deployment

- [GitHub Repository](https://github.com/devanshsaini/posts-demo)
- [Live Demo (Primary URL)](https://posts-demo-git-main-devansh95hotmailcoms-projects.vercel.app?_vercel_share=dMhrWdvVygezFmDla23giCH78BFuxzyZ)
- [Live Demo (Alternate URL)](https://posts-demo-chnz8nc56-devansh95hotmailcoms-projects.vercel.app/home) (If the primary URL doesn't work, try logging into a Vercel account first)
