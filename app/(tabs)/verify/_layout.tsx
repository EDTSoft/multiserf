import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";

export default function StackVerifyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Verificar credencial",
        }}
      />
      <Stack.Screen
        name="person-screen"
        options={{
          title: "Credencial verificada",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
