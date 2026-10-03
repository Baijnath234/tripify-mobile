import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
} from "lucide-react-native";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const days = [
  {
    day: "Day 1",
    title: "Arrival & exploration",
    activities: [
      "Check into hotel",
      "Explore local area",
      "Sunset dinner",
    ],
  },
  {
    day: "Day 2",
    title: "Beach & adventure",
    activities: [
      "Morning beach visit",
      "Water activities",
      "Local restaurant",
    ],
  },
  {
    day: "Day 3",
    title: "Culture & sightseeing",
    activities: [
      "Visit cultural landmarks",
      "Local market",
      "Traditional dinner",
    ],
  },
];

export default function ItineraryDetailsScreen() {
  const { id } =
    useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.back}
            onPress={() => router.back()}
          >
            <ArrowLeft
              size={20}
              color="#0F172A"
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            My itinerary
          </Text>

          <View style={styles.spacer} />
        </View>

        <View style={styles.hero}>
          <Text style={styles.destination}>
            Bali
          </Text>

          <View style={styles.meta}>
            <MapPin
              size={15}
              color="#10B981"
            />

            <Text style={styles.metaText}>
              Indonesia
            </Text>

            <CalendarDays
              size={15}
              color="#10B981"
            />

            <Text style={styles.metaText}>
              7 days
            </Text>
          </View>
        </View>

        <Text style={styles.heading}>
          Your itinerary
        </Text>

        {days.map((item) => (
          <View
            key={item.day}
            style={styles.dayCard}
          >
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>
                {item.day}
              </Text>
            </View>

            <Text style={styles.dayTitle}>
              {item.title}
            </Text>

            {item.activities.map(
              (activity) => (
                <View
                  key={activity}
                  style={styles.activity}
                >
                  <View
                    style={styles.dot}
                  />

                  <Text
                    style={styles.activityText}
                  >
                    {activity}
                  </Text>
                </View>
              )
            )}
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  spacer: {
    width: 43,
  },

  hero: {
    marginTop: 25,
    padding: 22,
    borderRadius: 24,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  destination: {
    fontSize: 31,
    fontWeight: "900",
    color: "#064E3B",
  },

  meta: {
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  metaText: {
    fontSize: 12,
    color: "#047857",
    marginRight: 7,
  },

  heading: {
    marginTop: 28,
    marginBottom: 15,
    fontSize: 23,
    fontWeight: "900",
    color: "#0F172A",
  },

  dayCard: {
    marginBottom: 15,
    padding: 18,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  dayBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#ECFDF5",
  },

  dayBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#059669",
  },

  dayTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
  },

  activity: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 10,
  },

  activityText: {
    fontSize: 13,
    color: "#64748B",
  },
});