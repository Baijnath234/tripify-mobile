import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Plane,
} from "lucide-react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";
import {
  storeUser,
  storeToken,
} from "../../utils/authStorage";

import { loginApi } from "../../services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(
    (state) => state.auth
  );


  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      dispatch(
        loginFailure("Email and password are required.")
      );

      return;
    }

    dispatch(loginStart());

    try {
      const response = await loginApi({
        email: email.trim(),
        password,
      });

      const { user, accessToken } = response;

      // Persist authentication session
      await storeUser(JSON.stringify(user));
      await storeToken(accessToken);

      // Update Redux
      dispatch(
        loginSuccess({
          user,
          accessToken,
        })
      );

      console.log("LOGIN SUCCESS:", user);

      router.replace("/");
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to login. Please check your email and password.";

      dispatch(loginFailure(message));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}
        >
          <LinearGradient
            colors={[
              "#ECFDF5",
              "#FFFFFF",
              "#F8FAFC",
            ]}
            style={styles.container}
          >
            <View style={styles.logoCircle}>
              <Plane
                size={27}
                color="#10B981"
              />
            </View>

            <Text style={styles.logo}>
              Tripify
              <Text style={styles.dot}>.</Text>
            </Text>

            <Text style={styles.title}>
              Welcome back
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue your journey
            </Text>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <Mail
                size={19}
                color="#94A3B8"
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email address"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Lock
                size={19}
                color="#94A3B8"
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                style={styles.input}
              />

              <Pressable
                onPress={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={19}
                    color="#64748B"
                  />
                ) : (
                  <Eye
                    size={19}
                    color="#64748B"
                  />
                )}
              </Pressable>
            </View>

            <Pressable style={styles.forgot}>
              <Text style={styles.forgotText}>
                Forgot password?
              </Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Text>
            </Pressable>

            <View style={styles.registerRow}>
              <Text style={styles.registerText}>
                Don't have an account?
              </Text>

              <Pressable
                onPress={() =>
                  router.push("/register")
                }
              >
                <Text style={styles.registerLink}>
                  Create account
                </Text>
              </Pressable>
              {error && (
                <Text style={styles.errorText}>
                  {error}
                </Text>
              )}
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  flex: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 35,
  },

  logoCircle: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },

  logo: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
  },

  dot: {
    color: "#10B981",
  },

  title: {
    marginTop: 45,
    textAlign: "center",
    fontSize: 29,
    fontWeight: "900",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 7,
    textAlign: "center",
    fontSize: 14,
    color: "#64748B",
  },

  inputWrapper: {
    height: 57,
    marginTop: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#0F172A",
  },

  forgot: {
    alignSelf: "flex-end",
    marginTop: 11,
  },

  forgotText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#059669",
  },

  button: {
    height: 57,
    marginTop: 24,
    borderRadius: 16,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  registerRow: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },

  registerText: {
    fontSize: 13,
    color: "#64748B",
  },

  registerLink: {
    fontSize: 13,
    fontWeight: "800",
    color: "#059669",
  },

  errorText: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#DC2626",
  },
});