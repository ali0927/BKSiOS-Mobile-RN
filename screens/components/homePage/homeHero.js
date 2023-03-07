import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {useSelector} from 'react-redux';

export const HomeHero = ({navigation}) => {
  const userInfo = useSelector(state => state.userInfoReducer).userInfo;
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.homeTitleContainer}>
        <Text style={styles.homeTitle}>{t('welcome.textm1')}</Text>
        <Text style={styles.homeTitle}>{t('welcome.textm2')}</Text>
        <Text style={styles.homeTitle}>{t('welcome.textm3')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Search')}>
          <Text style={styles.buttonText}>{t('explore')}</Text>
        </TouchableOpacity>
        {!userInfo && (
          <TouchableOpacity
            style={styles.signButton}
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>{t('sign in')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    minHeight: 330,
  },
  homeTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  homeTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    lineHeight: 28,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    fontFamily: 'SpaceGrotesk-Medium',
    lineHeight: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2.0,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 124,
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
  },
  signButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 124,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.66)',
    borderRadius: 4,
    marginLeft: 10,
  },
});
