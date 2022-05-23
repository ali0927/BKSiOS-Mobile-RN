import React from "react";
import {View, Text} from "react-native";

export const EventDetailsScreen = ({route}) => {
    console.log("TTTT", route.params.item);
    return(
        <View>
            <Text style={{color: "white", fontSize: 26}}>Event Details Screen</Text>
        </View>
    )
}