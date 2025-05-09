import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function RestaurantDetail() {
  const { id } = useLocalSearchParams();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedText type="title">{id}</ThemedText>
    </ThemedView>
  );
}