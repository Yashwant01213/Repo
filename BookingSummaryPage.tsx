import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Armchair } from 'lucide-react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useBooking } from '../context/BookingContext';
import { movies } from '../data/mockData';

export function BookingSummaryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedMovie, selectedShow, selectedTheater, selectedSeats } = useBooking();

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

  const getSeatPrice = (seatId: string) => {
    const row = seatId[0];
    if (['A', 'B'].includes(row)) return selectedShow.pricePerSeat * 1.5;
    return selectedShow.pricePerSeat;
  };

  const seatsTotal = selectedSeats.reduce((total, seatId) => {
    return total + getSeatPrice(seatId);
  }, 0);

  const convenienceFee = selectedSeats.length * 20;
  const gst = (seatsTotal + convenienceFee) * 0.18;
  const totalAmount = seatsTotal + convenienceFee + gst;

  const handleProceedToPayment = () => {
    navigate(`/movie/${id}/payment`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => navigate(`/movie/${id}/seats`)}
            className="mb-2"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Seat Selection
          </Button>
          <h1>Booking Summary</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 mb-6">
            <h2 className="mb-4">Movie Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Movie</p>
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
                    <span>Date & Time</span>
                  </div>
                  <p>{selectedShow.date}</p>
                  <p className="text-sm text-gray-600">{selectedShow.time}</p>
                </div>
              </div>
              <Separator />
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Armchair className="w-4 h-4" />
                  <span>Selected Seats</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map(seatId => (
                    <div
                      key={seatId}
                      className="px-3 py-1 bg-yellow-100 rounded-full text-sm"
                    >
                      {seatId}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="mb-4">Pricing Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Seats ({selectedSeats.length} × ₹{selectedShow.pricePerSeat})</span>
                <span>₹{seatsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Convenience Fee ({selectedSeats.length} × ₹20)</span>
                <span>₹{convenienceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>GST (18%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Button onClick={handleProceedToPayment} className="w-full" size="lg">
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
