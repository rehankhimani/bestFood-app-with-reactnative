import ThemeButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { Alert, Image, StyleSheet, useColorScheme, View } from "react-native";

export default function Welcome() {
  const theme = useColorScheme() || 'light'


  return (
    <ThemedView style={[styles.container]}>
      <View style={styles.topContainer}>
        <Image
          style={{ flex: 1 }}
          source={{
            uri: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2653&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <ThemedText align="center" type="title">
            Find Best Restaurant
          </ThemedText>
          <ThemedText style={styles.desc} align="center" type="subtitle">
            In Our App you will find best restaurants in your area with user
            reviews.
          </ThemedText>
        </View>
        <View>
          <ThemeButton my={5}
            onPress={() => router.push('./home')}
            txt="Continue with Google" />
          <ThemeButton my={5}
            onPress={() => Alert.alert("Clicked on Apple")}
            txtColor="#fff"
            bgColor="#000"
            txt="Continue with Apple" />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: { flex: 1, justifyContent: "space-around", padding: 15 },
  topContainer: { flex: 1, backgroundColor: "orange" },
  desc: { marginTop: 10, lineHeight: 27 },
});