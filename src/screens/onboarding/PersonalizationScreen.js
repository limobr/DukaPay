import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function PersonalizationScreen({ route, navigation }) {
  const { email, password, businessName, businessType, location } = route.params;
  const [logo, setLogo] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#3498db');

  // Animation for buttons
  const scale = useSharedValue(1);
  const handlePressIn = () => { scale.value = 0.95; };
  const handlePressOut = () => { scale.value = 1; };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  const handleContinue = () => {
    navigation.navigate('Subscription', {
      email,
      password,
      businessName,
      businessType,
      location,
      logo,
      primaryColor,
    });
  };

  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.step}>Step 3 of 4</Text>
        <Text style={styles.title}>Personalize Your POS</Text>
        <Text style={styles.tooltip}>Make your POS reflect your brand identity.</Text>

        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={pickLogo}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.primaryButtonText}>Upload Business Logo</Text>
          </TouchableOpacity>
        </Animated.View>
        {logo && <Image source={{ uri: logo }} style={styles.logoPreview} />}

        <Text style={styles.label}>Choose Brand Color</Text>
        <View style={styles.colorOptions}>
          {['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'].map(color => (
            <TouchableOpacity
              key={color}
              style={[styles.colorOption, { backgroundColor: color }, primaryColor === color && styles.selectedColor]}
              onPress={() => setPrimaryColor(color)}
            />
          ))}
        </View>

        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleContinue}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save & Exit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  step: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  tooltip: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  logoPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000000',
  },
  saveButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#7C3AED',
    fontWeight: '600',
    fontSize: 14,
  },
});