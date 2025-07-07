import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ route }) => {
  const { cart, setCart } = route.params;
  const navigation = useNavigation();

  // Calculate total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0));
  };

  // Add to cart
  const addToCart = (product) => {
    setCart(cart.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={require('../../../assets/images/maizebag.png')}
        style={styles.cartItemImage}
      />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>KSH {item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => removeFromCart(item.id)}
          >
            <Icon name="remove" size={20} color="#7C3AED" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => addToCart(item)}
          >
            <Icon name="add" size={20} color="#7C3AED" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.cartItemTotal}>KSH {item.price * item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: KSH {cartTotal}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => alert('Checkout initiated (coming soon)')}
            >
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  cartList: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#7C3AED',
    marginTop: 4,
  },
  cartItemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    color: '#1F2937',
  },
  totalContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default CartScreen;