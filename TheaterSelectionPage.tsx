import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { movies, theaters, shows } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { toast } from 'sonner@2.0.3';

export function TheaterSelectionPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedShow, setSelectedTheater } = useBooking();
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [requestedSeats, setRequestedSeats] = useState('');

  const movie = movies.find(m => m.id === id);
  const movieShows = shows.filter(s => s.movieId === id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Movie not found</h2>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const theaterGroups = theaters.map(theater => ({
    theater,
    shows: movieShows.filter(s => s.theaterId === theater.id)
  })).filter(group => group.shows.length > 0);

  const handleShowSelect = (showId: string) => {
    setSelectedShowId(showId);
    setRequestedSeats('');
  };

  const handleContinue = () => {
    if (!selectedShowId) {
      toast.error('Please select a showtime');
      return;
    }

    const numSeats = parseInt(requestedSeats);
    if (isNaN(numSeats) || numSeats < 1) {
      toast.error('Please enter a valid number of seats');
      return;
    }

    const show = shows.find(s => s.id === selectedShowId);
    if (!show) return;

    const availableSeats = show.totalSeats - show.bookedSeats.length;
    
    if (numSeats > availableSeats) {
      toast.error('Required number of seats are not available');
      return;
    }

    const theater = theaters.find(t => t.id === show.theaterId);
    setSelectedShow(show);
    setSelectedTheater(theater || null);
    navigate(`/movie/${id}/seats`);
  };

  const selectedShow = selectedShowId ? shows.find(s => s.id === selectedShowId) : null;

  if (movieShows.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <Button variant="ghost" onClick={() => navigate(`/movie/${id}`)} size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Movie Details
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              No shows available for this movie at the moment. Please check back later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(`/movie/${id}`)} className="mb-2" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Movie Details
          </Button>
          <h1>{movie.title}</h1>
          <p className="text-gray-600">Select Theater & Showtime</p>
        </div>
      </div>

      {/* Theater List */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {theaterGroups.map(({ theater, shows: theaterShows }) => (
            <Card key={theater.id} className="p-6">
              <div className="mb-4">
                <h2 className="mb-1">{theater.name}</h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{theater.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {theaterShows.map((show) => {
                  const availableSeats = show.totalSeats - show.bookedSeats.length;
                  const isFullyBooked = availableSeats === 0;
                  const isSelected = selectedShowId === show.id;

                  return (
                    <Button
                      key={show.id}
                      variant={isSelected ? "default" : "outline"}
                      disabled={isFullyBooked}
                      onClick={() => handleShowSelect(show.id)}
                      className="flex flex-col h-auto py-3"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="w-3 h-3" />
                        <span>{show.time}</span>
                      </div>
                      <span className="text-xs">₹{show.pricePerSeat}</span>
                      {isFullyBooked ? (
                        <span className="text-xs text-red-500 mt-1">Housefull</span>
                      ) : (
                        <span className="text-xs text-green-600 mt-1">
                          {availableSeats} seats
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Seat Count Selection */}
        {selectedShow && (
          <div className="max-w-4xl mx-auto mt-6">
            <Card className="p-6">
              <h2 className="mb-4">Enter Number of Seats</h2>
              <div className="grid gap-4 mb-4">
                <div>
                  <Label htmlFor="seats">Number of Seats</Label>
                  <Input
                    id="seats"
                    type="number"
                    min="1"
                    max={selectedShow.totalSeats - selectedShow.bookedSeats.length}
                    value={requestedSeats}
                    onChange={(e) => setRequestedSeats(e.target.value)}
                    placeholder="Enter number of seats"
                  />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Price per seat:</span>
                    <span>₹{selectedShow.pricePerSeat}</span>
                  </div>
                  {requestedSeats && !isNaN(parseInt(requestedSeats)) && (
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span>₹{selectedShow.pricePerSeat * parseInt(requestedSeats)}</span>
                    </div>
                  )}
                </div>
              </div>
              <Button onClick={handleContinue} className="w-full" size="lg">
                Continue to Seat Selection
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
