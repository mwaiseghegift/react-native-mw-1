import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { movieService } from '../../services/movieService';
import { storage } from '../../services/storage';
import { MovieDetails, Cast, Video } from '../../types/movie';
import { IMAGE_BASE_URL } from '../../services/apis';

const { width } = Dimensions.get('window');

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const [details, credits, videoData, savedStatus] = await Promise.all([
          movieService.getMovieDetails(id as string),
          movieService.getMovieCredits(id as string),
          movieService.getMovieVideos(id as string),
          storage.isInWatchlist(Number(id)),
        ]);
        setMovie(details);
        setCast(credits.cast.slice(0, 10)); // Top 10 cast members
        setVideos(videoData.results);
        setIsSaved(savedStatus);
      } catch (err) {
        console.error('Error fetching details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handlePlayTrailer = async () => {
    // Find the first official trailer on YouTube
    const trailer = videos.find(
      (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
    );

    if (trailer) {
      const url = `https://www.youtube.com/watch?v=${trailer.key}`;
      await WebBrowser.openBrowserAsync(url);
    } else {
      Alert.alert('No Trailer Found', 'Sorry, we couldn\'t find a trailer for this movie.');
    }
  };

  const toggleWatchlist = async () => {
    if (!movie) return;
    if (isSaved) {
      await storage.removeFromWatchlist(movie.id);
      setIsSaved(false);
    } else {
      await storage.addToWatchlist(movie as any); // Type cast for simpler storage
      setIsSaved(true);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (!movie) return null;

  return (
    <ScrollView className="flex-1 bg-black" showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View className="relative" style={{ width, height: 500 }}>
        <Image
          source={`${IMAGE_BASE_URL}original${movie.backdrop_path || movie.poster_path}`}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent', '#000']}
          className="absolute inset-0"
        />
        
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => router.back()}
          className="absolute top-12 left-6 bg-black/50 p-2 rounded-full"
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>

        {/* Info Overlay */}
        <View className="absolute bottom-0 p-6">
          <Text className="text-white text-4xl font-black mb-2">{movie.title}</Text>
          <View className="flex-row items-center flex-wrap">
            <Text className="text-gray-300 mr-4">{new Date(movie.release_date).getFullYear()}</Text>
            <View className="bg-gray-800 px-2 py-1 rounded mr-4">
              <Text className="text-gray-300 text-xs font-bold">{movie.status}</Text>
            </View>
            <Text className="text-gray-300">{movie.runtime} min</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row px-6 mb-8">
        <TouchableOpacity 
          onPress={handlePlayTrailer}
          className="flex-1 bg-white h-12 rounded-lg flex-row items-center justify-center mr-4"
        >
          <Ionicons name="play" size={24} color="black" />
          <Text className="text-black font-bold ml-2 text-lg">Play</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={toggleWatchlist}
          className="bg-gray-800 w-12 h-12 rounded-lg items-center justify-center"
        >
          <Ionicons 
            name={isSaved ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={isSaved ? "#E50914" : "white"} 
          />
        </TouchableOpacity>
      </View>

      {/* Overview */}
      <View className="px-6 mb-8">
        <Text className="text-white text-lg leading-6 text-gray-300 mb-4">
          {movie.overview}
        </Text>
        <View className="flex-row flex-wrap">
          {movie.genres.map((genre) => (
            <View key={genre.id} className="bg-gray-900 px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-gray-400 text-xs">{genre.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Cast */}
      <View className="mb-12">
        <Text className="text-white text-xl font-bold px-6 mb-4">Top Cast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
          {cast.map((person) => (
            <View key={person.id} className="mr-6 items-center" style={{ width: 80 }}>
              <View className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 mb-2 border-2 border-gray-700">
                <Image
                  source={`${IMAGE_BASE_URL}w185${person.profile_path}`}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                />
              </View>
              <Text className="text-white text-[10px] font-bold text-center mb-1" numberOfLines={1}>
                {person.name}
              </Text>
              <Text className="text-gray-500 text-[9px] text-center" numberOfLines={1}>
                {person.character}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
