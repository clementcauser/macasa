import { Stack } from "expo-router";
import { Layout as PageLayout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" />
      <Stack.Screen name="reset-password" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});
