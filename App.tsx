import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { TheaterSelectionPage } from './pages/TheaterSelectionPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { BookingSummaryPage } from './pages/BookingSummaryPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/movie/:id/theaters" element={<TheaterSelectionPage />} />
            <Route path="/movie/:id/seats" element={<SeatSelectionPage />} />
            <Route path="/movie/:id/booking" element={<BookingSummaryPage />} />
            <Route path="/movie/:id/payment" element={<PaymentPage />} />
            <Route path="/movie/:id/confirmation" element={<ConfirmationPage />} />
          </Routes>
          <Toaster />
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}
