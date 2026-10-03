import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  CalendarDays,
  ChevronRight,
  MapPin,
  Plus,
} from "lucide-react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const trips = [
  {
    id: "bali-trip",
    destination: "Bali",
    date: "12 - 18 Oct 2026",
    days: "7 days",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "paris-trip",
    destination: "Paris",
    date: "04 - 10 Dec 2026",
    days: "7 days",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function TripsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>My Trips</Text>

            <Text style={styles.subtitle}>
              Your upcoming adventures
            </Text>
          </View>

          <Pressable
            style={styles.addButton}
            onPress={() =>
              router.push("/itinerary-builder")
            }
          >
            <Plus size={21} color="#FFFFFF" />
          </Pressable>
        </View>

        {trips.map((trip) => (
          <Pressable
            key={trip.id}
            style={styles.tripCard}
            onPress={() =>
              router.push({
                pathname: "/itinerary-builder",
                params: {
                  destination: trip.destination,
                },
              })
            }
          >
            <Image
              source={{ uri: trip.image }}
              style={styles.image}
            />

            <View style={styles.tripContent}>
              <Text style={styles.destination}>
                {trip.destination}
              </Text>

              <View style={styles.row}>
                <CalendarDays
                  size={15}
                  color="#10B981"
                />

                <Text style={styles.detail}>
                  {trip.date}
                </Text>
              </View>

              <View style={styles.row}>
                <MapPin
                  size={15}
                  color="#10B981"
                />

                <Text style={styles.detail}>
                  {trip.days}
                </Text>
              </View>
            </View>

            <View style={styles.arrow}>
              <ChevronRight
                size={20}
                color="#64748B"
              />
            </View>
          </Pressable>
        ))}

        {/* Empty / CTA */}
        <View style={styles.cta}>
          <Text style={styles.ctaEmoji}>✈️</Text>

          <Text style={styles.ctaTitle}>
            Plan your next adventure
          </Text>

          <Text style={styles.ctaText}>
            Create a personalized itinerary for
            your next trip.
          </Text>

          <Pressable
            style={styles.ctaButton}
            onPress={() =>
              router.push("/itinerary-builder")
            }
          >
            <Text style={styles.ctaButtonText}>
              Create itinerary
            </Text>
          </Pressable>
        </View>
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
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  addButton: {
    width: 45,
    height: 45,
    borderRadius: 16,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },

  tripCard: {
    minHeight: 130,
    marginBottom: 15,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 115,
    height: 130,
  },

  tripContent: {
    flex: 1,
    padding: 14,
  },

  destination: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 5,
  },

  detail: {
    fontSize: 11,
    color: "#64748B",
  },

  arrow: {
    paddingRight: 12,
  },

  cta: {
    marginTop: 15,
    padding: 25,
    borderRadius: 25,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  ctaEmoji: {
    fontSize: 36,
  },

  ctaTitle: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: "900",
    color: "#064E3B",
  },

  ctaText: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    color: "#047857",
  },

  ctaButton: {
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 13,
    backgroundColor: "#10B981",
  },

  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});