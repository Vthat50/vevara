# Vevara - AI-Powered Patient Support Platform

A comprehensive Voice AI demo platform for medication adherence and patient engagement, matching the design aesthetic of Nurodot.

## Features

### Core Capabilities
- **Conversational AI Engine**: Natural language understanding with <1 second response time and 99% medical accuracy
- **Outbound Call Automation**: Automated welcome calls, refill reminders, and side effect check-ins
- **Inbound Call Handling**: 24/7 availability with intelligent routing and voice authentication
- **Medication Education Q&A**: Interactive guidance for medication administration
- **Copay Card Enrollment**: Real-time eligibility checking and automated enrollment
- **Side Effect Monitoring**: Structured check-ins with severity assessment
- **Human Escalation**: Seamless warm transfer to live agents

### Demo Components

**Public Pages:**
1. **Landing Page** (http://localhost:3000): Marketing site with hero, features, and CTA
2. **Login Page** (http://localhost:3000/login): Secure authentication (accepts any credentials for demo)

**Dashboard Application** (http://localhost:3000/dashboard):
1. **Overview Tab**: Welcome dashboard with key metrics and quick actions
2. **Live Calls Tab**: Real-time call monitoring with live transcripts
   - Active call list with status indicators
   - Live call transcripts and conversation flow
   - Call controls (mute, listen, escalate, end call)
   - Sentiment analysis display
   - Real-time duration tracking
3. **Patients Tab**: Complete patient management system
   - Searchable patient directory
   - Risk level filtering (low/medium/high)
   - Adherence tracking with visual progress bars
   - Patient detail cards with contact actions
   - Call, email, and SMS initiation
4. **Analytics Tab**: Comprehensive data visualization
   - Adherence trend charts
   - Call volume analytics
   - Call type distribution (pie chart)
   - Side effect reporting with severity levels
   - Cost savings calculator
   - Performance metrics dashboard
5. **Campaigns Tab**: Campaign management (placeholder)
6. **Settings Tab**: System configuration (placeholder)

## Tech Stack

- **Framework**: Next.js 14.2.5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.x
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## Design System

Based on Nurodot's design language:
- **Primary Color**: #2563EB (Blue)
- **Success Color**: #10B981 (Green)
- **Typography**: Inter font family
- **Components**: Glassmorphic navigation, smooth animations, rounded corners
- **Layout**: Max-width 1200px containers, responsive breakpoints

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Flow

1. **Landing Page**: Visit http://localhost:3000 to see the marketing site
2. **Login**: Click the "Login" button in the navigation (accepts any email/password)
3. **Dashboard**: After login, you'll be redirected to the full dashboard application
4. **Explore Tabs**: Navigate between Overview, Live Calls, Patients, and Analytics tabs

**Demo Credentials**: Enter any email and password to login (authentication is mocked for demo purposes)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
vevara/
├── app/
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Landing page
│   ├── login/
│   │   └── page.tsx             # Login page
│   └── dashboard/
│       └── page.tsx             # Dashboard main page
├── components/
│   ├── Navigation.tsx           # Landing page navigation
│   ├── Hero.tsx                 # Hero section
│   ├── Features.tsx             # Features showcase
│   ├── Dashboard.tsx            # Dashboard preview (landing)
│   ├── Analytics.tsx            # Analytics preview (landing)
│   ├── CTA.tsx                  # Call-to-action section
│   ├── Footer.tsx               # Site footer
│   ├── Button.tsx               # Reusable button component
│   ├── Card.tsx                 # Reusable card component
│   ├── FeatureCard.tsx          # Feature display card
│   └── dashboard/
│       ├── DashboardLayout.tsx  # Dashboard layout with sidebar
│       ├── OverviewTab.tsx      # Overview dashboard tab
│       ├── LiveCallsTab.tsx     # Live calls management
│       ├── PatientsTab.tsx      # Patient management
│       └── AnalyticsTab.tsx     # Analytics and reporting
└── tailwind.config.js           # Tailwind configuration
```

## PRD Implementation

This demo implements the following requirements from the PRD:

### Functional Requirements
- ✅ REQ-001: Conversational AI Engine capabilities
- ✅ REQ-002: Outbound Call Automation features
- ✅ REQ-003: Inbound Call Handling
- ✅ REQ-004: Medication Education Q&A
- ✅ REQ-005: Copay Card Enrollment
- ✅ REQ-006: Side Effect Monitoring
- ✅ REQ-007: Human Escalation
- ✅ REQ-014: Real-Time Dashboard
- ✅ REQ-015: Adherence Reporting

### Design Elements
- HIPAA-compliant messaging
- 99% accuracy, <1s response time, 24/7 availability
- Real-time monitoring interface
- Patient management with adherence scores
- Analytics and cost savings calculator
- Multi-language support indicators
- FDA PDURS compliance badges

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    DEFAULT: '#2563EB',
    light: '#3B82F6',
    dark: '#1E40AF',
  },
  // ... more colors
}
```

### Content
Update component content in the `/components` directory to match your specific use case.

## License

ISC

## Contact

For questions or support, contact hello@vevara.com
