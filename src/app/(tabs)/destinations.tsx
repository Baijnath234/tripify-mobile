import React, { useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { router } from "expo-router";
import { Search, Star, MapPin } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    {
        id: "tokyo",
        name: "Tokyo",
        country: "Japan",
        rating: "4.8",
        price: "₹68,000",
        image:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=85",
    },
];

export default function DestinationsScreen() {
    const [search, setSearch] = useState("");

    const filtered = destinations.filter((item) =>
        `${item.name} ${item.country}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <View style={styles.header}>
                <Text style={styles.title}>Explore</Text>

                <Text style={styles.subtitle}>
                    Find your next destination
                </Text>
            </View>

            <View style={styles.searchBox}>
                <Search size={20} color="#64748B" />

                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Search destinations..."
                    placeholderTextColor="#94A3B8"
                    style={styles.input}
                />
            </View>

            <FlatList
                data={filtered}
                numColumns={2}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Pressable
                        style={({ pressed }) => [
                            styles.card,
                            pressed && styles.cardPressed,
                        ]}
                        onPress={() =>
                            router.push({
                                pathname: "/destinations/[id]",
                                params: {
                                    id: item.id,
                                },
                            })
                        }
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />

                        <View style={styles.rating}>
                            <Star
                                size={11}
                                color="#F59E0B"
                                fill="#F59E0B"
                            />

                            <Text style={styles.ratingText}>
                                {item.rating}
                            </Text>
                        </View>

                        <View style={styles.info}>
                            <View style={styles.location}>
                                <MapPin
                                    size={12}
                                    color="#10B981"
                                />

                                <Text style={styles.country}>
                                    {item.country}
                                </Text>
                            </View>

                            <Text style={styles.name}>
                                {item.name}
                            </Text>

                            <Text style={styles.price}>
                                From {item.price}
                            </Text>
                        </View>
                    </Pressable>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 15,
    },

    title: {
        fontSize: 32,
        fontWeight: "900",
        color: "#0F172A",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14,
        color: "#64748B",
    },

    searchBox: {
        margin: 20,
        height: 55,
        borderRadius: 17,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        gap: 10,
    },

    input: {
        flex: 1,
        fontSize: 14,
        color: "#0F172A",
    },

    list: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },

    row: {
        justifyContent: "space-between",
        marginBottom: 15,
    },

    card: {
        width: "48%",
        borderRadius: 21,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    cardPressed: {
        transform: [{ scale: 0.97 }],
    },

    image: {
        width: "100%",
        height: 145,
    },

    rating: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 7,
        paddingVertical: 5,
        flexDirection: "row",
        gap: 3,
    },

    ratingText: {
        fontSize: 10,
        fontWeight: "800",
    },

    info: {
        padding: 12,
    },

    location: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },

    country: {
        fontSize: 10,
        color: "#64748B",
    },

    name: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: "800",
        color: "#0F172A",
    },

    price: {
        marginTop: 4,
        fontSize: 11,
        color: "#10B981",
        fontWeight: "700",
    },
});