import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Loader2,
  MousePointer2,
  Clapperboard
} from 'lucide-react';

import { SearchType, TMDBMovie } from './types';
import { getMovieRecommendations } from './services/groqService';
import { fetchMovieMetadata } from './services/tmdbService';
import { AboutModal } from './components/AboutModal';

import { MovieCard } from './components/MovieCard';
import { TrailerModal } from './components/TrailerModal';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>(SearchType.VIBE);
  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleSearch = async (
    e?: React.FormEvent,
    overrideType?: SearchType
  ) => {
    if (e) e.preventDefault();

    const currentType = overrideType || searchType;
    if (currentType !== SearchType.SURPRISE && !query.trim()) return;

    setIsLoading(true);
    setResults([]);

    try {
      // 1. Get titles from Gemini (UNCHANGED)
      const recommendations = await getMovieRecommendations(
        query,
        currentType
      );

      // 2. Fetch TMDB metadata (UNCHANGED)
      const moviesWithMeta = await Promise.all(
        recommendations.map(async (rec): Promise<TMDBMovie | null> => {
          const meta = await fetchMovieMetadata(rec.title);
          if (!meta) return null;

          return {
            ...meta,
            matchScore: rec.matchScore,
            reason: rec.reason
          };
        })
      );

      setResults(moviesWithMeta.filter((m): m is TMDBMovie => m !== null));
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSurprise = () => {
    setSearchType(SearchType.SURPRISE);
    handleSearch(undefined, SearchType.SURPRISE);
  };

  return (
    <div className="min-h-screen font-sans bg-white text-black">
      {/* ================= NAV ================= */}
      <nav className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center">
              <Clapperboard size={22} />
            </div>
            <h1 className="text-xl font-serif font-bold">
              Cine<span className="text-gray-500">Suggest</span>
            </h1>
          </div>

          <div className="flex gap-3 md:gap-6 text-sm text-gray-500">
            <button 
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-black cursor-pointer transition-colors"
            >
              About
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <main className="max-w-6xl mx-auto px-6 pt-24">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">
            Cinema by <span className="italic">Feeling</span>
          </h2>

          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
            Discover films through atmosphere, emotion, and cinematic tone —
            not algorithms.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            className="mt-12 max-w-3xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-2 flex flex-col md:flex-row gap-2 shadow-sm"
          >
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search size={18} className="text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  searchType === SearchType.VIBE
                    ? 'e.g. Quiet rainy nights, neon cities'
                    : 'e.g. Blade Runner 2049'
                }
                className="w-full bg-transparent outline-none text-sm py-3"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setSearchType(
                    searchType === SearchType.VIBE
                      ? SearchType.SIMILAR
                      : SearchType.VIBE
                  )
                }
                className="px-4 py-3 text-xs font-semibold border rounded-xl hover:bg-gray-100"
              >
                {searchType === SearchType.VIBE ? 'BY VIBE' : 'SIMILAR'}
              </button>

              <button
                disabled={isLoading}
                className="px-6 py-3 bg-black text-white rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Sparkles size={16} />
                )}
                GET PICKS
              </button>
            </div>
          </form>

          <button
            onClick={handleSurprise}
            disabled={isLoading}
            className="mt-6 text-xs text-gray-500 hover:text-black flex items-center gap-2 mx-auto"
          >
            <MousePointer2 size={14} />
            SURPRISE ME
          </button>
        </div>

        {/* ================= RESULTS ================= */}
        <section>
          {isLoading && (
            <div className="py-24 flex flex-col items-center">
              <Loader2 size={42} className="animate-spin text-gray-400 mb-4" />
              <p className="text-gray-400 italic">
                Browsing the cinema vault…
              </p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {results.map((movie, idx) => (
                <MovieCard
                  key={`${movie.id}-${idx}`}
                  movie={movie}
                  onWatchTrailer={setActiveTrailer}
                />
              ))}
            </div>
          )}

          {!isLoading && results.length === 0 && !query && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-30">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[2/3] border-2 border-dashed rounded-xl"
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="mt-40 border-t border-gray-200 py-12 text-center text-sm text-gray-400">
        © 2026 CineSuggest | All Rights Reserved
      </footer>

      {/* ================= MODAL ================= */}
      <TrailerModal
        trailerKey={activeTrailer}
        onClose={() => setActiveTrailer(null)}
      />
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};

export default App;
