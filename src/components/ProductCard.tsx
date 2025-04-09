import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type ProductCardProps = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  onPress: (id: number) => void;
};

const ProductCard = ({ id, title, description, thumbnail, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(id)}>
      <Image source={{ uri: thumbnail }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductCard;
