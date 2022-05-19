import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeScreenNavigationContainer } from 'react-native-screens';
import homeBackImg from '../../../assets/img/home/home.png';

export const HomeHero = () => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.imgBackground}
      source={homeBackImg}
      resizeMode="cover">
      <Text style={styles.text1}>The events NFT marketplace</Text>
      <Text style={styles.text2}>A decentralized Ecosystems </Text>
      <Text style={styles.text2}>powering the events industry</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text3}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log("SFSFS")}>
        <Text style={styles.text3}>Sign In</Text>
      </TouchableOpacity>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#887bff',
    borderBottomWidth: 2,
  },
  text1: {
    color: 'white',
    fontSize: 26,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  text3: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    minWidth: 140,
    height: 40,
  },
  button: {
    marginTop: 30,
    paddingTop: 12,
    backgroundColor: '#6164ff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
