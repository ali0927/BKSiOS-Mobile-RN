import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NewsScreen } from "../../pages/news";
import { NewsDetailScreen } from "../../pages/newsDetail";

const HomeStack = createNativeStackNavigator();

export const NewsStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="NewsHome">
      <HomeStack.Screen name="NewsHome" component={NewsScreen} options={{ headerShown: false}}/>
      <HomeStack.Screen name="NewsDetail" component={NewsDetailScreen} options={{title: "Details", headerBackTitle: "News" }}/>
    </HomeStack.Navigator>
  );
}