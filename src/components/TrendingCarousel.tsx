import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Movie } from '../types/movie';
import { IMAGE_BASE_URL } from '../services/apis';

const { width } = Dimensions.get('window');

interface TrendingCarouselProps {
  movies: Movie[];
}

const TrendingCarousel = ({ movies }: TrendingCarouselProps) => {
  // Taking the first movie for a featured section since a real carousel 
  // often requires more complex setup like react-native-reanimated-carousel
  // We'll start with a premium featured banner of the most popular item.
  const featured = movies[0];

  if (!featured) return null;

  return (
    <View className="relative mb-8" style={{ width, height: 450 }}>
      <Link href={`/movies/${featured.id}` as any} asChild>
        <TouchableOpacity activeOpacity={0.9} className="w-full h-full">
          <Image
            source={`${IMAGE_BASE_URL}original${featured.backdrop_path}`}
            contentFit="cover"
            style={{ width: '100%', height: '100%' }}
            transition={300}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)', '#000']}
            className="absolute bottom-0 left-0 right-0 h-60 justify-end p-6"
          >
            <Text className="text-white text-3xl font-black mb-2 shadow-lg">
              {featured.title}
            </Text>
            <Text className="text-gray-300 text-sm mb-4 line-clamp-2" numberOfLines={2}>
              {featured.overview}
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity className="bg-white px-6 py-2 rounded-full mr-3">
                <Text className="text-black font-bold">Watch Now</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-800/80 px-4 py-2 rounded-full">
                <Text className="text-white font-bold">+ Watchlist</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default TrendingCarousel;
