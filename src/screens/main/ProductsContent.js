import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Animated, Dimensions, PixelRatio, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const PANE_HEIGHT = height * 0.5;
const fontScale = PixelRatio.getFontScale();
const isSmallScreen = width < 360 || fontScale > 1.2;
const NAV_HEIGHT = 70; // From DashboardScreen.js

const ProductsContent = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCategory, setSortCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paneAnimation] = useState(new Animated.Value(height));

  // Mock product data (15 items)
  const products = [
    { id: '1', name: 'Maize', price: 120, category: 'Cereals', stock: 100, description: 'Premium quality maize grains.' },
    { id: '2', name: 'Beans', price: 150, category: 'Legumes', stock: 80, description: 'Freshly harvested beans.' },
    { id: '3', name: 'Rice', price: 100, category: 'Cereals', stock: 50, description: 'Long-grain white rice.' },
    { id: '4', name: 'Sugar', price: 80, category: 'Others', stock: 60, description: 'Refined white sugar.' },
    { id: '5', name: 'Wheat Flour', price: 110, category: 'Cereals', stock: 70, description: 'Fine wheat flour.' },
    { id: '6', name: 'Lentils', price: 140, category: 'Legumes', stock: 65, description: 'Organic green lentils.' },
    { id: '7', name: 'Millet', price: 90, category: 'Cereals', stock: 55, description: 'Whole grain millet.' },
    { id: '8', name: 'Peas', price: 130, category: 'Legumes', stock: 75, description: 'Fresh green peas.' },
    { id: '9', name: 'Sorghum', price: 95, category: 'Cereals', stock: 60, description: 'Nutritious sorghum grains.' },
    { id: '10', name: 'Groundnuts', price: 160, category: 'Legumes', stock: 85, description: 'Roasted groundnuts.' },
    { id: '11', name: 'Barley', price: 105, category: 'Cereals', stock: 45, description: 'Whole barley grains.' },
    { id: '12', name: 'Chickpeas', price: 145, category: 'Legumes', stock: 70, description: 'Dried chickpeas.' },
    { id: '13', name: 'Oats', price: 115, category: 'Cereals', stock: 50, description: 'Rolled oats for breakfast.' },
    { id: '14', name: 'Salt', price: 50, category: 'Others', stock: 90, description: 'Iodized table salt.' },
    { id: '15', name: 'Cooking Oil', price: 200, category: 'Others', stock: 40, description: 'Pure vegetable oil.' },
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(product => sortCategory === 'All' || product.category === sortCategory);

  // Total cart items
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0));
  };

  // Handle pane open/close
  const openPane = (product) => {
    setSelectedProduct(product);
    Animated.timing(paneAnimation, {
      toValue: height - PANE_HEIGHT - NAV_HEIGHT, // Adjust for nav bar
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePane = () => {
    Animated.timing(paneAnimation, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setSelectedProduct(null));
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: paneAnimation } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > height * 0.2) {
        closePane();
      } else {
        Animated.timing(paneAnimation, {
          toValue: height - PANE_HEIGHT - NAV_HEIGHT, // Adjust for nav bar
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const renderProduct = ({ item, index }) => {
    const cartItem = cart.find(cartItem => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;
    // Alternate background colors based on index
    const backgroundColor = index % 3 === 0 ? '#FFFFFF' : index % 3 === 1 ? '#F3F4F6' : '#EDE9FE';

    return (
      <View style={[styles.productContainer, { backgroundColor }]}>
        {quantity > 0 && (
          <TouchableOpacity
            style={styles.minusIcon}
            onPress={() => removeFromCart(item.id)}
          >
            <Icon name="remove-circle" size={24} color="#7C3AED" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.productContent}
          onPress={() => openPane(item)}
        >
          <Image
            source={require('../../../assets/images/maizebag.png')}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>KSH {item.price}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <Text style={styles.productStock}>Stock: {item.stock}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyIcon}
          onPress={() => addToCart(item)}
        >
          <Icon name="add-shopping-cart" size={24} color="#7C3AED" />
          {quantity > 0 && (
            <View style={styles.quantityBadge}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.searchSortContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate('CartScreen', { cart, setCart })}
        >
          <Icon name="shopping-cart" size={28} color="#7C3AED" />
          {totalCartItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sortCategory}
          onValueChange={(value) => setSortCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Cereals" value="Cereals" />
          <Picker.Item label="Legumes" value="Legumes" />
          <Picker.Item label="Others" value="Others" />
        </Picker>
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={1}
        contentContainerStyle={styles.productList}
        key="single"
      />
      {selectedProduct && (
        <TouchableWithoutFeedback onPress={closePane}>
          <View style={styles.overlay}>
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onHandlerStateChange}
            >
              <Animated.View style={[styles.pane, { transform: [{ translateY: paneAnimation }] }]}>
                <View style={styles.paneContent}>
                  <TouchableOpacity style={styles.closeButton} onPress={closePane}>
                    <Icon name="close" size={24} color="#7C3AED" />
                  </TouchableOpacity>
                  <Image
                    source={require('../../../assets/images/maizebag.png')}
                    style={styles.paneImage}
                  />
                  <Text style={styles.paneTitle}>{selectedProduct.name}</Text>
                  <Text style={styles.paneDescription}>{selectedProduct.description}</Text>
                  <Text style={styles.panePrice}>KSH {selectedProduct.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => removeFromCart(selectedProduct.id)}
                    >
                      <Icon name="remove" size={20} color="#7C3AED" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>
                      {cart.find(item => item.id === selectedProduct.id)?.quantity || 0}
                    </Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => addToCart(selectedProduct)}
                    >
                      <Icon name="add" size={20} color="#7C3AED" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => addToCart(selectedProduct)}
                  >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </PanGestureHandler>
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  searchSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#1F2937',
    marginRight: 10,
  },
  cartIconContainer: {
    padding: 10,
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  pickerContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 0, // Remove inner padding
  },
  picker: {
    height: 50, // Increased height to ensure text visibility
    color: '#1F2937',
    fontSize: 16,
  },
  productList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 0,
  },
  productContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  productContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7C3AED',
    marginTop: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
  productStock: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
  buyIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  minusIcon: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  quantityBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  pane: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: PANE_HEIGHT,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingBottom: NAV_HEIGHT + 20, // Add padding to clear nav bar
  },
  paneContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  paneImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 16,
  },
  paneTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  paneDescription: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 16,
  },
  panePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7C3AED',
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
  },
  addToCartButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductsContent;