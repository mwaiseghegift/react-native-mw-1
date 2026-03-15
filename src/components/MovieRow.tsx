import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  size?: 'small' | 'large';
}

const MovieRow = ({ title, movies, size = 'small' }: MovieRowProps) => {
  return (
    <View className="mb-6">
      <Text className="text-white text-xl font-bold px-4 mb-3">{title}</Text>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} size={size} />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default MovieRow;
