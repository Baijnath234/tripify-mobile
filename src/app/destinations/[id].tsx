import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";

import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Star,
  Users,
} from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function DestinationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const destinationName = id
    ? id.charAt(0).toUpperCase() + id.slice(1)
    : "Destination";

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
            }}
            style={styles.heroImage}
          />

          <LinearGradient
            colors={[
              "transparent",
              "rgba(2,6,23,0.85)",
            ]}
            style={styles.heroGradient}
          />

          <SafeAreaView
            style={styles.heroOverlay}
            edges={["top"]}
          >
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft
                size={21}
                color="#0F172A"
              />
            </Pressable>
          </SafeAreaView>

          <View style={styles.heroInfo}>
            <Text style={styles.title}>
              {destinationName}
            </Text>

            <View style={styles.location}>
              <MapPin
                size={16}
                color="#D1FAE5"
              />

              <Text style={styles.locationText}>
                Indonesia
              </Text>

              <View style={styles.divider} />

              <Star
                size={16}
                color="#FBBF24"
                fill="#FBBF24"
              />

              <Text style={styles.locationText}>
                4.8
              </Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.heading}>
            About {destinationName}
          </Text>

          <Text style={styles.description}>
            Discover beautiful beaches, incredible
            landscapes, local culture, delicious cuisine
            and unforgettable experiences. Build your own
            itinerary and explore everything this
            destination has to offer.
          </Text>

          <View style={styles.infoGrid}>
            <Info
              icon={CalendarDays}
              title="Best time"
              value="Apr - Oct"
            />

            <Info
              icon={Users}
              title="Ideal trip"
              value="5 - 10 days"
            />

            <Info
              icon={Star}
              title="Rating"
              value="4.8 / 5"
            />
          </View>

          {/* Booking */}
          <View style={styles.bookingCard}>
            <Text style={styles.estimated}>
              Estimated trip from
            </Text>

            <Text style={styles.price}>
              ₹45,000
            </Text>

            <Pressable
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/itinerary-builder",
                  params: {
                    destination: destinationName,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>
                Plan this trip
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Info({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
}) {
  return (
    <View style={styles.infoCard}>
      <Icon
        size={20}
        color="#10B981"
      />

      <Text style={styles.infoTitle}>
        {title}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  hero: {
    height: 430,
    position: "relative",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "65%",
  },

  heroOverlay: {
    position: "absolute",
    left: 20,
    right: 20,
  },

  backButton: {
    marginTop: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  heroInfo: {
    position: "absolute",
    bottom: 25,
    left: 22,
    right: 22,
  },

  title: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -1,
  },

  location: {
    marginTop: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  divider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    marginHorizontal: 4,
  },

  content: {
    padding: 22,
    paddingBottom: 35,
  },

  heading: {
    fontSize: 25,
    fontWeight: "900",
    color: "#0F172A",
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 25,
    color: "#64748B",
  },

  infoGrid: {
    flexDirection: "row",
    gap: 9,
    marginTop: 25,
  },

  infoCard: {
    flex: 1,
    padding: 12,
    minHeight: 110,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  infoTitle: {
    marginTop: 12,
    fontSize: 10,
    color: "#94A3B8",
  },

  infoValue: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
  },

  bookingCard: {
    marginTop: 25,
    padding: 20,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  estimated: {
    fontSize: 12,
    color: "#64748B",
  },

  price: {
    marginTop: 4,
    fontSize: 30,
    fontWeight: "900",
    color: "#0F172A",
  },

  button: {
    marginTop: 17,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});