import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const posts = [
  {
    id: "1",
    title: "10 beaches you need to visit",
    category: "Travel",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "2",
    title: "The ultimate Bali travel guide",
    category: "Guides",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "3",
    title: "How to plan your perfect trip",
    category: "Planning",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function BlogScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Travel Stories</Text>

        <Text style={styles.subtitle}>
          Inspiration for your next adventure
        </Text>

        {posts.map((post) => (
          <View key={post.id} style={styles.card}>
            <Image
              source={{ uri: post.image }}
              style={styles.image}
            />

            <View style={styles.cardContent}>
              <Text style={styles.category}>
                {post.category}
              </Text>

              <Text style={styles.postTitle}>
                {post.title}
              </Text>

              <Text style={styles.readMore}>
                Read article →
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 5,
    marginBottom: 22,
    fontSize: 14,
    color: "#64748B",
  },

  card: {
    marginBottom: 18,
    overflow: "hidden",
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  image: {
    width: "100%",
    height: 190,
  },

  cardContent: {
    padding: 17,
  },

  category: {
    fontSize: 11,
    fontWeight: "800",
    color: "#10B981",
    textTransform: "uppercase",
  },

  postTitle: {
    marginTop: 6,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "900",
    color: "#0F172A",
  },

  readMore: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: "800",
    color: "#059669",
  },
});