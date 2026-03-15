import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '../types/movie';
import { IMAGE_BASE_URL } from '../services/apis';

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'large';
}

const MovieCard = ({ movie, size = 'small' }: MovieCardProps) => {
  const width = size === 'large' ? 160 : 120;
  const height = size === 'large' ? 240 : 180;

  return (
    <Link href={`/movies/${movie.id}` as any} asChild>
      <TouchableOpacity 
        className="mr-4 overflow-hidden rounded-xl bg-gray-900"
        style={{ width, height }}
      >
        <Image
          source={`${IMAGE_BASE_URL}w500${movie.poster_path}`}
          contentFit="cover"
          transition={200}
          style={{ width: '100%', height: '100%' }}
          cachePolicy="memory-disk"
        />
        <View className="absolute bottom-0 left-0 right-0 p-2 bg-black/60">
          <Text className="text-white text-xs font-bold truncate" numberOfLines={1}>
            {movie.title}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={10} color="#FFD700" />
            <Text className="text-gray-300 text-[10px] ml-1">
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
