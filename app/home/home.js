import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'; 

// --- Constants ---
const { width } = Dimensions.get('window');
const FONT_REGULAR = 'outfit-regular'; 
const FONT_BOLD = 'outfit-bold';
const ACCENT_COLOR = '#2E7D32';     // Primary Dark Green
const BG_COLOR = '#E3F7DF';         // Light Green Background
const WARNING_COLOR = '#FFB300';    // Orange/Yellow for Requirements
const MARKET_BLUE = '#00BCD4';      // Cyan for Mandi/Analytics

// --- Placeholder Data ---
const mandiPrice = { crop: 'Wheat (गेहूं)', price: '₹2,350/quintal', change: '+1.5%', city: 'Pune' };
const activeRequests = [
    { id: 1, crop: 'Onion', qty: '500 kg', location: 'Nagpur', time: '1 hr ago' },
    { id: 2, crop: 'Tomato', qty: '2 ton', location: 'Nashik', time: '3 hrs ago' },
];

const categories = [
    { name: 'Crops', icon: '🌾', route: '/market/crops' },
    { name: 'Machinery', icon: '🚜', route: '/market/machinery' },
    { name: 'Transport/Rent', icon: '🚚', route: '/market/services' },
    { name: 'Weather & Alerts', icon: '☀️', route: '/tools/weather' },
    { name: 'Buy/Sell Land', icon: '🏞️', route: '/market/land' },
    { name: 'Govt. Schemes', icon: '📜', route: '/tools/govt-schemes' },
];

const marketSnapshot = [
    { name: 'Onion', price: '₹1,500/Q', change: '+2.1%' },
    { name: 'Cotton', price: '₹7,200/Q', change: '-0.5%' },
    { name: 'Maize', price: '₹2,050/Q', change: '+0.1%' },
    { name: 'Wheat', price: '₹2,350/Q', change: '+1.5%' },
];


