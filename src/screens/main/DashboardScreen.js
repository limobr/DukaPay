import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const ICON_SIZE = 32;
const NAV_HEIGHT = 70;

const DashboardScreen = () => {
  const [selectedSection, setSelectedSection] = useState('Home');
  const scales = {
    Home: useRef(new Animated.Value(1.2)).current, // Home starts scaled
    Products: useRef(new Animated.Value(1)).current,
    Reports: useRef(new Animated.Value(1)).current,
    Settings: useRef(new Animated.Value(1)).current,
    Accounts: useRef(new Animated.Value(1)).current,
  };
  const translateYs = {
    Home: useRef(new Animated.Value(-10)).current, // Home starts raised
    Products: useRef(new Animated.Value(0)).current,
    Reports: useRef(new Animated.Value(0)).current,
    Settings: useRef(new Animated.Value(0)).current,
    Accounts: useRef(new Animated.Value(0)).current,
  };

  const handlePress = (section) => {
    Object.keys(scales).forEach((key) => {
      Animated.timing(scales[key], {
        toValue: key === section ? 1.2 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateYs[key], {
        toValue: key === section ? -10 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
    setSelectedSection(section);
  };

  const renderNavItem = (section, icon) => {
    const animatedStyle = {
      transform: [
        { scale: scales[section] },
        { translateY: translateYs[section] },
      ],
    };

    return (
      <TouchableOpacity
        key={section}
        style={styles.navItem}
        onPress={() => handlePress(section)}
      >
        <Animated.View style={[styles.iconContainer, animatedStyle, selectedSection === section && styles.iconContainerActive]}>
          <Icon
            name={icon}
            size={ICON_SIZE}
            color={selectedSection === section ? '#7C3AED' : '#4B5563'}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'Home':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Home</Text>
            <Text style={styles.contentText}>Welcome to your DukaPay dashboard! Monitor your shop's performance here.</Text>
          </View>
        );
      case 'Products':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Products</Text>
            <Text style={styles.contentText}>Manage your inventory and product categories here.</Text>
            <TouchableOpacity style={styles.actionButton} onPress={() => alert('View product details (coming soon)')}>
              <Text style={styles.actionButtonText}>View Product Details</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Reports':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Reports</Text>
            <Text style={styles.contentText}>View sales reports and business insights here.</Text>
          </View>
        );
      case 'Settings':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Settings</Text>
            <Text style={styles.contentText}>Configure your shop settings and M-Pesa integration here.</Text>
          </View>
        );
      case 'Accounts':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Accounts</Text>
            <Text style={styles.contentText}>Manage user accounts and permissions here.</Text>
          </View>
        );
      default:
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>Home</Text>
            <Text style={styles.contentText}>Welcome to your DukaPay dashboard! Monitor your shop's performance here.</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        {renderContent()}
      </View>
      <View style={styles.navBar}>
        {[
          { section: 'Home', icon: 'home' },
          { section: 'Products', icon: 'inventory' },
          { section: 'Reports', icon: 'bar-chart' },
          { section: 'Settings', icon: 'settings' },
          { section: 'Accounts', icon: 'account-circle' },
        ].map(({ section, icon }) => renderNavItem(section, icon))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 48,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  contentText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: NAV_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: 12,
    padding: 8,
  },
  iconContainerActive: {
    backgroundColor: '#EDE9FE',
  },
});

export default DashboardScreen;