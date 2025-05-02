export interface CreateMovieDTO {
    title: string;
    genres?: string;
    original_title?: string;
    vote_average?: number;
    overview?: string;
    status?: string;
    tagline?: string;
    budget?: number;
    runtime?: number;
    revenue?: number;
    popularity?: number;
    vote_count?: number;
    original_language?: string;
    release_date?: Date;
    backdrop_path?: string;
    poster_path?: string;
}

