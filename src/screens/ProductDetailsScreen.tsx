import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fetchProductById } from '../services/api';
import { RootStackParamList } from '../navigation/types';

type ProductDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
  images: string[];
};

const { width } = Dimensions.get('window');

const ProductDetailsScreen = ({ route }: ProductDetailsScreenProps) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(productId);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Image Gallery */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentImageIndex(newIndex);
        }}
      >
        {product.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>

      {/* Image Pagination Indicator */}
      <View style={styles.pagination}>
        {product.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentImageIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>
          </View>
        </View>

        <Text style={styles.categoryLabel}>Category</Text>
        <Text style={styles.category}>{product.category}</Text>

        <Text style={styles.descriptionLabel}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.descriptionLabel}>Description (again)</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  image: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#0066cc',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  ratingContainer: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  rating: {
    fontSize: 16,
    color: '#ff9900',
    fontWeight: 'bold',
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#666',
  },
  category: {
    fontSize: 16,
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ProductDetailsScreen;
