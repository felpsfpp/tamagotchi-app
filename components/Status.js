import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Status = ({ hunger, happiness, energy, health }) => {
  return (
    <View style={styles.container}>
      <Text>Fome: {hunger}</Text>
      <Text>Felicidade: {happiness}</Text>
      <Text>Energia: {energy}</Text>
      <Text>Saúde: {health}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

export default Status;
