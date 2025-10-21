import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Globe, Shield } from 'lucide-react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { movies } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { toast } from 'sonner@2.0.3';

export function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedMovie } = useBooking();
  const [userRating, setUserRating] = useState('');

  const movie = movies.find(m => m.id === id);

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

  const averageRating = movie.userRatings.length > 0
    ? movie.userRatings.reduce((a, b) => a + b, 0) / movie.userRatings.length
    : movie.rating;

  const handleBooking = () => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}/theaters`);
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rating = parseFloat(userRating);
    
    if (isNaN(rating) || rating < 1 || rating > 5) {
      toast.error('Please enter a rating between 1 and 5');
      return;
    }

    toast.success('Thank you for rating this movie!');
    setUserRating('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Movies
          </Button>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-[400px,1fr] gap-0">
            {/* Movie Poster */}
            <div className="aspect-[2/3] md:aspect-auto relative overflow-hidden">
              <ImageWithFallback
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Movie Info */}
            <div className="p-8 bg-gradient-to-br from-white to-gray-50">
              <h1 className="mb-4">{movie.title}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g) => (
                  <Badge key={g} className="bg-red-100 text-red-700 hover:bg-red-200">
                    {g}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p>{averageRating.toFixed(1)}/5.0</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Release Date</p>
                    <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Language</p>
                    <p>{movie.language}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Censor Rating</p>
                    <p>{movie.censorRating}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{movie.description}</p>
              </div>

              {/* Rating Form */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="mb-3">Rate this Movie</h3>
                <form onSubmit={handleRatingSubmit} className="flex gap-3">
                  <div className="flex-1">
                    <Label htmlFor="rating" className="sr-only">Your Rating</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      placeholder="Enter rating (1-5)"
                      value={userRating}
                      onChange={(e) => setUserRating(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Submit Rating</Button>
                </form>
                <p className="text-sm text-gray-600 mt-2">
                  Based on {movie.userRatings.length} user ratings
                </p>
              </div>

              <Button 
                onClick={handleBooking} 
                size="lg" 
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                Book My Show
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
