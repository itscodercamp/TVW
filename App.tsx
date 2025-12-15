import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Buy from './pages/Buy';
import CarDetails from './pages/CarDetails';
import Sell from './pages/Sell';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Insurance from './pages/Insurance';
import CarLoan from './pages/CarLoan';
import PDI from './pages/PDI';
import Careers from './pages/Careers';
import { Terms, Privacy, FAQ } from './pages/Legal';
import AIChatBot from './components/AIChatBot';
import { ToastProvider } from './context/ToastContext';

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/buy/:id" element={<CarDetails />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/car-loan" element={<CarLoan />} />
            <Route path="/pdi" element={<PDI />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Layout>
        <AIChatBot />
      </Router>
    </ToastProvider>
  );
};

export default App;