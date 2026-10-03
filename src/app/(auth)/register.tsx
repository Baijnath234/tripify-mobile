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
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Plane,
  User,
} from "lucide-react-native";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hooks";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/authSlice";

import {
  storeUser,
  storeToken,
} from "../../utils/authStorage";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [accepted, setAccepted] =
    useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const handleRegister = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      dispatch(
        loginFailure(
          "Please fill in all required fields."
        )
      );

      return;
    }

    if (!accepted) {
      dispatch(
        loginFailure(
          "Please accept the Terms & Conditions."
        )
      );

      return;
    }

    if (password !== confirmPassword) {
      dispatch(
        loginFailure(
          "Passwords do not match."
        )
      );

      return;
    }

    if (password.length < 6) {
      dispatch(
        loginFailure(
          "Password must be at least 6 characters."
        )
      );

      return;
    }

    dispatch(loginStart());

    try {
      // Temporary mock registration.
      // We will replace this with the Spring Boot API.
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      const user = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
      };

      const accessToken = "temporary-tripify-token";

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

      router.replace("/login");
    } catch (error) {
      dispatch(
        loginFailure(
          "Registration failed. Please try again."
        )
      );
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
              Create your account
            </Text>

            <Text style={styles.subtitle}>
              Start planning unforgettable journeys
            </Text>

            <View style={styles.inputWrapper}>
              <User
                size={19}
                color="#94A3B8"
              />

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />
            </View>

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

            <View style={styles.inputWrapper}>
              <Lock
                size={19}
                color="#94A3B8"
              />

              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm password"
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

            <Pressable
              style={styles.terms}
              onPress={() =>
                setAccepted(!accepted)
              }
            >
              <View
                style={[
                  styles.checkbox,
                  accepted &&
                  styles.checkboxActive,
                ]}
              >
                {accepted && (
                  <Check
                    size={14}
                    color="#FFFFFF"
                  />
                )}
              </View>

              <Text style={styles.termsText}>
                I agree to the Terms & Conditions
              </Text>
            </Pressable>

            <Pressable
              style={styles.button}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading
                  ? "Creating account..."
                  : "Create account"}
              </Text>
            </Pressable>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account?
              </Text>

              <Pressable
                onPress={() =>
                  router.push("/login")
                }
              >
                <Text style={styles.loginLink}>
                  Sign in
                </Text>
                {error && (
                  <Text style={styles.errorText}>
                    {error}
                  </Text>
                )}
              </Pressable>
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
    paddingTop: 40,
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
    marginTop: 35,
    textAlign: "center",
    fontSize: 27,
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

  terms: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  checkbox: {
    width: 21,
    height: 21,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxActive: {
    backgroundColor: "#10B981",
    borderColor: "#10B981",
  },

  termsText: {
    flex: 1,
    fontSize: 12,
    color: "#64748B",
  },

  button: {
    height: 57,
    marginTop: 25,
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

  loginRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },

  loginText: {
    fontSize: 13,
    color: "#64748B",
  },

  loginLink: {
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