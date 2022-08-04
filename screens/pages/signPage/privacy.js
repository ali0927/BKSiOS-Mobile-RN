import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
// import {privacyData} from '../../constant/privacy';
import HTMLView from 'react-native-htmlview';

export const PrivacyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {/* <HTMLView value={privacyData} stylesheet={htmlStyleSheet} /> */}
        <Text>Privacy</Text>
      </View>
    </ScrollView>
  );
};
const htmlStyleSheet = StyleSheet.create({
  h1: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    lineHeight: 32
  },
  p: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 28,
    marginBottom: -60,
  },
  ul: {
    color: 'white',
    marginBottom: -40,
  },
  li: {
    color: 'white',
    fontSize: 16,
  },
  ol: {
    color: '#fff',
    fontSize: 16,
    marginTop: -20,
    marginBottom: -50,
  },
  blockquote: {
    color: '#fff',
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#14142f',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
});
