import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import MovieRow from '../../components/MovieRow';
import TrendingCarousel from '../../components/TrendingCarousel';
import { movieService } from '../../services/movieService';
import { Movie } from '../../types/movie';

export default function Home() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        const [trendingData, topRatedData, upcomingData, nowPlayingData] = await Promise.all([
          movieService.getTrendingMovies(),
          movieService.getTopRated(),
          movieService.getUpcoming(),
          movieService.getNowPlaying(),
        ]);

        setTrending(trendingData.results);
        setTopRated(topRatedData.results);
        setUpcoming(upcomingData.results);
        setNowPlaying(nowPlayingData.results);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load movies. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-black justify-center items-center p-4">
        <Text className="text-white text-center mb-4">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black" showsVerticalScrollIndicator={false}>
      <TrendingCarousel movies={trending} />
      
      <MovieRow title="Top Rated" movies={topRated} size="large" />
      <MovieRow title="Now Playing" movies={nowPlaying} />
      <MovieRow title="Upcoming" movies={upcoming} />
      
      {/* Visual buffer at the bottom */}
      <View className="h-10" />
    </ScrollView>
  );
}
