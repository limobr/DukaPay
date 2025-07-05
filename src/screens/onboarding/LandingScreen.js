import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = (width - 60) / 2; // For 2x2 grid with padding

const LandingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient
          colors={['#7C3AED', '#5B21B6']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.headerTitle}>DukaPay</Text>
          <Text style={styles.headerSubtitle}>Smart POS for Kenyan Businesses</Text>
        </LinearGradient>

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={[styles.navButton, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, styles.signupButton]}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupButtonText}>Sign Up Free</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Run Your Shop Like a Pro</Text>
          <Text style={styles.heroText}>
            All-in-one POS solution for Kenyan stores, groceries, and wines & spirits shops. 
            Manage inventory, track sales, and accept M-Pesa payments with one app.
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3,000+</Text>
              <Text style={styles.statLabel}>Businesses</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>99%</Text>
              <Text style={styles.statLabel}>Uptime</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>
        </View>

        {/* Business Types Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfect for Your Business</Text>
          <Text style={styles.sectionText}>
            Designed for Kenyan retailers of all types
          </Text>
          <View style={styles.imageGrid}>
            {[
              { image: require('../../../assets/images/cereals.jpg'), caption: 'Grocery' },
              { image: require('../../../assets/images/fruitsandvegetables.jpg'), caption: 'Fresh Produce' },
              { image: require('../../../assets/images/shoeshop.jpg'), caption: 'Fashion Retail' },
              { image: require('../../../assets/images/winesspirits.jpg'), caption: 'Wines & Spirits' }
            ].map((item, index) => (
              <ImageBackground
                key={index}
                source={item.image}
                style={styles.imageContainer}
                imageStyle={styles.image}
              >
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.imageOverlay}
                >
                  <Text style={styles.imageCaption}>{item.caption}</Text>
                </LinearGradient>
              </ImageBackground>
            ))}
          </View>
        </View>

        {/* Pricing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Simple, Transparent Pricing</Text>
          <Text style={styles.sectionText}>No hidden fees. Cancel anytime.</Text>
          
          <View style={styles.pricingContainer}>
            {/* Basic Plan */}
            <View style={[styles.pricingCard, styles.basicCard]}>
              <Text style={styles.planTitle}>Duka Starter</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currency}>KSh</Text>
                <Text style={styles.planPrice}>2,500</Text>
                <Text style={styles.planPeriod}>/month</Text>
              </View>
              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>1 Store Location</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Unlimited Products</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Offline Mode</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Basic Receipts</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="cancel" size={18} color="#EF4444" />
                  <Text style={[styles.planFeature, styles.disabledFeature]}>Sales Reports</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.planButton, styles.basicButton]}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.planButtonText}>Start Free Trial</Text>
              </TouchableOpacity>
            </View>
            
            {/* Pro Plan */}
            <View style={[styles.pricingCard, styles.proCard]}>
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
              <Text style={styles.planTitle}>Duka Pro</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currency}>KSh</Text>
                <Text style={styles.planPrice}>5,000</Text>
                <Text style={styles.planPeriod}>/month</Text>
              </View>
              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>3 Store Locations</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Sales Analytics</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Loyalty Program</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Staff Accounts</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>WhatsApp Alerts</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.planButton, styles.proButton]}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.planButtonText}>Get Duka Pro</Text>
              </TouchableOpacity>
            </View>
            
            {/* Enterprise Plan */}
            <View style={[styles.pricingCard, styles.enterpriseCard]}>
              <Text style={styles.planTitle}>Enterprise</Text>
              <View style={[styles.priceContainer, {marginBottom: 10}]}>
                <Text style={styles.enterprisePrice}>Custom Pricing</Text>
              </View>
              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Unlimited Locations</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Custom Branding</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>API Access</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Dedicated Support</Text>
                </View>
                <View style={styles.featureItem}>
                  <Icon name="check-circle" size={18} color="#10B981" />
                  <Text style={styles.planFeature}>Onboarding Training</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={[styles.planButton, styles.enterpriseButton]}
                onPress={() => alert('Contact our sales team')}
              >
                <Text style={styles.planButtonText}>Contact Sales</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Transform Your Business?</Text>
          <Text style={styles.ctaText}>
            Join thousands of Kenyan businesses using DukaPay to increase sales and 
            streamline operations
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.ctaButtonText}>Start Free 14-Day Trial</Text>
            <Icon name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.ctaNote}>No credit card required</Text>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>We're Here to Help</Text>
          <View style={styles.contactMethods}>
            <View style={styles.contactItem}>
              <Icon name="email" size={24} color="#7C3AED" />
              <Text style={styles.contactText}>support@dukapay.co.ke</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="phone" size={24} color="#7C3AED" />
              <Text style={styles.contactText}>+254 700 123 456</Text>
            </View>
            <View style={styles.contactItem}>
              <Icon name="location-on" size={24} color="#7C3AED" />
              <Text style={styles.contactText}>Nairobi, Kenya</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Chat with Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E9D5FF',
    textAlign: 'center',
    marginTop: 5,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  navButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  signupButton: {
    backgroundColor: '#7C3AED',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C3AED',
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  heroSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 15,
    textAlign: 'center',
    lineHeight: 34,
  },
  heroText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EDE9FE',
    borderRadius: 16,
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7C3AED',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#5B21B6',
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  imageCaption: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pricingContainer: {
    marginTop: 10,
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  basicCard: {
    borderTopWidth: 4,
    borderTopColor: '#8B5CF6',
  },
  proCard: {
    borderTopWidth: 4,
    borderTopColor: '#F59E0B',
    position: 'relative',
  },
  enterpriseCard: {
    borderTopWidth: 4,
    borderTopColor: '#7C3AED',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  currency: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7C3AED',
    marginRight: 4,
  },
  planPrice: {
    fontSize: 36,
    fontWeight: '800',
    color: '#7C3AED',
  },
  planPeriod: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  enterprisePrice: {
    fontSize: 24,
    fontWeight: '700',
    color: '#7C3AED',
    textAlign: 'center',
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  planFeature: {
    fontSize: 15,
    color: '#374151',
    marginLeft: 10,
    flex: 1,
  },
  disabledFeature: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  planButton: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  basicButton: {
    backgroundColor: '#EDE9FE',
  },
  proButton: {
    backgroundColor: '#FEF3C7',
  },
  enterpriseButton: {
    backgroundColor: '#EDE9FE',
  },
  planButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  ctaSection: {
    backgroundColor: '#7C3AED',
    padding: 30,
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 16,
    color: '#E9D5FF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  ctaButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  ctaNote: {
    color: '#C4B5FD',
    marginTop: 15,
    fontSize: 14,
  },
  contactSection: {
    paddingHorizontal: 20,
  },
  contactMethods: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    color: '#4B5563',
    marginLeft: 15,
  },
  contactButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LandingScreen;