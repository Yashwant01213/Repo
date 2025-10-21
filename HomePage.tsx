import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { MovieCard } from '../components/MovieCard';
import { movies as allMovies } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';

export function HomePage() {
  const navigate = useNavigate();
  const { setSelectedMovie } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const filteredMovies = useMemo(() => {
    let filtered = allMovies;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(movie =>
        movie.genre.some(g => selectedGenres.includes(g))
      );
    }

    // Language filter
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter(movie =>
        selectedLanguages.includes(movie.language)
      );
    }

    // Rating filter
    if (selectedRating !== null) {
      filtered = filtered.filter(movie => movie.rating >= selectedRating);
    }

    // Sort by relevance (rating)
    return filtered.sort((a, b) => b.rating - a.rating);
  }, [searchQuery, selectedGenres, selectedLanguages, selectedRating]);

  const handleMovieClick = (movie: typeof allMovies[0]) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.id}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSelectedRating(null);
  };

  const hasActiveFilters = searchQuery || selectedGenres.length > 0 || selectedLanguages.length > 0 || selectedRating !== null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header>
        <div className="mt-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </Header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Movies Grid */}
        <main className="w-full">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* Filter Toggle Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel
                      selectedGenres={selectedGenres}
                      selectedLanguages={selectedLanguages}
                      selectedRating={selectedRating}
                      onGenreChange={handleGenreChange}
                      onLanguageChange={handleLanguageChange}
                      onRatingChange={setSelectedRating}
                      movies={allMovies}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <div>
                <h2 className="mb-1">Now Showing</h2>
                <p className="text-gray-600">
                  {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} found
                </p>
              </div>
            </div>

            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {filteredMovies.length === 0 ? (
            <Alert>
              <AlertDescription>
                No movies found matching your search criteria. Please try different filters or search terms.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
