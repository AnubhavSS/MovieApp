import axios from "axios";
const API_KEY='ffb563e52920c133259d54d0a297bc67'

//endpoints
const apiBaseUrl=`https://api.themoviedb.org/3`
const trendingMovies=`${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`
const upcomingMovies=`${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`
const topRatedMovies=`${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;

// movie
const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

// person
const personDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;
const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    };

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {};
    }
}

export const image500 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image342 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const image185 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;

// home screen apis
export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMovies);
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMovies);
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMovies);
}

// movie screen apis
export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}
export const fetchMovieCredits = (movieId)=>{
    return apiCall(movieCreditsEndpoint(movieId));
}
export const fetchSimilarMovies = (movieId)=>{
    return apiCall(similarMoviesEndpoint(movieId));
}


// person screen apis
export const fetchPersonDetails = (personId)=>{
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonMovies = (personId)=>{
    return apiCall(personMoviesEndpoint(personId));
}

// search screen apis
export const searchMovies = (params)=>{
    return apiCall(searchMoviesEndpoint, params);
}