// --- Main Component ---
export default function HomeScreen() {
    const router = useRouter();
    const [userLocation, setUserLocation] = useState('Fetching location...');
    const [isLocationLoading, setIsLocationLoading] = useState(true);

    useEffect(() => {
        fetchUserLocation();
    }, []);

    const fetchUserLocation = async () => {
        setIsLocationLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setUserLocation('Location access denied. Tap to retry.');
            setIsLocationLoading(false);
            return;
        }

        try {
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
            let geocode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (geocode && geocode.length > 0) {
                const city = geocode[0].city || geocode[0].subregion || 'City';
                const state = geocode[0].region || 'State';
                setUserLocation(`${city}, ${state}`);
            } else {
                setUserLocation('Location found, naming failed.');
            }

        } catch (error) {
            setUserLocation('Tap to re-fetch location.');
        } finally {
            setIsLocationLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                
                {/* 1. Header (Top Bar) */}
                <View style={styles.header}>
                    <Text style={styles.appName}>Kisan Bazaar</Text>
                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.actionIcon} onPress={() => {/* Language switch */}}>
                            <Text style={{fontSize: 16, fontFamily: FONT_BOLD, color: ACCENT_COLOR}}>HI/EN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/notifications')}>
                            <Text style={{fontSize: 22, color: ACCENT_COLOR}}>🔔</Text> 
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search / Quick Post */}
                <View style={styles.searchPostContainer}>
                    <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/search')}>
                        <Text style={{fontSize: 20, color: '#666', marginRight: 10}}>🔍</Text>
                        <Text style={styles.searchInputText}>Search crops, tractors, seeds...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.postButton}
                        onPress={() => router.push('/add-listing')}
                    >
                        <Text style={styles.postButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Location & Mandi Price (Main Widget) */}
                <TouchableOpacity style={styles.locationMandiCard} onPress={isLocationLoading ? null : fetchUserLocation}>
                    <View style={styles.locationBlock}>
                        <Text style={styles.locationLabel}>Market City:</Text>
                        <View style={styles.locationRow}>
                            <Text style={styles.locationText}>
                                📍 {userLocation}
                            </Text>
                            {isLocationLoading && <ActivityIndicator size="small" color={ACCENT_COLOR} style={{ marginLeft: 5 }} />}
                        </View>
                    </View>
                    <TouchableOpacity style={styles.mandiWidget} onPress={() => router.push('/mandi-prices')}>
                        <Text style={styles.mandiPriceText}>{mandiPrice.price}</Text>
                        <Text style={[styles.mandiChangeText, { color: mandiPrice.change.startsWith('+') ? '#388E3C' : '#D32F2F' }]}>
                            {mandiPrice.change}
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>

                {/* Categories Grid (6 Categories) */}
                <Text style={styles.sectionTitle}>Explore Marketplaces & Tools</Text>
                <View style={styles.categoryContainer}>
                    {categories.map((cat) => (
                        <TouchableOpacity key={cat.name} style={styles.categoryItem} onPress={() => router.push(cat.route)}>
                            <View style={styles.categoryIconCircle}>
                                <Text style={{fontSize: 32}}>{cat.icon}</Text>
                            </View>
                            <Text style={styles.categoryText}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                {/* Active Buyer Requests (Horizontal Carousel/Stacked) */}
                <Text style={styles.sectionTitle}>Active Buyer Requests</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {activeRequests.map(req => (
                        <TouchableOpacity key={req.id} style={styles.requestCard} onPress={() => router.push('/requests')}>
                            <Text style={styles.requestCrop}>{req.crop} Needed</Text>
                            <Text style={styles.requestDetail}>{req.qty} in {req.location}</Text>
                            <Text style={styles.requestTime}>{req.time}</Text>
                            <View style={styles.requestButton}>
                                <Text style={styles.requestButtonText}>Respond →</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Live Market Snapshot (Horizontal Scroll) */}
                <Text style={styles.sectionTitle}>Live Market Snapshot</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                    {marketSnapshot.map(item => (
                        <TouchableOpacity 
                            key={item.name} 
                            style={styles.priceCard} 
                            onPress={() => router.push(`/mandi-prices/${item.name.toLowerCase()}`)}
                        >
                            <Text style={styles.priceCropName}>{item.name}</Text>
                            <Text style={styles.priceValue}>{item.price}</Text>
                            <Text style={[
                                styles.priceChange, 
                                { color: item.change.startsWith('+') ? '#388E3C' : '#D32F2F' }
                            ]}>
                                {item.change}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                
            </ScrollView>
        </SafeAreaView>
    );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    // INCREASED paddingBottom for better use of space
    scrollContainer: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 60, // Main padding at the bottom of the entire scroll view
    },
    
    // 1. Header (Top Bar)
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        marginBottom: 10,
    },
    appName: {
        fontSize: 20,
        fontFamily: FONT_BOLD,
        color: ACCENT_COLOR,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIcon: {
        padding: 5,
        marginRight: 10,
    },
    notificationButton: {
        padding: 5,
    },
    
    // Search / Quick Post
    searchPostContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginRight: 10,
    },
    searchInputText: {
        fontFamily: FONT_REGULAR,
        fontSize: 16,
        color: '#666',
    },
    postButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: WARNING_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    postButtonText: {
        color: '#fff',
        fontSize: 24,
        fontFamily: FONT_BOLD,
        lineHeight: Platform.OS === 'ios' ? 28 : 28, 
    },
    
    // Location & Mandi Price
    locationMandiCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 18, 
        marginBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftWidth: 4,
        borderColor: ACCENT_COLOR,
        elevation: 2,
    },
    locationBlock: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 13, 
        fontFamily: FONT_REGULAR,
        color: '#555', 
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 18, 
        fontFamily: FONT_BOLD,
        color: ACCENT_COLOR,
    },
    mandiWidget: {
        alignItems: 'flex-end',
        paddingLeft: 15,
    },
    mandiPriceText: {
        fontSize: 20, 
        fontFamily: FONT_BOLD,
        color: MARKET_BLUE,
    },
    mandiChangeText: {
        fontSize: 13, 
        fontFamily: FONT_REGULAR,
        marginTop: 2,
    },

    // Global Sections
    sectionTitle: {
        fontSize: 19, 
        fontFamily: FONT_BOLD,
        color: ACCENT_COLOR,
        marginBottom: 15,
    },
    // *** ADJUSTMENT HERE ***
    horizontalScroll: {
        marginBottom: 0, // Set margin to 0 for a seamless end
    },
    
    // Categories Grid (3-column layout)
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    categoryItem: {
        width: (width - 45) / 3.2, 
        alignItems: 'center',
        marginBottom: 15, 
    },
    categoryIconCircle: {
        width: 65, 
        height: 65,
        borderRadius: 32.5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },
    categoryText: {
        fontSize: 12, 
        fontFamily: FONT_BOLD, 
        color: '#333',
        textAlign: 'center',
    },

    // Live Market Snapshot Card Styles
    priceCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 14, 
        marginRight: 10,
        width: width * 0.35, 
        borderLeftWidth: 4, 
        borderColor: MARKET_BLUE,
        elevation: 3,
    },
    priceCropName: {
        fontSize: 15, 
        fontFamily: FONT_BOLD, 
        color: '#333',
        marginBottom: 2,
    },
    priceValue: {
        fontSize: 20, 
        fontFamily: FONT_BOLD,
        color: ACCENT_COLOR,
    },
    priceChange: {
        fontSize: 13, 
        fontFamily: FONT_BOLD,
        marginTop: 5,
    },

    // Active Buyer Requests
    requestCard: {
        backgroundColor: WARNING_COLOR + '20', 
        borderRadius: 10,
        padding: 15, 
        marginRight: 15, 
        width: width * 0.55, 
        borderLeftWidth: 4, 
        borderColor: WARNING_COLOR,
marginBottom:15
    },
    requestCrop: {
        fontSize: 18, 
        fontFamily: FONT_BOLD,
        color: ACCENT_COLOR,
    },
    requestDetail: {
        fontSize: 14, 
        fontFamily: FONT_REGULAR,
        color: '#555',
        marginTop: 2,
    },
    requestTime: {
        fontSize: 12, 
        fontFamily: FONT_REGULAR,
        color: '#999',
        alignSelf: 'flex-end',
    },
    requestButton: {
        marginTop: 5,
        alignSelf: 'flex-start',
    },
    requestButtonText: {
        fontSize: 14, 
        fontFamily: FONT_BOLD,
        color: WARNING_COLOR,
        textDecorationLine: 'underline',
    },
});