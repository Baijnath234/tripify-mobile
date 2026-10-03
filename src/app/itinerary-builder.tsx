import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  ArrowLeft,
  CalendarDays,
  Minus,
  Plus,
  Sparkles,
  Users,
} from "lucide-react-native";

import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ItineraryBuilderScreen() {
  const { destination } =
    useLocalSearchParams<{
      destination?: string;
    }>();

  const [place, setPlace] = useState(
    destination || ""
  );

  const [travelers, setTravelers] = useState(2);

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
              size={21}
              color="#0F172A"
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            Plan your trip
          </Text>

          <View style={styles.empty} />
        </View>

        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Sparkles
              size={25}
              color="#10B981"
            />
          </View>

          <Text style={styles.heroTitle}>
            Let's create your perfect trip ✈️
          </Text>

          <Text style={styles.heroText}>
            Tell us a few things about your trip and
            we'll build an itinerary for you.
          </Text>
        </View>

        {/* Destination */}
        <Text style={styles.label}>
          Where are you going?
        </Text>

        <View style={styles.inputBox}>
          <TextInput
            value={place}
            onChangeText={setPlace}
            placeholder="e.g. Bali, Paris, Tokyo"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />
        </View>

        {/* Dates */}
        <Text style={styles.label}>
          When are you going?
        </Text>

        <Pressable style={styles.inputBox}>
          <CalendarDays
            size={20}
            color="#10B981"
          />

          <Text style={styles.placeholder}>
            Select travel dates
          </Text>
        </Pressable>

        {/* Travelers */}
        <Text style={styles.label}>
          Travelers
        </Text>

        <View style={styles.travelerBox}>
          <View style={styles.travelerLeft}>
            <Users
              size={20}
              color="#10B981"
            />

            <View>
              <Text style={styles.travelerTitle}>
                Travelers
              </Text>

              <Text style={styles.travelerSubtitle}>
                Number of people
              </Text>
            </View>
          </View>

          <View style={styles.counter}>
            <Pressable
              style={styles.counterButton}
              onPress={() =>
                setTravelers(
                  Math.max(1, travelers - 1)
                )
              }
            >
              <Minus
                size={15}
                color="#0F172A"
              />
            </Pressable>

            <Text style={styles.count}>
              {travelers}
            </Text>

            <Pressable
              style={styles.counterButton}
              onPress={() =>
                setTravelers(travelers + 1)
              }
            >
              <Plus
                size={15}
                color="#0F172A"
              />
            </Pressable>
          </View>
        </View>

        {/* Budget */}
        <Text style={styles.label}>
          Budget
        </Text>

        <View style={styles.budgetRow}>
          {["Budget", "Comfort", "Luxury"].map(
            (item, index) => (
              <Pressable
                key={item}
                style={[
                  styles.budget,
                  index === 1 &&
                    styles.budgetActive,
                ]}
              >
                <Text
                  style={[
                    styles.budgetText,
                    index === 1 &&
                      styles.budgetTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )
          )}
        </View>

        <Pressable
          style={styles.generateButton}
          onPress={() =>
            router.push("/(tabs)/trips")
          }
        >
          <Sparkles
            size={18}
            color="#FFFFFF"
          />

          <Text style={styles.generateText}>
            Generate My Itinerary
          </Text>
        </Pressable>
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

  empty: {
    width: 43,
  },

  hero: {
    marginTop: 25,
    padding: 22,
    borderRadius: 25,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#A7F3D0",
  },

  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  heroTitle: {
    marginTop: 14,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    color: "#064E3B",
  },

  heroText: {
    marginTop: 7,
    fontSize: 13,
    lineHeight: 20,
    color: "#047857",
  },

  label: {
    marginTop: 23,
    marginBottom: 9,
    fontSize: 13,
    fontWeight: "800",
    color: "#334155",
  },

  inputBox: {
    minHeight: 55,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#0F172A",
  },

  placeholder: {
    fontSize: 14,
    color: "#94A3B8",
  },

  travelerBox: {
    minHeight: 70,
    paddingHorizontal: 15,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  travelerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  travelerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  travelerSubtitle: {
    marginTop: 2,
    fontSize: 10,
    color: "#94A3B8",
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },

  count: {
    minWidth: 18,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  budgetRow: {
    flexDirection: "row",
    gap: 9,
  },

  budget: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  budgetActive: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },

  budgetText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },

  budgetTextActive: {
    color: "#FFFFFF",
  },

  generateButton: {
  marginTop: 30,
  height: 57,
  borderRadius: 17,
  backgroundColor: "#10B981",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 9,

  boxShadow: "0px 5px 10px rgba(16, 185, 129, 0.25)",
},

  generateText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});