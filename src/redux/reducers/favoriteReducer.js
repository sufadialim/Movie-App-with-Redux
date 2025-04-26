const initialState = {
    favorites: [],
  };
  
  const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_FAVORITE':
        return { ...state, favorites: [...state.favorites, action.payload] };
      case 'REMOVE_FAVORITE':
        return {
          ...state,
          favorites: state.favorites.filter(
            (movie) => movie.id !== action.payload.id
          ),
        };
      default:
        return state;
    }
  };
  
  export default favoriteReducer;