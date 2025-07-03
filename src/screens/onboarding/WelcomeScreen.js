import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Slide data with corrected image paths
  const slides = [
    {
      key: '1',
      title: 'Karibu DukaPay!',
      text: 'Manage your inventory with ease, from cereals to daily essentials.',
      // Path: src/screens/onboarding -> src/screens -> src -> root -> assets/images
      image: require('../../../assets/images/cereals.jpg'),
    },
    {
      key: '2',
      title: 'Sell Anywhere, Anytime',
      text: 'Process sales offline, perfect for Kenyan markets.',
      image: require('../../../assets/images/fruitsandvegetables.jpg'),
    },
    {
      key: '3',
      title: 'Seamless M-Pesa Payments',
      text: 'Accept M-Pesa payments instantly for your shop.',
      image: require('../../../assets/images/shoeshop.jpg'),
    },
    {
      key: '4',
      title: 'Grow Your Business',
      text: 'Track sales and insights for your wines & spirits or retail store.',
      image: require('../../../assets/images/winesspirits.jpg'),
    },
  ];

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      sliderRef.current?.goToSlide(nextIndex);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Animation for buttons
  const scale = useSharedValue(1);
  const handlePressIn = () => { scale.value = 0.95; };
  const handlePressOut = () => { scale.value = 1; };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  // Render each slide
  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  // Render pagination dots
  const renderPagination = (activeIndex) => (
    <View style={styles.dotsContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            activeIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={renderSlide}
        onSlideChange={(index) => setCurrentIndex(index)}
        showSkipButton={false}
        showNextButton={false}
        showDoneButton={false}
        renderPagination={renderPagination}
      />
      <View style={styles.buttonContainer}>
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.replace('Login')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              const nextIndex = currentIndex + 1;
              if (nextIndex >= slides.length) {
                navigation.replace('Login');
              } else {
                setCurrentIndex(nextIndex);
                sliderRef.current?.goToSlide(nextIndex);
              }
            }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: '100%',
    position: 'absolute',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#7C3AED',
    width: 12,
    height: 12,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WelcomeScreen;