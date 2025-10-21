import React, { useState } from 'react';
import { Star, Play } from 'lucide-react';
import { Movie } from '../types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-2xl group relative"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        {movie.trailerUrl && isHovered ? (
          <div className="absolute inset-0 z-10">
            <iframe
              src={`${movie.trailerUrl}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ pointerEvents: 'none' }}
            />
          </div>
        ) : (
          <>
            <ImageWithFallback
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            {movie.trailerUrl && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-1">{movie.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{movie.rating.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {movie.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="secondary" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-gray-600">{movie.language}</p>
      </div>
    </Card>
  );
}
