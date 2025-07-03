import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LandingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>DukaPay</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.headerButtonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Run Your Duka Smarter</Text>
          <Text style={styles.heroSubtitle}>Kenya's #1 offline-first POS for retailers & groceries</Text>
          <View style={styles.heroCtaGroup}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.primaryButtonText}>Start Free Trial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Icon name="play-circle-outline" size={20} color="#fff" />
              <Text style={styles.secondaryButtonText}>See How It Works</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.trustBadges}>
            <Text style={styles.trustBadge}>✓ 3,000+ Kenyan Businesses</Text>
            <Text style={styles.trustBadge}>✓ 99% Uptime Guarantee</Text>
          </View>
          <Image
            source={{ uri: 'https://via.placeholder.com/300x200?text=App+Interface' }}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Value Proposition Section */}
        <View style={styles.section}>
          <View style={styles.card}>
            <Icon name="phone-android" size={40} color="#333" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>No Internet? No Problem</Text>
            <Text style={styles.cardText}>Keep selling during blackouts with offline-first technology.</Text>
          </View>
          <View style={[styles.card, styles.highlightCard]}>
            <Icon name="receipt" size={40} color="#333" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Instant Receipts</Text>
            <Text style={styles.cardText}>Print with any ESC/POS printer (Epson, Sunmi).</Text>
          </View>
          <View style={styles.card}>
            <Icon name="bar-chart" size={40} color="#333" style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Know Your Business</Text>
            <Text style={styles.cardText}>Track best-sellers, stock levels & daily profits.</Text>
          </View>
        </View>

        {/* Pricing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transparent Pricing</Text>
          <Text style={styles.sectionSubtitle}>14-day free trial • Cancel anytime</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Duka Starter</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.cardPrice}>KSh 2,500</Text>
              <Text style={styles.cardPriceUnit}>/month</Text>
            </View>
            <View style={styles.cardList}>
              <Text style={styles.cardListItem}>✓ 1 Store Location</Text>
              <Text style={styles.cardListItem}>✓ Unlimited Products</Text>
              <Text style={styles.cardListItem}>✓ Offline Mode</Text>
              <Text style={styles.cardListItemDisabled}>✗ Sales Reports</Text>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.primaryButtonText}>Start Free Trial</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, styles.highlightCard, { position: 'relative' }]}>
            <Text style={styles.badge}>MOST POPULAR</Text>
            <Text style={styles.cardTitle}>Duka Pro</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.cardPrice}>KSh 5,000</Text>
              <Text style={styles.cardPriceUnit}>/month</Text>
            </View>
            <View style={styles.cardList}>
              <Text style={styles.cardListItem}>✓ 3 Store Locations</Text>
              <Text style={styles.cardListItem}>✓ Sales Analytics</Text>
              <Text style={styles.cardListItem}>✓ Loyalty Program</Text>
              <Text style={styles.cardListItem}>✓ Staff Permissions</Text>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.primaryButtonText}>Try Pro Free</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Final CTA */}
        <View style={styles.finalCta}>
          <Text style={styles.sectionTitle}>Ready to Grow Your Duka?</Text>
          <Text style={styles.sectionSubtitle}>Join 3,000+ shops using DukaPay</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.primaryButtonText}>Start Free 14-Day Trial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: { fontSize: 24, fontWeight: '700', color: '#7C3AED' },
  headerButtons: { flexDirection: 'row', alignItems: 'center' },
  headerButton: { padding: 8 },
  headerButtonText: { color: '#7C3AED', fontWeight: '600' },
  primaryButton: { backgroundColor: '#7C3AED', padding: 12, borderRadius: 6 },
  primaryButtonText: { color: '#FFFFFF', fontWeight: '600', textAlign: 'center' },
  scrollContainer: { flex: 1 },
  scrollContent: { paddingTop: 80 },
  hero: { backgroundColor: '#4C1D95', padding: 24 },
  heroTitle: { fontSize: 30, fontWeight: '700', color: '#FFFFFF', textAlign: 'center', marginBottom: 16 },
  heroSubtitle: { fontSize: 18, color: '#FFFFFF', textAlign: 'center', marginBottom: 24 },
  heroCtaGroup: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  secondaryButton: { borderWidth: 1, borderColor: '#FFFFFF', padding: 12, borderRadius: 6, flexDirection: 'row', alignItems: 'center' },
  secondaryButtonText: { color: '#FFFFFF', marginLeft: 8 },
  trustBadges: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24 },
  trustBadge: { color: '#FFFFFF', fontSize: 14, marginHorizontal: 8 },
  heroImage: { width: '100%', height: 192, borderRadius: 8 },
  section: { padding: 24, backgroundColor: '#FFFFFF' },
  sectionTitle: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 16 },
  sectionSubtitle: { fontSize: 16, color: '#4B5563', textAlign: 'center', marginBottom: 16 },
  card: { backgroundColor: '#F9FAFB', padding: 16, borderRadius: 8, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  highlightCard: { borderWidth: 2, borderColor: '#7C3AED', backgroundColor: '#F3E8FF' },
  cardIcon: { alignSelf: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  cardText: { color: '#4B5563', textAlign: 'center' },
  priceContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', marginBottom: 8 },
  cardPrice: { fontSize: 24, fontWeight: '700', color: '#000000' },
  cardPriceUnit: { fontSize: 16, color: '#4B5563', marginLeft: 4 },
  cardList: { marginBottom: 16 },
  cardListItem: { color: '#4B5563' },
  cardListItemDisabled: { color: '#9CA3AF' },
  badge: {
    position: 'absolute',
    top: -16,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#7C3AED',
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    fontSize: 12,
  },
  finalCta: { padding: 24, backgroundColor: '#7C3AED' },
});