import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// Confirming the font names used in your other files
const FONT_REGULAR = 'outfit-regular';
const FONT_BOLD = 'outfit-bold';

export default function LoginPage() {
  const router = useRouter();

  // State for form fields (optional, but good practice)
  // const [phone, setPhone] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Farm Products. One Bazaar.</Text>
          </View>
          
          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Login to Kisan Bazaar</Text>

            {/* Phone Input */}
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              placeholderTextColor="#90A4AE"
              // value={phone}
              // onChangeText={setPhone}
            />

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#90A4AE"
              // value={password}
              // onChangeText={setPassword}
            />

            {/* Forgot Password Link */}
            <TouchableOpacity style={styles.forgotLink}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => { /* Handle login logic here */ router.push("/home") }}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Don't have an account? */}
            <TouchableOpacity 
              onPress={() => router.replace("/signup")}
              style={styles.switchLink}
            >
              <Text style={styles.switchText}>
                Don't have an account? <Text style={styles.highlightText}>Create New Account</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E3F7DF', 
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: height * 0.1, // Push content down
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: FONT_BOLD, 
    color: '#1B5E20',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    color: '#4CAF50',
    marginTop: 5,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontFamily: FONT_BOLD,
    color: '#2E7D32',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontFamily: FONT_REGULAR,
    fontSize: 16,
    color: '#333',
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#2E7D32', 
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 4,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: FONT_BOLD,
    textAlign: 'center',
  },
  switchLink: {
    marginTop: 10,
  },
  switchText: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    color: '#555',
  },
  highlightText: {
    color: '#2E7D32',
    fontFamily: FONT_BOLD,
    textDecorationLine: 'underline',
  },
});