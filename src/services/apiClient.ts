/** Example API calls using curl:
 * curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11' \
     --header 'Authorization: Bearer <<access_token>>'

curl --request GET \
     --url 'https://api.themoviedb.org/3/movie/11/videos' \
     --header 'Authorization: Bearer <<access_token>>'
 */

import { API_URL } from "./apis";

// In Expo/React Native, environment variables are typically accessed via process.env
// Note: If using Expo, these should ideally have EXPO_PUBLIC_ prefix
const READ_ACCESS_TOKEN = process.env.EXPO_PUBLIC_API_READ_ACCESS_TOKEN || process.env.API_READ_ACCESS_TOKEN;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY || process.env.api_key;

export async function apiClient<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${API_URL}${endpoint}`);
  
  // Add query parameters
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key].toString()));
  
  // Add API Key to search params if token is not available
  if (!READ_ACCESS_TOKEN && API_KEY) {
    url.searchParams.append('api_key', API_KEY);
  }

  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (READ_ACCESS_TOKEN) {
    headers['Authorization'] = `Bearer ${READ_ACCESS_TOKEN}`;
  }

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.status_message || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Client Error (${endpoint}):`, error);
    throw error;
  }
}
