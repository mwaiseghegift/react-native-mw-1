import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function Home() {
  return (
    <View className="flex-1 bg-black p-4">
      <Text className="text-white text-3xl font-bold mb-4">Trending Movies</Text>
      <ScrollView>
        <Text className="text-gray-400">Movie discovery items will go here...</Text>
      </ScrollView>
    </View>
  );
}
