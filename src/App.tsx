import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import ReactGA from 'react-ga4';
import ScrollDashboard from './components/ScrollDashboard';
import ScrollPrayerPortal from './components/ScrollPrayerPortal';
import BibleCharacterRoom from './components/BibleCharacterRoom';
import HolyLandScene from './components/HolyLandScene';
import ScrollComposer from './components/ScrollComposer';
import ScrollSeal from './components/ScrollSeal';
import MobileControlApp from './components/MobileControlApp';
import GoLiveWithHeaven from './components/GoLiveWithHeaven';
import SacredNavigation from './components/SacredNavigation';

const queryClient = new QueryClient();

// Initialize Google Analytics
if (process.env.REACT_APP_ENABLE_ANALYTICS === 'true' && process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <SacredNavigation />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<ScrollDashboard />} />
              <Route path="/prayer-portal" element={<ScrollPrayerPortal />} />
              <Route path="/bible-characters" element={<BibleCharacterRoom />} />
              <Route path="/holy-land" element={<HolyLandScene />} />
              <Route path="/composer" element={<ScrollComposer />} />
              <Route path="/seal" element={<ScrollSeal />} />
              <Route path="/mobile-control" element={<MobileControlApp />} />
              <Route path="/go-live" element={<GoLiveWithHeaven />} />
            </Routes>
          </main>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #f2751f',
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App; 