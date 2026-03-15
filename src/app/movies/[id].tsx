import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { movieService } from '../../services/movieService';
import { storage } from '../../services/storage';
import { MovieDetails, Cast, Video } from '../../types/movie';
import { IMAGE_BASE_URL } from '../../services/apis';

const { width } = Dimensions.get('window');

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
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
      await storage.addToWatchlist(movie as any);
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
    <ScrollView 
      className="flex-1 bg-[#111]" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      {/* Header Image */}
      <View className="relative" style={{ width, height: 450 }}>
        <Image
          source={`${IMAGE_BASE_URL}original${movie.backdrop_path || movie.poster_path}`}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          transition={300}
        />
        <LinearGradient
          colors={['transparent', 'rgba(17,17,17,0.8)', '#111']}
          className="absolute inset-0"
        />
        
        {/* Info Overlay */}
        <View className="absolute bottom-0 p-6 w-full">
          <Text className="text-white text-4xl font-black mb-3 leading-tight">{movie.title}</Text>
          <View className="flex-row items-center flex-wrap">
            <Text className="text-gray-400 font-bold mr-4">{new Date(movie.release_date).getFullYear()}</Text>
            <View className="bg-[#E50914] px-2 py-0.5 rounded mr-4">
              <Text className="text-white text-[10px] font-black">{movie.status.toUpperCase()}</Text>
            </View>
            <View className="flex-row items-center mr-4">
              <Ionicons name="time-outline" size={14} color="#888" />
              <Text className="text-gray-400 ml-1">{movie.runtime}m</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text className="text-gray-400 ml-1 font-bold">{movie.vote_average.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row px-6 mb-8 -mt-2">
        <TouchableOpacity 
          onPress={handlePlayTrailer}
          className="flex-1 bg-white h-14 rounded-xl flex-row items-center justify-center mr-4 shadow-lg active:opacity-80"
        >
          <Ionicons name="play" size={24} color="black" />
          <Text className="text-black font-black ml-2 text-lg">WATCH TRAILER</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={toggleWatchlist}
          className="bg-gray-800/80 w-14 h-14 rounded-xl items-center justify-center border border-gray-700 active:opacity-80"
        >
          <Ionicons 
            name={isSaved ? "bookmark" : "bookmark-outline"} 
            size={26} 
            color={isSaved ? "#E50914" : "white"} 
          />
        </TouchableOpacity>
      </View>

      {/* Overview */}
      <View className="px-6 mb-8">
        <View className="flex-row flex-wrap mb-4">
          {movie.genres.map((genre) => (
            <View key={genre.id} className="bg-gray-900 px-4 py-1.5 rounded-full mr-2 mb-2 border border-gray-800">
              <Text className="text-gray-300 text-xs font-medium">{genre.name}</Text>
            </View>
          ))}
        </View>
        <Text className="text-gray-400 text-base leading-7 font-normal">
          {movie.overview}
        </Text>
      </View>

      {/* Cast */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center px-6 mb-4">
          <Text className="text-white text-xl font-black">Top Cast</Text>
          <TouchableOpacity>
            <Text className="text-[#E50914] font-bold">See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
          {cast.map((person) => (
            <View key={person.id} className="mr-6 items-center" style={{ width: 85 }}>
              <View className="w-20 h-20 rounded-full overflow-hidden bg-gray-900 mb-3 border-2 border-gray-800 shadow-md">
                <Image
                  source={`${IMAGE_BASE_URL}w185${person.profile_path}`}
                  style={{ width: '100%', height: '100%' }}
                  contentFit="cover"
                  transition={200}
                />
              </View>
              <Text className="text-white text-[11px] font-bold text-center mb-1" numberOfLines={1}>
                {person.name}
              </Text>
              <Text className="text-gray-500 text-[10px] text-center" numberOfLines={1}>
                {person.character}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
