# ✈️ Flight Search Engine

A modern, responsive flight search engine built with React, TypeScript, and the Amadeus API.

![Flight Search Engine](screenshot.png)

## 🎯 Assessment Highlights

- **Real-time Flight Search** with 229+ results
- **Live Price Graph** using Recharts
- **Complex Filtering** (Price, Stops, Airlines, Times, Duration)
- **Responsive Design** for mobile and desktop
- **Type-Safe** with TypeScript
- **Production-Ready** code architecture

## 🚀 Live Demo

**[Your Vercel URL]**

## 🎥 Video Walkthrough

**[Your Loom URL]**

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **State Management:** Zustand
- **Data Fetching:** React Query (TanStack Query)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **API:** Amadeus Self-Service API
- **Build Tool:** Vite
- **Deployment:** Vercel

## ✨ Features

### Search
- Origin/Destination autocomplete
- Date selection with validation
- Passenger configuration
- Cabin class selection
- Trip type (Round Trip/One Way)

### Results
- 229 real flights from Amadeus API
- Detailed flight information
- Layover details
- Terminal information
- Aircraft types

### Filtering
- **Price Range** slider
- **Stops** (Direct, 1 Stop, 2+ Stops)
- **Airlines** multi-select
- **Departure/Arrival Times** by time of day
- **Max Duration** slider
- Active filter chips
- Clear all filters

### Price Graph
- Visual price trends
- Updates in real-time with filters
- Shows lowest and average prices

### UI/UX
- Dark theme
- Smooth animations
- Loading states
- Empty states
- Error handling
- Responsive design

## 📦 Installation

\`\`\`bash
# Clone repository
git clone [your-repo-url]

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your Amadeus API credentials
VITE_AMADEUS_API_KEY=your_key
VITE_AMADEUS_API_SECRET=your_secret
VITE_AMADEUS_API_URL=https://test.api.amadeus.com
\`\`\`

## 🚀 Development

\`\`\`bash
npm run dev
\`\`\`

## 🏗️ Build

\`\`\`bash
npm run build
npm run preview
\`\`\`

## 🧪 Testing

\`\`\`bash
npm run test
npm run type-check
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── components/       # Reusable UI components
├── features/         # Feature-specific logic
├── hooks/           # Custom React hooks
├── lib/             # Third-party integrations
├── pages/           # Page components
├── store/           # Zustand state management
├── styles/          # Global styles
├── types/           # TypeScript definitions
└── utils/           # Utility functions
\`\`\`

## 🎨 Design Decisions

- **Dark Theme:** Modern, reduces eye strain
- **Zustand:** Lightweight state management
- **React Query:** Efficient data fetching with caching
- **TypeScript:** Type safety and better DX
- **Tailwind:** Rapid UI development
- **Component Architecture:** Modular, reusable components

## 📊 Performance

- Code splitting for optimal bundle size
- Lazy loading for routes
- Memoization for expensive computations
- Debounced search inputs
- Optimized re-renders

## 🔒 Security

- Environment variables for API keys
- Input validation
- XSS protection
- CORS handling

## 📝 License

MIT

## 👤 Author

[Your Name]
- GitHub: [@yourusername]
- LinkedIn: [Your LinkedIn]
