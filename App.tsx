import React, { useEffect, useState } from 'react';
import {
  Search,
  Sparkles,
  Loader2,
  MousePointer2,
  Plus,
  Wand2,
  Waves,
  Shuffle,
  Sun,
  Moon
} from 'lucide-react';

import { SearchType, TMDBMovie } from './types';
import { getMovieRecommendations } from './services/groqService';
import { fetchMovieMetadata } from './services/tmdbService';
import { AboutModal } from './components/AboutModal';

import { MovieCard } from './components/MovieCard';
import { TrailerModal } from './components/TrailerModal';

const SURPRISE_VIBES = [
  'Rain-slicked neon streets with atmospheric synth score',
  'Quiet existential melancholy on a remote island',
  'Mind-bending 70s psychological paranoia',
  'Cozy autumn dusk romance with soft jazz acoustic',
  'Fast-paced Tokyo cyberpunk thrillers',
  'Deep space isolation and cosmic mystery',
  'Sun-scorched desert noir with slow-burn tension',
  'Golden-hour coming-of-age summer nostalgia'
];

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>(SearchType.VIBE);
  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('cine-theme') as 'dark' | 'light') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cine-theme', theme);
  }, [theme]);

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
      // 1. Get titles from Groq Llama 3.3 70B
      const recommendations = await getMovieRecommendations(
        query,
        currentType
      );

      // 2. Fetch TMDB metadata
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
    const randomVibe = SURPRISE_VIBES[Math.floor(Math.random() * SURPRISE_VIBES.length)];
    setQuery(randomVibe);
    handleSearch(undefined, SearchType.SURPRISE);
  };

  return (
    <div className="min-h-screen font-sans text-[var(--ink)]">
      {/* ================= NAV (EyuTheme brandmark) ================= */}
      <nav className="sticky top-0 z-40 backdrop-blur bg-[var(--nav-bg)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3" onClick={() => setResults([])}>
            <span className="relative inline-flex items-center justify-center cursor-pointer">
              <span
                className="font-[Outfit] text-[1.777rem] font-medium tracking-[-0.018em] leading-none"
              >
                Ey
              </span>
              <Plus size={11} strokeWidth={2.4} className="absolute -top-1.5 -right-2.5 text-[var(--accent)]" />
            </span>
            <span className="uppercase text-[0.694rem] tracking-[0.08em] text-[var(--text-muted)]">
              eyuel.me
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-6 text-sm text-[var(--text-muted)]">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="hover:text-[var(--ink)] cursor-pointer transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-[var(--ink)] cursor-pointer transition-colors"
            >
              About
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO (EyuTheme specimen layout) ================= */}
      <main className="max-w-7xl mx-auto px-6">
        <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-9 lg:gap-16 items-center pt-[clamp(3rem,8vw,6rem)] pb-12">
          {/* Left: title block */}
          <div>
            <p className="font-mono uppercase text-[0.694rem] tracking-[0.08em] text-[var(--accent)]">
              EyuTaste — Cinema · v6
            </p>

            <h2
              className="mt-5 font-[Outfit] font-bold text-[clamp(3.4rem,9vw,7.478rem)] leading-[0.96] tracking-[-0.028em]"
            >
              Cinema
              <br />
              <em className="italic text-[var(--complement)]">by feeling.</em>
            </h2>

            <p className="mt-5 max-w-[46ch] text-[var(--text-muted)] text-[1.125rem] leading-relaxed">
              Discover films through atmosphere, emotion, and cinematic tone —
              not algorithms. Curated by Groq, styled by EyuTaste.
            </p>

            {/* CTA row */}
            <div className="mt-7 flex flex-wrap gap-4">
              <button
                type="submit"
                form="cine-search"
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-[6px] bg-[var(--ink)] text-[var(--ink-inverse)] text-[0.833rem] font-[550] px-6 py-3 cursor-pointer transition-colors hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Sparkles size={16} />
                )}
                GET PICKS
              </button>

              <button
                onClick={handleSurprise}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-[6px] border border-[var(--line-strong)] text-[0.833rem] font-[550] px-6 py-3 cursor-pointer transition-colors hover:border-[var(--line-strong)]"
              >
                <MousePointer2 size={16} />
                SURPRISE ME
              </button>
            </div>

            <p className="mt-4 font-mono text-[0.694rem] tracking-[0.08em] text-[var(--text-faint)]">
              groq llama·3.3-70b · tmdb live · 10 picks
            </p>
          </div>

          {/* Right: search specimen panel */}
          <form
            id="cine-search"
            onSubmit={handleSearch}
            className="rounded-[10px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.25),0_2px_8px_rgba(0,0,0,0.35)] floaty"
          >
            <p className="uppercase font-mono text-[0.694rem] tracking-[0.08em] text-[var(--text-muted)] mb-4">
              Describe a feeling
            </p>

            <div className="min-h-[40px] w-full flex items-center gap-3 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] px-3 transition-all focus-within:border-[var(--accent-strong)] focus-within:shadow-[0_0_0_3px_var(--accent-soft)]">
              <Search size={16} className="text-[var(--text-muted)] shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  searchType === SearchType.VIBE
                    ? 'e.g. Quiet rainy nights, neon cities'
                    : 'e.g. Blade Runner 2049'
                }
                className="w-full bg-transparent outline-none py-2.5 text-[0.833rem] text-[var(--ink)] placeholder-[var(--text-faint)]"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  setSearchType(
                    searchType === SearchType.VIBE
                      ? SearchType.SIMILAR
                      : SearchType.VIBE
                  )
                }
                className="group inline-flex items-center gap-2 h-10 uppercase font-mono text-[0.694rem] tracking-[0.08em] px-3.5 rounded-[6px] border border-[var(--line-strong)] transition-all cursor-pointer hover:border-[var(--complement)] hover:text-[var(--complement)] active:scale-95"
              >
                {searchType === SearchType.VIBE ? (
                  <>
                    <Waves size={14} className="text-[var(--accent)] transition-colors group-hover:text-[var(--complement)]" />
                    BY VIBE
                  </>
                ) : (
                  <>
                    <Shuffle size={14} className="text-[var(--complement)] transition-transform group-hover:rotate-180" />
                    SIMILAR
                  </>
                )}
              </button>

              <span className="font-mono text-[0.694rem] tracking-[0.08em] text-[var(--text-faint)]">
                enter ↵
              </span>
            </div>
          </form>
        </section>

        {/* ================= RESULTS ================= */}
        <section className="pt-[20vh]">
          {isLoading && (
            <div className="py-24 flex flex-col items-center">
              <Loader2 size={42} className="animate-spin text-[var(--text-muted)] mb-4" />
              <p className="text-[var(--text-muted)] italic">
                Browsing the cinema vault…
              </p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <section>
              <div className="flex items-center justify-between gap-4 mb-8">
                <p className="font-mono uppercase text-[0.694rem] tracking-[0.08em] text-[var(--accent)]">
                  Curated vault — {results.length} picks
                </p>
                <Wand2 size={16} className="text-[var(--complement)]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {results.map((movie, idx) => (
                  <MovieCard
                    key={`${movie.id}-${idx}`}
                    movie={movie}
                    onWatchTrailer={setActiveTrailer}
                  />
                ))}
              </div>
            </section>
          )}

          {!isLoading && results.length === 0 && !query && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[2/3] rounded-xl bg-[var(--surface-raised)]"
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="mt-40 border-t border-[var(--line)] py-12 text-center text-sm text-[var(--text-muted)]">
        © 2026 Eyuel.me — CineSuggest | All Rights Reserved
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