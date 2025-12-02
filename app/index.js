import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useRouter } from "expo-router";

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.title}>KisanBazaar</Text>
        <Text style={styles.subtitle}>Sab Kuch Kheti Ka 🌾</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>

    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F7DF", 
    alignItems: "center",
    paddingTop: 120,
  },

  logoContainer: {
    width: width * 0.55,
    height: width * 0.55,
    backgroundColor: "#FFFFFF",
    borderRadius: width * 0.30,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: "80%",
    height: "80%",
  },

  textBlock: {
    alignItems: "center",
    marginBottom: 40,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1B5E20",
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: "#4CAF50",
  },

  button: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 15,
    elevation: 4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  loginText: {
    fontSize: 14,
    color: "#1B5E20",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
