import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import logoImg from '../../assets/img/icons/logo.png';
import backImg from '../../assets/img/icons/start-back.png';

const THEME_COLOR = '#14142f';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const MainPage = ({submit}) => {
  useEffect(() => {
    setTimeout(() => {
      submit(true);
    }, 500);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={THEME_COLOR} />
      <View style={{zIndex: 30}}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => submit(true)}>
          <Image source={logoImg} />
          <Text style={styles.text1}>BACKSTAGE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.overlay}></View>
      <Image source={backImg} style={styles.backImage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLOR,
  },
  text1: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 84,
    letterSpacing: 1.8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backImage: {
    position: 'absolute',
    height: deviceHeight,
    width: deviceWidth,
    bottom: 0,
    zIndex: 0,
  },
  overlay: {
    backgroundColor: THEME_COLOR,
    position: 'absolute',
    height: '100%',
    width: 500,
    zIndex: 20,
    opacity: 0.8,
  },
});
