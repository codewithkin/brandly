import { Stack } from 'expo-router';
import "react-native-gesture-handler";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { RootSiblingParent } from 'react-native-root-siblings';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

function RootLayoutNav() {

  return (
      <PaperProvider>
        <RootSiblingParent>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </RootSiblingParent>
      </PaperProvider>
  );
}
