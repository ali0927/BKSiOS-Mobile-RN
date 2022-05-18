import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {HomeHero} from './components/homeHero';
export const HomeScreen = () => {
  return (
    <>
      <HomeHero />
      <Text>Hello, this is Home Screen</Text>
    </>
  );
};
