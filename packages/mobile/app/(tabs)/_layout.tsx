import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00d4aa",
        tabBarInactiveTintColor: "#71717A",
        tabBarStyle: {
          backgroundColor: "#09090b",
          borderTopColor: "#27272a",
        },
        headerStyle: { backgroundColor: "#09090b" },
        headerTintColor: "#fafafa",
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="list"
        options={{
          title: t("nav.myList"),
          tabBarLabel: t("nav.myList"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t("nav.explore"),
          tabBarLabel: t("nav.explore"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("nav.profile"),
          tabBarLabel: t("nav.profile"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rankings"
        options={{
          title: t("nav.rankings"),
          tabBarLabel: t("nav.rankings"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
