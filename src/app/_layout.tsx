import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="movies/[id]" 
        options={{ 
          presentation: 'modal', 
          title: 'Movie Details',
          headerStyle: {
            backgroundColor: '#111',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
    </Stack>
  );
}
