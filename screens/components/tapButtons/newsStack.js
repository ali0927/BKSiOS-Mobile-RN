import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
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
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <NewsStack.Screen
        name="NewsHome"
        component={NewsScreen}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>News</Text>,
        }}
      />
      <NewsStack.Screen
        name="NewsDetail"
        component={NewsDetailScreen}
        options={{
          headerTitle: () => <Text style={styles.headerTitle}>Article</Text>,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('NewsHome')}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log('Share Button Clicked...')}>
              <Image source={shareImg} />
            </TouchableOpacity>
          ),
        }}
      />
    </NewsStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: 2,
  },
});
