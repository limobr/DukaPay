import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AccountsContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Dashboard')}>
        <Icon name="arrow-back" size={24} color="#7C3AED" />
      </TouchableOpacity>
      <Text style={styles.title}>Accounts</Text>
      <Text style={styles.text}>Manage user accounts and permissions here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48, // Space for status bar
    backgroundColor: '#F3F4F6',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#4B5563',
  },
});

export default AccountsContent;