import React from 'react';
import {View, Text, Button} from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MenuHomeScreen} from '../../pages/menuHome';

const MenuStack = createNativeStackNavigator();
const THEME_COLOR = '#14142f';
const THEME_SEC_COLOR = '#887bff';

export const MenuStackScreen = () => {
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
    </MenuStack.Navigator>
  );
};
