import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// Confirming the font names used in your other files
const FONT_REGULAR = 'outfit-regular';
const FONT_BOLD = 'outfit-bold';

export default function SignupPage() {
  const router = useRouter();

  // State for form fields (optional)
  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [email, setEmail] = useState('');
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
            <Text style={styles.title}>Join the Movement</Text>
            <Text style={styles.subtitle}>India’s Farm Marketplace🌾</Text>
          </View>
          
          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Create Your Kisan Bazaar Account</Text>

            {/* Name Input */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              keyboardType="default"
              placeholderTextColor="#90A4AE"
              // value={name}
              // onChangeText={setName}
            />

            {/* Phone Input */}
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              placeholderTextColor="#90A4AE"
              // value={phone}
              // onChangeText={setPhone}
            />

            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="Email (Optional)"
              keyboardType="email-address"
              placeholderTextColor="#90A4AE"
              // value={email}
              // onChangeText={setEmail}
            />

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Choose a Password"
              secureTextEntry={true}
              placeholderTextColor="#90A4AE"
              // value={password}
              // onChangeText={setPassword}
            />

            {/* Sign Up Button (Slightly different green for visual distinction) */}
            <TouchableOpacity 
              style={styles.signupButton}
              onPress={() => { /* Handle signup logic here */ router.replace("/home") }}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Already have an account? */}
            <TouchableOpacity 
              onPress={() => router.replace("/login")}
              style={styles.switchLink}
            >
              <Text style={styles.switchText}>
                Already have an account? <Text style={styles.highlightText}>Login Here</Text>
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// NOTE: Styles are largely shared with Login but defined here for simplicity.

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E3F7DF', 
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: Dimensions.get('window').height * 0.1, 
    paddingBottom: 40, // Add bottom padding for scroll space
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
  signupButton: {
    width: '100%',
    backgroundColor: '#4CAF50', // Use a medium green for signup
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 4,
    marginTop: 10,
    marginBottom: 20,
  },
  signupButtonText: {
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