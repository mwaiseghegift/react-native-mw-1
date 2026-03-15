import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Search() {
  return (
    <View className="flex-1 bg-black p-4">
      <View className="bg-gray-800 rounded-lg px-4 py-2 mb-4">
        <TextInput
          placeholder="Search movies..."
          placeholderTextColor="#888"
          className="text-white text-lg"
        />
      </View>
      <Text className="text-gray-400">Search results will appear here...</Text>
    </View>
  );
}
