import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import Pet from './components/Pet';
import Status from './components/Status';
import Actions from './components/Actions';

export default function App() {
  // Estados para controlar os níveis de fome, felicidade, energia e se o pet está dormindo
  const [hunger, setHunger] = useState(30);
  const [happiness, setHappiness] = useState(50);
  const [energy, setEnergy] = useState(40);
  const [health, setHealth] = useState(100);
  const [isSleeping, setIsSleeping] = useState(false);

  // Constantes para os valores máximos de fome, felicidade e energia
  const MAX_HUNGER = 100;
  const MAX_HAPPINESS = 100;
  const MAX_ENERGY = 100;
  const MAX_HEALTH = 100;

  // Função para tocar um som
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/action.mp3')
    );
    await sound.playAsync();
  };

  // Função para alimentar o pet
  const feedPet = () => {
    if (!isSleeping) {
      setHunger(prevHunger => Math.min(prevHunger + 10, MAX_HUNGER));
      playSound();
    }
  };

  // Função para brincar com o pet
  const playWithPet = () => {
    if (!isSleeping) {
      setHappiness(prevHappiness => Math.min(prevHappiness + 10, MAX_HAPPINESS));
      playSound();
    }
  };

  // Função para colocar o pet para dormir
  const putPetToSleep = () => {
    if (energy <= 50) {
      setIsSleeping(true);
      playSound();
    }
  };

  // Função para acordar o pet
  const wakePetUp = () => {
    setIsSleeping(false);
    playSound();
  };

  // useEffect para gerenciar os intervalos de fome, felicidade e energia
  useEffect(() => {
    const hungerInterval = setInterval(() => {
      setHunger(prevHunger => Math.max(prevHunger - 10, 0));
    }, 30000);

    const happinessInterval = setInterval(() => {
      setHappiness(prevHappiness => Math.max(prevHappiness - 10, 0));
    }, 60000);

    const energyInterval = setInterval(() => {
      if (isSleeping) {
        setEnergy(prevEnergy => {
          const newEnergy = Math.min(prevEnergy + 5, MAX_ENERGY);
          if (newEnergy === MAX_ENERGY) {
            setIsSleeping(false);
          }
          return newEnergy;
        });
      } else {
        setEnergy(prevEnergy => Math.max(prevEnergy - 5, 0));
      }
    }, 10000);

    const healthInterval = setInterval(() => {
      setHealth(prevHealth => {
        if (hunger < 20 || happiness < 20) {
          return Math.max(prevHealth - 10, 0);
        }
        return prevHealth;
      });
    }, 10000);

    // Limpar intervalos quando o componente é desmontado
    return () => {
      clearInterval(hungerInterval);
      clearInterval(happinessInterval);
      clearInterval(energyInterval);
      clearInterval(healthInterval);
    };
  }, [isSleeping]);

  // Renderização dos componentes
  return (
    <View style={styles.container}>
      <Pet isSleeping={isSleeping} />
      <Status hunger={hunger} happiness={happiness} energy={energy} health={health} />
      <Actions
        feedPet={feedPet}
        playWithPet={playWithPet}
        putPetToSleep={putPetToSleep}
        wakePetUp={wakePetUp}
        isSleeping={isSleeping}
        energy={energy}
      />
    </View>
  );
}

// Estilos para o componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
