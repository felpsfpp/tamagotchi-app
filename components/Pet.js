import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const Pet = ({ isSleeping }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isSleeping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -20,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      bounceAnim.stopAnimation();
    }
  }, [isSleeping, bounceAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/pet.png')}
        style={[styles.image, { transform: [{ translateY: bounceAnim }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Pet;
