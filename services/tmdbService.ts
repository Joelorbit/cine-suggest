import { TMDBMovie } from '../types';

const BASE_URL = 'https://api.themoviedb.org/3';

const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_TMDB_API_KEY is not set. Please add it to your .env file.');
  }
  return apiKey;
};

export const fetchMovieMetadata = async (title: string): Promise<TMDBMovie | null> => {
  try {
    const apiKey = getApiKey();
    const searchResponse = await fetch(
      `${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`
    );
    
    if (!searchResponse.ok) {
      throw new Error(`TMDB API error: ${searchResponse.status}`);
    }
    
    const searchData = await searchResponse.json();

    if (!searchData.results || searchData.results.length === 0) return null;

    const movie = searchData.results[0];
    
    // Fetch videos to get trailer
    const videosResponse = await fetch(
      `${BASE_URL}/movie/${movie.id}/videos?api_key=${apiKey}`
    );
    
    if (!videosResponse.ok) {
      // If videos fail, still return the movie without trailer
      return {
        ...movie,
        trailerKey: undefined,
      };
    }
    
    const videosData = await videosResponse.json();
    const trailer = videosData.results?.find(
      (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
    );

    return {
      ...movie,
      trailerKey: trailer ? trailer.key : undefined,
    };
  } catch (error) {
    console.error('TMDB Fetch Error:', error);
    return null;
  }
};
