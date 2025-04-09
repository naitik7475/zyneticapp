import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { RootStackParamList } from '../navigation/types';

type ProductListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProductList'>;
};

type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
  category: string;
  images: string[];
};

const ProductListScreen = ({ navigation }: ProductListScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data.products);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleProductPress = (id: number) => {
    navigation.navigate('ProductDetails', { productId: id });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.title}
            description={item.description}
            thumbnail={item.thumbnail}
            onPress={handleProductPress}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductListScreen;
