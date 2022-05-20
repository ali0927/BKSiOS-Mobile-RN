import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Banner} from '../components/authorPage/banner';
import { Overview } from '../components/authorPage/overview';

export const AuthorScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Banner />
      </View>
      <View>
          <Overview />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  subtitle: {
    color: 'white',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  divider: {
    width: '100%',
    backgroundColor: '#887bff',
    height: 2,
    marginTop: 50,
    marginBottom: 20,
  },
});
