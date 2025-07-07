import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
import LandingScreen from './src/screens/onboarding/LandingScreen';
import LoginScreen from './src/screens/accounts/LoginScreen';
import SignupScreen from './src/screens/accounts/SignupScreen';
import DashboardScreen from './src/screens/main/DashboardScreen';
import ProductsContent from './src/screens/main/ProductsContent';
import CartScreen from './src/screens/main/CartScreen';

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
          name="Landing"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerTitle: 'Log In' }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerTitle: 'Sign Up' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductsContent"
          component={ProductsContent}
          options={{ headerTitle: 'Sell Products' }}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={({ route }) => ({
            headerTitle: `Cart (${route.params?.cart?.length || 0} items)`,
            headerTintColor: '#7C3AED',
            headerStyle: {
              backgroundColor: '#FFF',
              borderBottomWidth: 1,
              borderBottomColor: '#E5E7EB',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: '700',
              color: '#1F2937',
            },
          })}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}