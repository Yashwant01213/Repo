import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Calendar, MapPin, Clock, Armchair } from 'lucide-react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useBooking } from '../context/BookingContext';
import { movies } from '../data/mockData';

export function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedMovie, selectedShow, selectedTheater, selectedSeats, resetBooking } = useBooking();

  const movie = selectedMovie || movies.find(m => m.id === id);

  if (!movie || !selectedShow || !selectedTheater || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Invalid booking session</h2>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const bookingId = `BK${Date.now().toString().slice(-8)}`;

  const handleGoHome = () => {
    resetBooking();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">
              Your tickets have been booked successfully
            </p>
          </div>

          {/* Booking Details */}
          <Card className="p-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800 mb-1">Booking ID</p>
              <p className="text-green-900">{bookingId}</p>
            </div>

            <h2 className="mb-4">Booking Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Movie</p>
                <p>{movie.title}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Theater</span>
                  </div>
                  <p>{selectedTheater.name}</p>
                  <p className="text-sm text-gray-600">{selectedTheater.location}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Date</span>
                  </div>
                  <p>{selectedShow.date}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span>Show Time</span>
                </div>
                <p>{selectedShow.time}</p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Armchair className="w-4 h-4" />
                  <span>Your Seats</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(seatId => (
                    <div
                      key={seatId}
                      className="px-3 py-1 bg-green-100 rounded-full text-sm"
                    >
                      {seatId}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Important Information */}
          <Card className="p-6 mb-6">
            <h3 className="mb-3">Important Information</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>Please arrive at the theater at least 15 minutes before the show time.</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Show your Booking ID at the counter to collect your tickets.</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Outside food and beverages are not allowed inside the theater.</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Please maintain silence during the movie screening.</span>
              </li>
            </ul>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={handleGoHome} className="flex-1" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
