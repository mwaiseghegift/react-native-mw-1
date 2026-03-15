import React from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Watchlist() {
  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-3xl font-bold mb-4">My Watchlist</Text>
      <Text className="text-gray-400">Your saved movies will appear here...</Text>
    </View>
  );
}
