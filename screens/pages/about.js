import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import logoImg from '../../assets/img/icons/logo.png';
import backImg from '../../assets/img/icons/start-back.png';
import telegramImg from '../../assets/img/icons/telegram.png';
import globalImg from '../../assets/img/icons/globe.png';
import mediumImg from '../../assets/img/icons/medium.png';
import twitterImg from '../../assets/img/icons/twitter.png';
import facebookImg from '../../assets/img/icons/facebook.png';
import instagramImg from '../../assets/img/icons/instagram.png';

const THEME_COLOR = '#14142f';

export const AboutScreen = ({submit}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{alignItems: 'center', zIndex: 30, padding: 25, width: '100%'}}>
        <Image source={logoImg} style={{width: 60, height: 60}} />
        <Text style={styles.text1}>BACKSTAGE</Text>
        <Text style={styles.text2}>
          Backstage is powering the crypto revolution in the events industry.
          Through the BKS token and our blockchain ecosystem, Backstage aims to
          solve the current challenges facing the events and entertainment
          sectors.
        </Text>
        <Text style={styles.text2}>
          From financing and payments to NFT ticketing and marketplaces,
          Backstage $BKS will take the events industry toward a more
          sustainable, profitable and fair future. Backstage has a very strong
          and open community and everyone can join and contribute to the
          platform's development by purchasing tokens and helping fund the
          entertainment industry.
        </Text>
        <View style={styles.divider} />
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            fontWeight: '700',
            letterSpacing: 1.2,
            marginVertical: 20
          }}>
          Follow Us
        </Text>
        <View style={styles.socialDiv}>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={globalImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={telegramImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={mediumImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={twitterImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={facebookImg} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialImg}>
              <Image source={instagramImg} />
            </TouchableOpacity>
          </View>
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
    fontSize: 26,
    lineHeight: 50,
    letterSpacing: 1.8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: 1,
    marginVertical: 20,
  },
  socialDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    width: "100%"
  },
  socialImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 10,
    borderRadius: 4,
  },
  backImage: {
    position: 'absolute',
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
