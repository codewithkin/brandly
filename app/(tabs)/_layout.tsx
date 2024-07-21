import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { PaperProvider } from "react-native-paper";
import { RootSiblingParent } from 'react-native-root-siblings';


export default function TabLayout() {

  return (
    <PaperProvider>
      <RootSiblingParent>
    <Tabs
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color="darkgray" />
          ),
        }}
      />

      <Tabs.Screen
        name="Chat"
        options={{
          title: 'Chat',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={24} color="darkgray" />
          ),
          tabBarBadge: "2",
          tabBarBadgeStyle: {
            color: "white",
            backgroundColor: "red"
          }
        }}
      />

      <Tabs.Screen
        name="Discover"
        options={{
          title: 'Discover',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="globe" size={24} color="darkgray" />
          ),
        }}
      />
    </Tabs>
    </RootSiblingParent>

    </PaperProvider>
  );
}
