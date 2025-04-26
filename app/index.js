import { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../src/redux/actions/movieActions';
import { addFavorite, removeFavorite } from '../src/redux/actions/favoriteActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleAddFavorite = (movie) => {
    dispatch(addFavorite(movie));
    console.log(`Favorite movie: ${movie.title}`);
  };

  const handleRemoveFavorite = (movie) => {
    dispatch(removeFavorite(movie));
    console.log(`Unfavorite movie: ${movie.title}`);
  };

  const handleLike = (movie) => {
    console.log(`Liked movie: ${movie.title}`);
  };

  const renderItem = ({ item }) => {
    const IMAGE_URL = item.poster_path
      ? 'https://image.tmdb.org/t/p/w185' + item.poster_path
      : 'https://via.placeholder.com/100x150.png?text=No+Image';
    const isFavorited = favorites.some((fav) => fav.id === item.id);

    return (
      <View style={styles.itemContainer}>
        {/* Poster on the left */}
        <Image
          source={{ uri: IMAGE_URL }}
          resizeMode="cover"
          style={styles.poster}
        />
        {/* Title, Like, and Favorite on the right */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.iconRow}>
            {/* Like Button */}
            <TouchableOpacity
              onPress={() => handleLike(item)}
              activeOpacity={0.7}
              style={styles.iconButton}
            >
              <MaterialIcons name="thumb-up" size={32} color="green" />
            </TouchableOpacity>
            {/* Favorite Button */}
            <TouchableOpacity
              onPress={() =>
                isFavorited ? handleRemoveFavorite(item) : handleAddFavorite(item)
              }
              activeOpacity={0.7}
              style={styles.iconButton}
            >
              <MaterialIcons
                name={isFavorited ? 'favorite' : 'favorite-outline'}
                size={32}
                color="orange"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  if (loading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Movies</Text>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 44,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 22,
    paddingRight: 16,
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 14,
    padding: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
});