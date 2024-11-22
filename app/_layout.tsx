import { Stack } from 'expo-router';

// export const landing = {
//   initialRouteName: 'index',
// }

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
