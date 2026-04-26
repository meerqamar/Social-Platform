# coWorkly

Welcome to **coWorkly** (formerly NOVA), a modern, clean, and minimal platform designed to connect creators and freelancers with clients through professional gig listings.

## 🚀 Features

### Core Architecture & UI
- **Clean & Minimal UI Design**: A sophisticated "Architectural Quietude" aesthetic featuring ample whitespace, clean typography (Inter font), and subtle tonal depth. No heavy drop-shadows or cluttered borders.
- **Responsive Layouts**: Fully responsive grid layouts ensuring a seamless experience across desktop, tablet, and mobile devices.
- **Global Theme & Navigation**: Minimalist top navigation bar and unified CSS variables driving consistent design tokens across the app.

### Gig Marketplace
- **Gig Listings Page**: A dedicated marketplace page featuring a sleek grid of gigs.
- **Search & Filtering**: Search functionality to easily find specific gigs from hundreds of listings.
- **Optimized Components**: 
  - `GigCard`: A highly optimized, compound React component pattern (`GigCard.Image`, `GigCard.Body`, `GigCard.Footer`) allowing maximum flexibility without unnecessary re-renders. 
  - Performance improvements implemented utilizing `React.memo` and `useCallback` to prevent wasteful state updates.

### Authentication
- **User Onboarding**: Minimalist, clean `RegisterPage` and `LoginPage` flows allowing new members to join the coWorkly community.
- **Session Management**: Lightweight authentication context to manage login states, user avatars, and personalized dashboards.

### React Hooks Lab
The application includes a collection of advanced React hook implementations demonstrating state management and side-effect handling:
- **Countdown Timer**: A robust timer component featuring a fix for the classic "Stale Closure" bug using functional state updates.
- **Character Counter**: Real-time text input tracking.
- **Typing Indicator**: Debounced user activity tracker.
- **Order Tracker**: Demonstrating complex state transitions over time.

## 🛠️ Technology Stack
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Pure CSS with Custom Properties (Vanilla CSS) for maximum performance and explicit control.
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM

## 📦 Getting Started

First, install the dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
