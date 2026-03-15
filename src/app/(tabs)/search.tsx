import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MovieCard from '../../components/MovieCard';
import { movieService } from '../../services/movieService';
import { Movie } from '../../types/movie';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_WIDTH = (width - 48) / COLUMN_COUNT;

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.searchMovies(query);
        setResults(data.results);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results.');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <View className="flex-1 bg-black pt-12">
      {/* Search Header */}
      <View className="px-4 mb-6">
        <View className="bg-gray-900 rounded-2xl flex-row items-center px-4 py-3 h-14 border border-gray-800">
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            placeholder="Search movies, actors..."
            placeholderTextColor="#888"
            className="flex-1 ml-3 text-white text-base"
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#E50914" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-gray-400 text-center">{error}</Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
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
      ) : query.length > 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="search-outline" size={64} color="#333" />
          <Text className="text-gray-500 text-lg mt-4">No results found for &quot;{query}&quot;</Text>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="film-outline" size={64} color="#222" />
          <Text className="text-gray-600 text-lg mt-4 text-center">
            Find your next favorite movie
          </Text>
        </View>
      )}
    </View>
  );
}
