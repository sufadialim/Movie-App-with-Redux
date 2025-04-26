import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../src/redux/actions/favoriteActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function FavoritesScreen() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const handleRemoveFavorite = (movie) => {
    dispatch(removeFavorite(movie));
    console.log(`Unfavorite movie: ${movie.title}`);
  };

  const renderItem = ({ item }) => {
    const IMAGE_URL = item.poster_path
      ? 'https://image.tmdb.org/t/p/w185' + item.poster_path
      : 'https://via.placeholder.com/100x150.png?text=No+Image';
    return (
      <View style={styles.itemContainer}>
        {/* Poster on the left */}
        <Image
          source={{ uri: IMAGE_URL }}
          resizeMode="cover"
          style={styles.poster}
        />
        {/* Title and Unfavorite Button on the right */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          {/* Unfavorite Button */}
          <TouchableOpacity
            onPress={() => handleRemoveFavorite(item)}
            activeOpacity={0.7}
            style={styles.iconButton}
          >
            <MaterialIcons name="favorite" size={32} color="orange" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Add a movie to the list.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  emptyText: {
    fontSize: 18,
    color: '#010101',
    marginTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    paddingRight: 16,
    flex: 1,
  },
  iconButton: {
    padding: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
});