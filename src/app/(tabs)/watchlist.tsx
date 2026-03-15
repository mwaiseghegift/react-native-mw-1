import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { storage } from '../../services/storage';
import { Movie } from '../../types/movie';
import MovieCard from '../../components/MovieCard';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;

export default function Watchlist() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const isFocused = useIsFocused();

  const loadWatchlist = async () => {
    const data = await storage.getWatchlist();
    setMovies(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadWatchlist();
    }
  }, [isFocused]);

  return (
    <View className="flex-1 bg-black pt-12">
      <View className="px-6 mb-6">
        <Text className="text-white text-3xl font-black">My Watchlist</Text>
        <Text className="text-gray-500 text-sm mt-1">
          {movies.length} {movies.length === 1 ? 'movie' : 'movies'} saved
        </Text>
      </View>

      {movies.length > 0 ? (
        <FlatList
          data={movies}
          numColumns={COLUMN_COUNT}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="m-2">
              <MovieCard movie={item} size="small" />
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 justify-center items-center px-10">
          <View className="bg-gray-900/50 w-24 h-24 rounded-full items-center justify-center mb-6">
            <Ionicons name="bookmark-outline" size={40} color="#444" />
          </View>
          <Text className="text-white text-xl font-bold mb-2">Your watchlist is empty</Text>
          <Text className="text-gray-500 text-center">
            Save movies you want to watch later and they'll appear here.
          </Text>
        </View>
      )}
    </View>
  );
}
