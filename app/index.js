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
        <Text style={styles.slogan1}>Sab Kuch Kheti Ka...</Text>
        <Text style={styles.slogan2}>Smart Farming. Smart Earning</Text>
      </View>

      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/auth/login")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => router.push("/auth/signup")} 
        >
          <Text style={styles.signupButtonText}>Create New Account</Text>
        </TouchableOpacity>

      </View>
      
      <TouchableOpacity onPress={() => router.push("/home/home")}>
         <Text style={styles.guestText}>Continue as Guest</Text>
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
    paddingTop: 100, 
    paddingHorizontal: 30, 
  },

  logoContainer: {
    width: width * 0.60, 
    height: width * 0.60,
    backgroundColor: "#FFFFFF",
    borderRadius: (width * 0.60) / 2, 
    elevation: 12, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 45, 
  },

  logo: {
    width: "80%",
    height: "80%",
  },

  textBlock: {
    alignItems: "center",
    marginBottom: 60, 
  },

  slogan1: {
    fontSize: 22,
    fontFamily:'outfit-bold',
    color: "#1B5E20", 
    letterSpacing: 0.5,
    marginBottom: 5, 
  },
  
  slogan2: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
    color: "#4CAF50", 
    textAlign: 'center',
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25, 
  },

  loginButton: {
    width: '90%', 
    backgroundColor: "#2E7D32", 
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
  },

  signupButton: {
    width: '90%',
    backgroundColor: "transparent", 
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 2, 
    borderColor: "#4CAF50",
  },

  signupButtonText: {
    color: "#2E7D32", 
    fontSize: 18,
    fontFamily: 'outfit-regular',
    textAlign: 'center',
  },

  guestText: {
    fontSize: 14,
    color: "#2E7D32",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 15,
    fontFamily: 'outfit-regular',
  },
});