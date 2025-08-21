import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { colors } from "@/constants/Colors";
import { DrawerToggleButton } from "@react-navigation/drawer";
import CustomHeader from "@/components/CustomHeader";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.disabled_focus,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        tabBarStyle: {
          backgroundColor: colors.primary,
        },
        header: () => {
          return <CustomHeader label="Pawpedia" searchInput={true} />;
        },
      }}
    >
      <Tabs.Screen
        name="breed/index"
        options={{
          title: "Pawpedia",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="house" color={color} />
          ),
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />

      <Tabs.Screen
        name="game"
        options={{
          title: "Game",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="gamepad" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
