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
  ChevronRight,
  Heart,
  LogOut,
  Settings,
  User,
} from "lucide-react-native";

import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";

import { logout } from "../../redux/slices/authSlice";
import { clearAuthStorage } from "../../utils/authStorage";

const menuItems = [
  {
    title: "Personal information",
    icon: User,
  },
  {
    title: "Saved destinations",
    icon: Heart,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } =
    useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await clearAuthStorage();

      dispatch(logout());

      router.replace("/login");
    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );
    }

    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Profile</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>

          <Text>
            {user?.name}
          </Text>

          <Text>
            {user?.email}
          </Text>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                12
              </Text>

              <Text style={styles.statLabel}>
                Trips
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                8
              </Text>

              <Text style={styles.statLabel}>
                Countries
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                24
              </Text>

              <Text style={styles.statLabel}>
                Saved
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Pressable
                key={item.title}
                style={styles.menuItem}
              >
                <View style={styles.menuIcon}>
                  <Icon
                    size={19}
                    color="#10B981"
                  />
                </View>

                <Text style={styles.menuTitle}>
                  {item.title}
                </Text>

                <ChevronRight
                  size={19}
                  color="#94A3B8"
                />
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={styles.logout}
          onPress={handleLogout}
        >
          <LogOut
            size={19}
            color="#EF4444"
          />

          <Text style={styles.logoutText}>
            Log out
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

  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 20,
  },

  profileCard: {
    alignItems: "center",
    padding: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#047857",
  },

  name: {
    marginTop: 12,
    fontSize: 21,
    fontWeight: "900",
    color: "#0F172A",
  },

  email: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  stats: {
    width: "100%",
    marginTop: 23,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  stat: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 19,
    fontWeight: "900",
    color: "#0F172A",
  },

  statLabel: {
    marginTop: 3,
    fontSize: 10,
    color: "#94A3B8",
  },

  separator: {
    width: 1,
    height: 30,
    backgroundColor: "#E2E8F0",
  },

  menu: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },

  menuItem: {
    minHeight: 65,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  menuTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },

  logout: {
    marginTop: 20,
    height: 55,
    borderRadius: 17,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  logoutText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#EF4444",
  },
});