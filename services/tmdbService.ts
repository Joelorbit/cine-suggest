import { TMDBMovie } from '../types';

const BASE_URL = 'https://api.themoviedb.org/3';

const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey || typeof apiKey !== 'string' || !apiKey.trim()) {
    throw new Error('VITE_TMDB_API_KEY is not set. Please add it to your .env file.');
  }
  return apiKey.trim();
};

export const fetchMovieMetadata = async (title: string): Promise<TMDBMovie | null> => {
  if (!title || typeof title !== 'string' || !title.trim()) {
    return null;
  }

  try {
    const apiKey = getApiKey();
    const cleanTitle = title.trim();

    const searchResponse = await fetch(
      `${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(cleanTitle)}&include_adult=false`
    );
    
    if (!searchResponse.ok) {
      console.warn(`TMDB search returned status: ${searchResponse.status}`);
      return null;
    }
    
    const searchData = await searchResponse.json();

    if (!searchData.results || searchData.results.length === 0) return null;

    const movie = searchData.results[0];
    
    // Fetch videos to get trailer
    let trailerKey: string | undefined = undefined;
    try {
      const videosResponse = await fetch(
        `${BASE_URL}/movie/${movie.id}/videos?api_key=${apiKey}`
      );
      
      if (videosResponse.ok) {
        const videosData = await videosResponse.json();
        const trailer = videosData.results?.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        if (trailer?.key) {
          trailerKey = trailer.key;
        }
      }
    } catch {
      // Non-fatal trailer fetch failure
    }

    return {
      id: movie.id,
      title: movie.title || cleanTitle,
      poster_path: movie.poster_path || '',
      vote_average: typeof movie.vote_average === 'number' ? movie.vote_average : 0,
      vote_count: typeof movie.vote_count === 'number' ? movie.vote_count : 0,
      overview: movie.overview || '',
      release_date: movie.release_date || '',
      trailerKey
    };
  } catch (error) {
    console.error('TMDB Fetch Error:', error);
    return null;
  }
};
