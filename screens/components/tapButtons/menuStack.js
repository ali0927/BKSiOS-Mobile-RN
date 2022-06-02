import React from 'react';
import {View, Text, Button, Image, TouchableOpacity} from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MenuHomeScreen} from '../../pages/menuHome';
import { ProfileScreen } from '../../pages/profile';
import { ActivityScreen } from '../../pages/activity';
import { AboutScreen } from '../../pages/about';
import { AppSettingScreen } from '../../pages/appSetting';
import arrowLeft from '../../../assets/img/icons/arrow-left.png';
import {useNavigation} from '@react-navigation/core';

const MenuStack = createNativeStackNavigator();
const THEME_COLOR = '#14142f';
const THEME_SEC_COLOR = '#887bff';


export const MenuStackScreen = () => {
  const navigation = useNavigation();
  return (
    <MenuStack.Navigator
      initialRouteName="MoreMain"
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME_COLOR,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <MenuStack.Screen name="MoreMain" component={MenuHomeScreen} options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                More
              </Text>
            </View>
          ),
        }}/>
        <MenuStack.Screen name="Profile" component={ProfileScreen} options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                Profile
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("MoreMain")}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          ),
        }}/>
        <MenuStack.Screen name="Activity" component={ActivityScreen} options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                Activity
              </Text>
            </View>
          ),
        }}/>
        <MenuStack.Screen name="Settings" component={AppSettingScreen} options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                App Settings
              </Text>
            </View>
          ),
        }}/>
        <MenuStack.Screen name="About" component={AboutScreen} options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                About
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("MoreMain")}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          ),
        }}/>
    </MenuStack.Navigator>
  );
};
