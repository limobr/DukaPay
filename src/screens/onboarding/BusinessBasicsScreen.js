import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function BusinessBasicsScreen({ route, navigation }) {
  const { email, password } = route.params;
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const businessTypes = [
    { label: 'General Store', value: 'General Store' },
    { label: 'Wines & Spirits', value: 'Wines & Spirits' },
    { label: 'Grocery', value: 'Grocery' },
    { label: 'Restaurant', value: 'Restaurant' },
    { label: 'Pharmacy', value: 'Pharmacy' },
    { label: 'Other', value: 'Other' },
  ];

  // Animation for buttons
  const scale = useSharedValue(1);
  const handlePressIn = () => { scale.value = 0.95; };
  const handlePressOut = () => { scale.value = 1; };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  const handleContinue = () => {
    if (!businessName) {
      setError('Please enter a business name');
      return;
    }
    if (!businessType) {
      setError('Please select a business type');
      return;
    }
    if (!location) {
      setError('Please select a location');
      return;
    }
    setError('');
    navigation.navigate('Personalization', {
      email,
      password,
      businessName,
      businessType,
      location,
    });
  };

  const handleLocationPick = () => {
    setLocation('Nairobi, Kenya');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.step}>Step 2 of 4</Text>
        <Text style={styles.title}>Tell Us About Your Business</Text>
        <Text style={styles.tooltip}>This helps us tailor DukaPay to your needs.</Text>

        <TextInput
          style={[styles.input, error.includes('business name') && styles.inputError]}
          placeholder="Business Name"
          value={businessName}
          onChangeText={setBusinessName}
        />
        <Text style={styles.label}>Business Type</Text>
        <RNPickerSelect
          onValueChange={setBusinessType}
          items={businessTypes}
          style={{
            inputIOS: [styles.input, error.includes('business type') && styles.inputError],
            inputAndroid: [styles.input, error.includes('business type') && styles.inputError],
          }}
          placeholder={{ label: 'Select your business type', value: '' }}
          value={businessType}
        />
        <Text style={styles.label}>Location</Text>
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleLocationPick}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.primaryButtonText}>Select on Map</Text>
          </TouchableOpacity>
        </Animated.View>
        {location ? <Text style={styles.locationText}>{location}</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            style={[styles.primaryButton, (!businessName || !businessType || !location) && styles.buttonDisabled]}
            onPress={handleContinue}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={!businessName || !businessType || !location}
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
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
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