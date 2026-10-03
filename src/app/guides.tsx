import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const guides = [
  {
    id: "1",
    title: "Bali Travel Guide",
    description:
      "Everything you need to know before visiting Bali.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "2",
    title: "Explore Switzerland",
    description:
      "Mountains, lakes and unforgettable experiences.",
    image:
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "3",
    title: "Discover Tokyo",
    description:
      "A complete guide to Japan's incredible capital.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function GuidesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Travel Guides
        </Text>

        <Text style={styles.subtitle}>
          Explore smarter with our travel guides
        </Text>

        {guides.map((guide) => (
          <View key={guide.id} style={styles.card}>
            <Image
              source={{ uri: guide.image }}
              style={styles.image}
            />

            <View style={styles.cardContent}>
              <Text style={styles.guideTitle}>
                {guide.title}
              </Text>

              <Text style={styles.description}>
                {guide.description}
              </Text>

              <Text style={styles.explore}>
                Explore guide →
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

  guideTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
  },

  description: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },

  explore: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: "800",
    color: "#10B981",
  },
});