import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeContent from './HomeContent';
import ProductsContent from './ProductsContent';

const { width } = Dimensions.get('window');
const ICON_SIZE = 32;
const NAV_HEIGHT = 70;

const DashboardScreen = ({ route }) => {
  const [selectedSection, setSelectedSection] = useState('Home');
  const userType = route.params?.userType || 'employee'; // Default to employee if not provided
  const translateX = useRef(new Animated.Value(0)).current;
  const prevSectionRef = useRef('Home');

  // Define role-based sections
  const getSections = (role) => {
    return role === 'admin'
      ? ['Home', 'Products', 'Reports', 'Settings', 'Accounts']
      : ['Home', 'Products'];
  };

  const sections = getSections(userType);
  const scales = sections.reduce((acc, section) => ({
    ...acc,
    [section]: useRef(new Animated.Value(section === 'Home' ? 1.2 : 1)).current,
  }), {});
  const translateYs = sections.reduce((acc, section) => ({
    ...acc,
    [section]: useRef(new Animated.Value(section === 'Home' ? -10 : 0)).current,
  }), {});

  const handlePress = (section) => {
    const prevIndex = sections.indexOf(prevSectionRef.current);
    const newIndex = sections.indexOf(section);
    const direction = newIndex > prevIndex ? -width : width;

    Animated.sequence([
      Animated.timing(translateX, {
        toValue: direction,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -direction,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

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
    prevSectionRef.current = section;
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
        return <HomeContent />;
      case 'Products':
        return <ProductsContent />;
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
        return <HomeContent />;
    }
  };

  // Capitalize userType for display (admin -> Admin, employee -> Employee)
  const headerTitle = `${userType.charAt(0).toUpperCase() + userType.slice(1)} | DukaPay`;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{headerTitle}</Text>
      </View>
      <View style={styles.content}>
        <Animated.View style={[styles.contentWrapper, { transform: [{ translateX }] }]}>
          {renderContent()}
        </Animated.View>
      </View>
      <View style={styles.navBar}>
        {[
          { section: 'Home', icon: 'home' },
          { section: 'Products', icon: 'inventory' },
          { section: 'Reports', icon: 'bar-chart' },
          { section: 'Settings', icon: 'settings' },
          { section: 'Accounts', icon: 'account-circle' },
        ].filter(({ section }) => sections.includes(section)).map(({ section, icon }) => renderNavItem(section, icon))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#7C3AED',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 0,
    overflow: 'hidden',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 0,
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