import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Image,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import {
    ArrowRight,
    Bell,
    ChevronRight,
    MapPin,
    Search,
    Sparkles,
    Star,
} from "lucide-react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { testBackend } from "../../services/apiTest";

const { width } = Dimensions.get("window");

const destinations = [
    {
        id: "bali",
        name: "Bali",
        country: "Indonesia",
        rating: "4.8",
        price: "₹45,000",
        image:
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: "switzerland",
        name: "Switzerland",
        country: "Europe",
        rating: "4.9",
        price: "₹85,000",
        image:
            "https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: "paris",
        name: "Paris",
        country: "France",
        rating: "4.7",
        price: "₹72,000",
        image:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=85",
    },
];

const HomeScreen = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        testBackend()
            .then((data) => {
                console.log("SUCCESS:", data);
            })
            .catch((error) => {
                console.error("BACKEND ERROR:", error);
            });
    }, []);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: Platform.OS !== "web", }
                )}
                scrollEventThrottle={16}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.smallGreeting}>
                            Good afternoon 👋
                        </Text>

                        <Text style={styles.logo}>
                            Tripify
                            <Text style={styles.logoDot}>.</Text>
                        </Text>
                    </View>

                    <Pressable style={styles.notification}>
                        <Bell size={21} color="#0F172A" />

                        <View style={styles.notificationDot} />
                    </Pressable>
                </View>

                {/* Hero */}
                <View style={styles.heroContainer}>
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
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

                    <View style={styles.heroContent}>
                        <View style={styles.heroBadge}>
                            <Sparkles size={14} color="#FFFFFF" />

                            <Text style={styles.heroBadgeText}>
                                AI TRIP PLANNER
                            </Text>
                        </View>

                        <Text style={styles.heroTitle}>
                            Your next adventure{"\n"}
                            starts here.
                        </Text>

                        <Text style={styles.heroDescription}>
                            Discover amazing places and create your
                            perfect itinerary.
                        </Text>
                    </View>
                </View>

                {/* Search */}
                <Pressable
                    style={styles.searchBox}
                    onPress={() => router.push("/destinations")}
                >
                    <Search size={21} color="#64748B" />

                    <Text style={styles.searchText}>
                        Where do you want to go?
                    </Text>
                </Pressable>

                {/* Section */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            Popular destinations
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Places travelers love
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => router.push("/destinations")}
                    >
                        <Text style={styles.seeAll}>See all</Text>
                    </Pressable>
                </View>

                {/* Destination cards */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                >
                    {destinations.map((destination) => (
                        <Pressable
                            key={destination.id}
                            style={({ pressed }) => [
                                styles.destinationCard,
                                {
                                    transform: [
                                        {
                                            scale: pressed ? 0.97 : 1,
                                        },
                                    ],
                                },
                            ]}
                            onPress={() =>
                                router.push({
                                    pathname: "/destinations/[id]",
                                    params: {
                                        id: destination.id,
                                    },
                                })
                            }
                        >
                            <Image
                                source={{
                                    uri: destination.image,
                                }}
                                style={styles.destinationImage}
                            />

                            <LinearGradient
                                colors={[
                                    "transparent",
                                    "rgba(2,6,23,0.85)",
                                ]}
                                style={styles.cardGradient}
                            />

                            <View style={styles.ratingBadge}>
                                <Star
                                    size={12}
                                    color="#F59E0B"
                                    fill="#F59E0B"
                                />

                                <Text style={styles.ratingText}>
                                    {destination.rating}
                                </Text>
                            </View>

                            <View style={styles.destinationInfo}>
                                <View style={styles.locationRow}>
                                    <MapPin
                                        size={13}
                                        color="#D1FAE5"
                                    />

                                    <Text style={styles.country}>
                                        {destination.country}
                                    </Text>
                                </View>

                                <Text style={styles.destinationName}>
                                    {destination.name}
                                </Text>

                                <Text style={styles.price}>
                                    From {destination.price}
                                </Text>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* AI Planner Card */}
                <Pressable
                    onPress={() => router.push("/itinerary-builder")}
                >
                    <LinearGradient
                        colors={["#059669", "#10B981"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.plannerCard}
                    >
                        <View style={styles.plannerIcon}>
                            <Sparkles
                                size={22}
                                color="#FFFFFF"
                            />
                        </View>

                        <View style={styles.plannerContent}>
                            <Text style={styles.plannerTitle}>
                                Plan your perfect trip
                            </Text>

                            <Text style={styles.plannerText}>
                                Tell us where you want to go and we'll
                                help build your itinerary.
                            </Text>
                        </View>

                        <View style={styles.arrowCircle}>
                            <ArrowRight
                                size={19}
                                color="#059669"
                            />
                        </View>
                    </LinearGradient>
                </Pressable>

                {/* Travel inspiration */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>
                            Travel inspiration
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                            Get inspired for your next trip
                        </Text>
                    </View>

                    <ChevronRight
                        size={21}
                        color="#94A3B8"
                    />
                </View>

                <View style={styles.inspirationCard}>
                    <Image
                        source={{
                            uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
                        }}
                        style={styles.inspirationImage}
                    />

                    <View style={styles.inspirationContent}>
                        <Text style={styles.inspirationTitle}>
                            10 beaches you need to visit
                        </Text>

                        <Text style={styles.inspirationText}>
                            Discover some of the world's most
                            beautiful coastal escapes.
                        </Text>

                        <Text style={styles.readMore}>
                            Read guide →
                        </Text>
                    </View>
                </View>
            </Animated.ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 12,
        paddingBottom: 20,
    },

    smallGreeting: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 3,
    },

    logo: {
        fontSize: 28,
        fontWeight: "900",
        color: "#0F172A",
        letterSpacing: -1,
    },

    logoDot: {
        color: "#10B981",
    },

    notification: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    notificationDot: {
        position: "absolute",
        top: 9,
        right: 10,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#10B981",
    },

    heroContainer: {
        height: 360,
        borderRadius: 28,
        overflow: "hidden",
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
        height: "70%",
    },

    heroContent: {
        position: "absolute",
        left: 22,
        right: 22,
        bottom: 25,
    },

    heroBadge: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: "rgba(16,185,129,0.9)",
        marginBottom: 12,
    },

    heroBadgeText: {
        fontSize: 10,
        fontWeight: "800",
        color: "#FFFFFF",
    },

    heroTitle: {
        fontSize: 34,
        lineHeight: 38,
        fontWeight: "900",
        color: "#FFFFFF",
        letterSpacing: -0.8,
    },

    heroDescription: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 21,
        color: "#E2E8F0",
    },

    searchBox: {
        height: 58,
        marginTop: -29,
        marginHorizontal: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        gap: 12,

        boxShadow: "0px 7px 15px rgba(15, 23, 42, 0.12)",
    },

    searchText: {
        fontSize: 14,
        color: "#94A3B8",
    },

    sectionHeader: {
        marginTop: 32,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    sectionTitle: {
        fontSize: 21,
        fontWeight: "800",
        color: "#0F172A",
    },

    sectionSubtitle: {
        marginTop: 3,
        fontSize: 13,
        color: "#64748B",
    },

    seeAll: {
        fontSize: 13,
        fontWeight: "700",
        color: "#059669",
    },

    horizontalList: {
        gap: 15,
        paddingRight: 20,
    },

    destinationCard: {
        width: width * 0.67,
        height: 300,
        borderRadius: 25,
        overflow: "hidden",
        backgroundColor: "#E2E8F0",
    },

    destinationImage: {
        width: "100%",
        height: "100%",
    },

    cardGradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "65%",
    },

    ratingBadge: {
        position: "absolute",
        top: 14,
        right: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 15,
    },

    ratingText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#0F172A",
    },

    destinationInfo: {
        position: "absolute",
        left: 18,
        right: 18,
        bottom: 18,
    },

    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    country: {
        fontSize: 11,
        color: "#D1FAE5",
    },

    destinationName: {
        marginTop: 3,
        fontSize: 26,
        fontWeight: "900",
        color: "#FFFFFF",
    },

    price: {
        marginTop: 4,
        fontSize: 12,
        color: "#E2E8F0",
    },

    plannerCard: {
        marginTop: 28,
        padding: 18,
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
    },

    plannerIcon: {
        width: 46,
        height: 46,
        borderRadius: 15,
        backgroundColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
    },

    plannerContent: {
        flex: 1,
        marginLeft: 13,
        marginRight: 10,
    },

    plannerTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#FFFFFF",
    },

    plannerText: {
        marginTop: 4,
        fontSize: 11,
        lineHeight: 17,
        color: "#D1FAE5",
    },

    arrowCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    inspirationCard: {
        borderRadius: 23,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    inspirationImage: {
        width: "100%",
        height: 170,
    },

    inspirationContent: {
        padding: 17,
    },

    inspirationTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0F172A",
    },

    inspirationText: {
        marginTop: 7,
        fontSize: 13,
        lineHeight: 20,
        color: "#64748B",
    },

    readMore: {
        marginTop: 12,
        fontSize: 13,
        fontWeight: "800",
        color: "#059669",
    },
});

export default HomeScreen;