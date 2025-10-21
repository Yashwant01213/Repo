import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { genres, languages, ratings } from '../data/mockData';
import { Movie } from '../types';

interface FilterPanelProps {
  selectedGenres: string[];
  selectedLanguages: string[];
  selectedRating: number | null;
  onGenreChange: (genre: string) => void;
  onLanguageChange: (language: string) => void;
  onRatingChange: (rating: number | null) => void;
  movies: Movie[];
}

export function FilterPanel({
  selectedGenres,
  selectedLanguages,
  selectedRating,
  onGenreChange,
  onLanguageChange,
  onRatingChange,
  movies
}: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = React.useState({
    rating: true,
    genre: true,
    language: true
  });

  const toggleSection = (section: 'rating' | 'genre' | 'language') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getGenreCount = (genre: string) => {
    return movies.filter(m => m.genre.includes(genre)).length;
  };

  const getLanguageCount = (language: string) => {
    return movies.filter(m => m.language === language).length;
  };

  const getRatingCount = (rating: number) => {
    return movies.filter(m => m.rating >= rating).length;
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-red-600">Filter Options</h3>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3>Rating</h3>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.rating && (
          <div className="space-y-3">
            {ratings.map((rating) => (
              <div key={rating.value} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating.value}`}
                    checked={selectedRating === rating.value}
                    onCheckedChange={() => {
                      onRatingChange(selectedRating === rating.value ? null : rating.value);
                    }}
                  />
                  <Label htmlFor={`rating-${rating.value}`} className="cursor-pointer">
                    {rating.label}
                  </Label>
                </div>
                <span className="text-sm text-gray-500">({getRatingCount(rating.value)})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Genre Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('genre')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3>Genre</h3>
          {expandedSections.genre ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.genre && (
          <div className="space-y-3">
            {genres.map((genre) => (
              <div key={genre} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`genre-${genre}`}
                    checked={selectedGenres.includes(genre)}
                    onCheckedChange={() => onGenreChange(genre)}
                  />
                  <Label htmlFor={`genre-${genre}`} className="cursor-pointer">
                    {genre}
                  </Label>
                </div>
                <span className="text-sm text-gray-500">({getGenreCount(genre)})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Language Filter */}
      <div>
        <button
          onClick={() => toggleSection('language')}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3>Language</h3>
          {expandedSections.language ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.language && (
          <div className="space-y-3">
            {languages.map((language) => (
              <div key={language} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language}`}
                    checked={selectedLanguages.includes(language)}
                    onCheckedChange={() => onLanguageChange(language)}
                  />
                  <Label htmlFor={`language-${language}`} className="cursor-pointer">
                    {language}
                  </Label>
                </div>
                <span className="text-sm text-gray-500">({getLanguageCount(language)})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
