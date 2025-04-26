import axios from 'axios';

export const fetchMoviesRequest = () => ({
  type: 'FETCH_MOVIES_REQUEST',
});

export const fetchMoviesSuccess = (movies) => ({
  type: 'FETCH_MOVIES_SUCCESS',
  payload: movies,
});

export const fetchMoviesFailure = (error) => ({
  type: 'FETCH_MOVIES_FAILURE',
  payload: error,
});

export const fetchMovies = () => {
  return async (dispatch) => {
    dispatch(fetchMoviesRequest());
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/movie/popular',
        {
          params: {
            api_key: '324b723bbfd244a899cd5e5e2cd8e8ff', // Replace with your TMDB API key
          },
        }
      );
      dispatch(fetchMoviesSuccess(response.data.results));
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};