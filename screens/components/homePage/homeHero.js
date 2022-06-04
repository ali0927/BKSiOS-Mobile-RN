import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import homeBackImg from '../../../assets/img/home/home-hero.png';
import {useSelector} from 'react-redux';

const THEME_COLOR = '#14142f';

export const HomeHero = ({navigation}) => {
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBackground}
        source={homeBackImg}
        resizeMode="cover">
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Explorer')}>
          <Text style={styles.text3}>Explored</Text>
        </TouchableOpacity> */}
        {/* <Image
          source={{
            uri: 'https://w7.pngwing.com/pngs/58/482/png-transparent-computer-icons-user-login-icon-miscellaneous-monochrome-black.png',
          }}
          style={{width: 100, height: 100, backgroundColor: "none"}}
        /> */}
       {!userInfo && (<><View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'pink',
            zIndex: 10
          }}></View>
        <Text style={styles.text1}>Sign in to explore and buy!</Text>
        
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.text3}>Sign In</Text>
          </TouchableOpacity>
          </> 
        )}
        <View
          style={{
            position: 'absolute',
            backgroundColor: THEME_COLOR,
            width: '100%',
            height: '100%',
            opacity: 0.7
          }}></View>
      </ImageBackground>
    </View>
  );
};

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
    // fontFamily: "SpaceGrotesk-Light.ttf",
    color: '#fff',
    fontSize: 26,
    lineHeight: 50,
    fontWeight: '500',
    textAlign: 'center',
    zIndex: 10
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
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    minWidth: 140,
    height: 40,
  },
  button: {
    width: 173,
    height: 44,
    marginTop: 30,
    paddingTop: 12,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
    zIndex: 10
  },
});
