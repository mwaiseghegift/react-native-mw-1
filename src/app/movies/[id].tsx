import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 bg-black p-4">
      <TouchableOpacity 
        onPress={() => router.back()}
        className="mb-4 flex-row items-center"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
        <Text className="text-white ml-2">Back</Text>
      </TouchableOpacity>
      
      <Text className="text-white text-3xl font-bold mb-2">Movie ID: {id}</Text>
      <Text className="text-gray-400">Movie details and content will go here...</Text>
    </View>
  );
}
