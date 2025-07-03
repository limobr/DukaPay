import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
import LoginScreen from './src/screens/accounts/LoginScreen';
import LandingScreen from './src/screens/main/LandingScreen';
import SignupScreen from './src/screens/accounts/SignupScreen';
import BusinessBasicsScreen from './src/screens/onboarding/BusinessBasicsScreen';
import PersonalizationScreen from './src/screens/onboarding/PersonalizationScreen';
import SubscriptionScreen from './src/screens/onboarding/SubscriptionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen
          name="BusinessBasics"
          component={BusinessBasicsScreen}
          options={{ title: 'Business Details' }}
        />
        <Stack.Screen
          name="Personalization"
          component={PersonalizationScreen}
          options={{ title: 'Personalize Your POS' }}
        />
        <Stack.Screen
          name="Subscription"
          component={SubscriptionScreen}
          options={{ title: 'Choose Your Plan' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}