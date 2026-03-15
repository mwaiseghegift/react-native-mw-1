import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {

  return (
    <ScrollView className="flex-1 bg-black" showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View className="items-center pt-12 pb-8 px-6">
        <View className="w-24 h-24 rounded-full bg-gray-800 items-center justify-center mb-4 border-2 border-[#E50914]">
          <Ionicons name="person" size={50} color="#E50914" />
        </View>
        <Text className="text-white text-2xl font-bold">MwaisegheWare</Text>
        <Text className="text-gray-500">member@mwaisegheware.com</Text>
      </View>

      {/* Profile Actions */}
      <View className="px-6 space-y-4">
        <TouchableOpacity className="flex-row items-center bg-gray-900 p-4 rounded-xl">
          <Ionicons name="settings-outline" size={24} color="#888" />
          <Text className="text-white text-lg ml-4 flex-1">Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center bg-gray-900 p-4 rounded-xl mt-4">
          <Ionicons name="notifications-outline" size={24} color="#888" />
          <Text className="text-white text-lg ml-4 flex-1">Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-gray-900 p-4 rounded-xl mt-4">
          <Ionicons name="help-circle-outline" size={24} color="#888" />
          <Text className="text-white text-lg ml-4 flex-1">Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </TouchableOpacity>
      </View>

      {/* About Section (Legal Compliance) */}
      <View className="mt-12 px-6 pb-20">
        <View className="p-6 bg-gray-950 rounded-2xl border border-gray-900">
          <Text className="text-white text-xl font-bold mb-4">About MovieApp</Text>
          
          <Text className="text-gray-400 leading-6 mb-6">
            MovieApp is a premium cinematic discovery platform designed for movie lovers. 
            We provide the latest updates, trailers, and metadata for millions of titles worldwide.
          </Text>

          {/* TMDB Legal Disclaimer */}
          <View className="flex-row items-start mb-6">
            <View className="bg-blue-500/10 p-2 rounded-lg mr-4">
              <Ionicons name="information-circle-outline" size={24} color="#01b4e4" />
            </View>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm italic">
                &quot;This product uses the TMDB API but is not endorsed or certified by TMDB.&quot;
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => Linking.openURL('https://www.themoviedb.org/')}
            className="flex-row items-center justify-center bg-[#01b4e4]/10 py-3 rounded-lg"
          >
            <Text className="text-[#01b4e4] font-bold mr-2">Visit TMDB</Text>
            <Ionicons name="open-outline" size={16} color="#01b4e4" />
          </TouchableOpacity>
        </View>

        <Text className="text-gray-700 text-center text-xs mt-8">
          Version 1.0.0 (Build 2026.03.15)
        </Text>
      </View>
    </ScrollView>
  );
}
