import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Actions = ({ feedPet, playWithPet, putPetToSleep, wakePetUp, isSleeping, energy }) => {
  return (
    <View style={styles.container}>
      <Button title="Alimentar" onPress={feedPet} disabled={isSleeping} />
      <Button title="Brincar" onPress={playWithPet} disabled={isSleeping} />
      <Button title="Dormir" onPress={putPetToSleep} disabled={isSleeping || energy > 50} />
      {isSleeping && <Button title="Acordar" onPress={wakePetUp} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default Actions;
