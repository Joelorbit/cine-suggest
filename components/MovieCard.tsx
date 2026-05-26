import React, { useState } from 'react';
import { Play, Star, Calendar } from 'lucide-react';
import { TMDBMovie } from '../types';

interface MovieCardProps {
  movie: TMDBMovie;
  onWatchTrailer: (key: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onWatchTrailer }) => {
  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=500';

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const voteCount = movie.vote_count ? `(${(movie.vote_count / 1000).toFixed(1)}k votes)` : '';

  return (
    <article className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5 space-y-3">
        {/* Title & Year */}
        <div className="space-y-1">
          <h3 className="font-semibold text-base leading-tight line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            {releaseYear}
          </div>
        </div>

        {/* Ratings Section */}
        <div className="flex items-center gap-3 py-2 px-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-semibold text-sm">{movie.vote_average?.toFixed(1)}</span>
            <span className="text-xs text-gray-500">/10</span>
          </div>
          <span className="text-xs text-gray-600">{voteCount}</span>
          {movie.matchScore && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-medium text-green-600">Match: {movie.matchScore}%</span>
            </>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className={`text-sm text-gray-700 leading-relaxed ${
            expanded ? '' : 'line-clamp-3'
          }`}>
            {movie.reason || movie.overview}
          </p>
          {(movie.reason || movie.overview) && (movie.reason?.length > 150 || movie.overview?.length > 150) && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium transition"
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Watch Trailer Button */}
        {movie.trailerKey && (
          <button
            onClick={() => onWatchTrailer(movie.trailerKey)}
            className="w-full flex items-center justify-center gap-2 bg-black text-white text-sm font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Play size={16} />
            Watch Trailer
          </button>
        )}
      </div>
    </article>
  );
};
