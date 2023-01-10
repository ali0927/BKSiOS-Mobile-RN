import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6a4dfd" />
      <Text style={styles.text}>Loading ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: 20,
    color: '#fff',
  },
});
