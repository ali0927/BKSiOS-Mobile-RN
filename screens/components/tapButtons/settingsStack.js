import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from "../../pages/profile";

const SettingsStack = createNativeStackNavigator();

export const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Profile" component={ProfileScreen} />
    </SettingsStack.Navigator>
  );
}