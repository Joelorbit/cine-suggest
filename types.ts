
export interface MovieRecommendation {
  title: string;
  matchScore: number;
  reason: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  trailerKey?: string;
  matchScore?: number;
  reason?: string;
}

export enum SearchType {
  VIBE = 'VIBE',
  SIMILAR = 'SIMILAR',
  SURPRISE = 'SURPRISE'
}
