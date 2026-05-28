import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Home, Inbox, MessageCircle, Phone, Settings } from "lucide-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AssistantScreen from "./src/screens/AssistantScreen";
import InboxScreen from "./src/screens/InboxScreen";
import MessagesScreen from "./src/screens/MessagesScreen";
import CallsScreen from "./src/screens/CallsScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { colors } from "./src/theme/colors";

const Tab = createBottomTabNavigator();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.accent
  }
};

function iconFor(routeName, color, size) {
  const props = { color, size, strokeWidth: 2.1 };
  if (routeName === "Assistant") return <Home {...props} />;
  if (routeName === "Emails") return <Inbox {...props} />;
  if (routeName === "Messages") return <MessageCircle {...props} />;
  if (routeName === "Appels") return <Phone {...props} />;
  return <Settings {...props} />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              position: "absolute",
              left: 16,
              right: 16,
              bottom: 18,
              height: 72,
              paddingTop: 10,
              paddingBottom: 12,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: "rgba(12, 15, 25, 0.92)"
            },
            tabBarActiveTintColor: colors.accent,
            tabBarInactiveTintColor: colors.muted,
            tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
            tabBarIcon: ({ color, size }) => iconFor(route.name, color, size)
          })}
        >
          <Tab.Screen name="Assistant" component={AssistantScreen} />
          <Tab.Screen name="Emails" component={InboxScreen} />
          <Tab.Screen name="Messages" component={MessagesScreen} />
          <Tab.Screen name="Appels" component={CallsScreen} />
          <Tab.Screen name="Reglages" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

