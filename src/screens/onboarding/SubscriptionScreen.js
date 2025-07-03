import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function SubscriptionScreen({ route, navigation }) {
  const { email, password, businessName, businessType, location, logo, primaryColor } = route.params;
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [addOns, setAddOns] = useState([]);
  const [error, setError] = useState('');

  const plans = [
    { id: 'basic', name: 'Duka Starter', price: 'KSh 2,500/mo' },
    { id: 'pro', name: 'Duka Pro', price: 'KSh 5,000/mo' },
    { id: 'enterprise', name: 'Enterprise', price: 'Contact Sales' },
  ];

  // Animation for buttons
  const scale = useSharedValue(1);
  const handlePressIn = () => { scale.value = 0.95; };
  const handlePressOut = () => { scale.value = 1; };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value) }],
  }));

  const toggleAddOn = (addOn) => {
    setAddOns(prev =>
      prev.includes(addOn) ? prev.filter(item => item !== addOn) : [...prev, addOn]
    );
  };

  const handleSignup = () => {
    if (!selectedPlan) {
      setError('Please select a plan');
      return;
    }
    setError('');
    navigation.navigate('Landing');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.step}>Step 4 of 4</Text>
        <Text style={styles.title}>Choose Your Plan</Text>
        <Text style={styles.tooltip}>Select a plan that fits your business needs.</Text>

        {plans.map(plan => (
          <Animated.View key={plan.id} style={[animatedStyle]}>
            <TouchableOpacity
              style={[styles.planCard, selectedPlan === plan.id && styles.selectedPlan]}
              onPress={() => setSelectedPlan(plan.id)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planPrice}>{plan.price}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <Text style={styles.addonTitle}>Add Premium Features:</Text>
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => toggleAddOn('printer')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Icon
              name={addOns.includes('printer') ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={addOns.includes('printer') ? '#7C3AED' : '#D1D5DB'}
            />
            <Text style={styles.checkboxLabel}>Printer Setup Support (KSh 1,500)</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => toggleAddOn('analytics')}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Icon
              name={addOns.includes('analytics') ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={addOns.includes('analytics') ? '#7C3AED' : '#D1D5DB'}
            />
            <Text style={styles.checkboxLabel}>Advanced Analytics (KSh 1,000/mo)</Text>
          </TouchableOpacity>
        </Animated.View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Animated.View style={[animatedStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSignup}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.primaryButtonText}>Complete Setup & Pay</Text>
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
  planCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  selectedPlan: {
    borderColor: '#7C3AED',
    borderWidth: 2,
  },
  planName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  planPrice: {
    fontSize: 16,
    color: '#4B5563',
  },
  addonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#2ecc71',
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