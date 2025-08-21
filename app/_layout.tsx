import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css"
import { View } from 'react-native';
import { AuthProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchProvider } from '@/context/SearchContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [loaded] = useFonts({
    'Fredoka-Regular': require('../assets/fonts/Fredoka-Regular.ttf'),
    'Fredoka-SemiBold': require('../assets/fonts/Fredoka-SemiBold.ttf'),
    'Fredoka-Bold': require('../assets/fonts/Fredoka-Bold.ttf'),
    'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const queryClient = new QueryClient();

  return (

    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SearchProvider>
          <View className='flex-1 bg-background '>
            <Slot /> 
            <StatusBar style='dark' />
          </View>
        </SearchProvider>
      </AuthProvider>
    </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
