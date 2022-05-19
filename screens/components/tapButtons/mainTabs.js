import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../../pages/home';
import { ExplorerScreen } from '../../pages/explorer';
import { SettingsScreen } from '../../pages/settings';
import { NewsScreen } from '../../pages/news';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }} />
        <Tab.Screen name="Explorer" component={ExplorerScreen}  options={{ headerShown: false }} />
        <Tab.Screen name="News" component={NewsScreen}  options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={SettingsScreen}  options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
