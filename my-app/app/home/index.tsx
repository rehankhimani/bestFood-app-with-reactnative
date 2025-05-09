import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { restaurants } from "@/constants/mockdata";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  RefreshControl,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useCallback, useState } from "react";
import { Link, router } from "expo-router";
import ThemeButton from "@/components/ThemedButton";
import React from "react";

const SCREEN_WIDTH = Dimensions.get("screen").width;
export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ThemedView style={{ flex: 1, padding: 10 }}>
      <ThemeButton
        txt="Add Restaurant"
        onPress={() => router.push("./addRestaurant")}
      />
      <FlatList
        ListHeaderComponent={
          <>
            <View style={{ height: 370, gap: 10 }}>
              <ThemedText type="title">Featured Resaturants</ThemedText>
              <FlatList
                horizontal={true}
                data={restaurants}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(data) => data.id.toString()}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item, index }) => {
                  return (
                    <ThemedView style={styles.horizontalCard}>
                      <Image
                        source={{ uri: item.thumbnail }}
                        style={styles.cardImg}
                      />
                      <ThemedView style={{ padding: 10 }}>
                        <ThemedText>{item.name}</ThemedText>
                        <View style={styles.row}>
                          <ThemedText>
                            Reviews : {item.reviews.length}
                          </ThemedText>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <AntDesign name="star" size={16} color="#ff9800" />
                            <ThemedText>{item.averageRating}</ThemedText>
                          </View>
                        </View>
                      </ThemedView>
                    </ThemedView>
                  );
                }}
              />

              <ThemedText type="title">Most Liked Resatuarant</ThemedText>
            </View>
          </>
        }
        data={restaurants}
        initialNumToRender={10}
        numColumns={2}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsHorizontalScrollIndicator={false}
        keyExtractor={(data) => data.id.toString()}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item, index }) => {
          return (
            <Link style={styles.card} href={`/home/${item.id.toString()}`}>
              <ThemedView style={{ flex: 1 }}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={[styles.cardImg, { height: 120 }]}
                />
                <ThemedView style={{ padding: 10 }}>
                  <ThemedText>{item.name}</ThemedText>
                  <View style={[styles.row]}>
                    <ThemedText>Reviews : {item.reviews.length}</ThemedText>

                    <View
                      style={{
                        flexDirection: "row",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      <AntDesign name="star" size={16} color="#ff9800" />
                      <ThemedText>{item.averageRating}</ThemedText>
                    </View>
                  </View>
                </ThemedView>
              </ThemedView>
            </Link>
          );
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 0.5,
    flex: 1,
  },
  horizontalCard: {
    marginVertical: 10,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    width: SCREEN_WIDTH / 1.4,
  },
  cardImg: { height: 180 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});