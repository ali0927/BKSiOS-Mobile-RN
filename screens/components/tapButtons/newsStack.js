import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/core';
import {NewsScreen} from '../../pages/news';
import {NewsDetailScreen} from '../../pages/newsDetail';
import shareImg from '../../../assets/img/icons/share.png';
import arrowLeft from '../../../assets/img/icons/arrow-left.png';

const NewsStack = createNativeStackNavigator();
const THEME_COLOR = '#14142f';

export const NewsStackScreen = () => {
  const navigation = useNavigation();
  return (
    <NewsStack.Navigator
      initialRouteName="NewsHome"
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME_COLOR,
        },
      }}>
      <NewsStack.Screen
        name="NewsHome"
        component={NewsScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <View />
              <Text style={styles.titleText}>News</Text>
              <View />
            </View>
          ),
        }}
      />
      <NewsStack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('NewsHome')}>
                <Image source={arrowLeft} />
              </TouchableOpacity>
              <Text style={styles.titleText}>Article</Text>
              <TouchableOpacity
                onPress={() => console.log('Share Button Clicked...')}>
                <Image source={shareImg} />
              </TouchableOpacity>
            </View>
          ),
          headerBackVisible: false,
        }}
      />
    </NewsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 40,
  },
  titleText: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '700',
    textAlign: 'right',
    letterSpacing: 1.03,
  },
});
