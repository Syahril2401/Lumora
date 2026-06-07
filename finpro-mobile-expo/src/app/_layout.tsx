import "../global.css";
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/login" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(auth)/register" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(auth)/survey" options={{ animation: 'slide_from_bottom', gestureEnabled: false }} />
        <Stack.Screen name="(auth)/survey-result" options={{ animation: 'fade', gestureEnabled: false }} />
        <Stack.Screen name="(dashboard)" options={{ animation: 'fade' }} />
      </Stack>
    </AuthProvider>
  );
}
