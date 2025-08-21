import React from "react";
import { Stack } from "expo-router";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { colors } from "@/constants/Colors";
import CustomHeader from "@/components/CustomHeader";

const GameLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.secondary,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Pawpedia Game",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
          header: () => {
            return <CustomHeader label="Game" />;
          },
        }}
      />
      <Stack.Screen
        name="easyMode"
        options={{
          title: "Easy Mode",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="hardMode"
        options={{
          title: "Hard Mode",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default GameLayout;
