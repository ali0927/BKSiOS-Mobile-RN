import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
export const MainPage = ({submit}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text1}>BKS - iOS</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => submit(true)}>
          <Text style={styles.text3}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    color: 'black',
    fontSize: 36,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text3: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    height: 40,
    width: 200
  },
  button: {
    marginTop: 150,
    paddingTop: 10,
    backgroundColor: '#6164ff',
    borderRadius: 5,
  },
});
