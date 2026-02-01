import React, { useState } from 'react';
import { Play, Star } from 'lucide-react';
import { TMDBMovie } from '../types';

interface MovieCardProps {
  movie: TMDBMovie;
  onWatchTrailer: (key: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onWatchTrailer }) => {
  const [loaded, setLoaded] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=500';

  return (
    <article className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition">
      <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex justify-between gap-3">
          <h3 className="font-medium leading-tight line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            {movie.vote_average?.toFixed(1)}
          </div>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 min-h-[2.5rem]">
          {movie.reason || movie.overview}
        </p>

        <div className="flex items-center gap-2 pt-2">
          {movie.trailerKey && (
            <button
              onClick={() => onWatchTrailer(movie.trailerKey)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-black text-white text-xs py-2 rounded-lg hover:bg-gray-800 transition"
            >
              <Play size={12} />
              Trailer
            </button>
          )}
          <span className="text-xs font-medium border border-gray-300 rounded-lg px-3 py-2">
            {movie.matchScore}%
          </span>
        </div>
      </div>
    </article>
  );
};
