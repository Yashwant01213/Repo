import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useBooking } from '../context/BookingContext';
import { movies } from '../data/mockData';
import { toast } from 'sonner@2.0.3';

export function SeatSelectionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedShow, selectedTheater, selectedSeats, setSelectedSeats } = useBooking();
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  const movie = movies.find(m => m.id === id);

  if (!movie || !selectedShow || !selectedTheater) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Invalid booking session</h2>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  // Generate seat layout (10 rows x 10 columns)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 10;

  const getSeatId = (row: string, number: number) => `${row}${number}`;

  const isSeatBooked = (seatId: string) => selectedShow.bookedSeats.includes(seatId);
  const isSeatSelected = (seatId: string) => selectedSeats.includes(seatId);

  const getSeatColor = (seatId: string) => {
    if (isSeatBooked(seatId)) return 'bg-red-500 cursor-not-allowed';
    if (isSeatSelected(seatId)) return 'bg-yellow-400 hover:bg-yellow-500';
    return 'bg-green-500 hover:bg-green-600';
  };

  const getSeatType = (row: string) => {
    if (['A', 'B'].includes(row)) return 'Premium';
    return 'Regular';
  };

  const getSeatPrice = (row: string) => {
    if (['A', 'B'].includes(row)) return selectedShow.pricePerSeat * 1.5;
    return selectedShow.pricePerSeat;
  };

  const handleSeatClick = (seatId: string) => {
    if (isSeatBooked(seatId)) {
      toast.error('This seat is already booked');
      return;
    }

    if (isSeatSelected(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const row = seatId[0];
      return total + getSeatPrice(row);
    }, 0);
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    navigate(`/movie/${id}/booking`);
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
            onClick={() => navigate(`/movie/${id}/theaters`)}
            className="mb-2"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Theaters
          </Button>
          <h1>{movie.title}</h1>
          <p className="text-gray-600">
            {selectedTheater.name} - {selectedShow.time}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Legend */}
          <Card className="p-4 mb-6">
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-400 rounded"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500 rounded"></div>
                <span className="text-sm">Booked</span>
              </div>
            </div>
          </Card>

          {/* Screen */}
          <div className="mb-8">
            <div className="bg-gray-300 h-2 rounded-t-full mb-2"></div>
            <p className="text-center text-gray-600 text-sm">Screen</p>
          </div>

          {/* Seat Layout */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <div className="space-y-3">
              {rows.map((row) => (
                <div key={row} className="flex items-center gap-2">
                  <div className="w-8 text-center font-medium">{row}</div>
                  <div className="flex gap-2 flex-1 justify-center">
                    {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((number) => {
                      const seatId = getSeatId(row, number);
                      const isBooked = isSeatBooked(seatId);
                      const isSelected = isSeatSelected(seatId);

                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          onMouseEnter={() => setHoveredSeat(seatId)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          disabled={isBooked}
                          className={`
                            w-8 h-8 rounded-t-lg transition-all
                            ${getSeatColor(seatId)}
                            ${isBooked ? 'opacity-50' : 'cursor-pointer'}
                            relative
                          `}
                          title={`Seat ${seatId}`}
                        >
                          {hoveredSeat === seatId && !isBooked && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                              {getSeatType(row)} - ₹{getSeatPrice(row)}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="w-8"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="mb-2">Selected Seats</h2>
              {selectedSeats.length > 0 ? (
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
              ) : (
                <p className="text-gray-500">No seats selected</p>
              )}
            </div>

            {selectedSeats.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Number of Seats:</span>
                    <span>{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
              className="w-full"
              size="lg"
            >
              Continue to Payment
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
