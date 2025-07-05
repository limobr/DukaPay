import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
import LandingScreen from './src/screens/onboarding/LandingScreen';
import LoginScreen from './src/screens/accounts/LoginScreen';
import SignupScreen from './src/screens/accounts/SignupScreen';
import DashboardScreen from './src/screens/main/DashboardScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Log In' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerTitle: 'Sign Up' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}