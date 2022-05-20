import React from "react";
import {View, Text} from "react-native";
import { ProfileDetails } from "./profileDetails";
export const Profile = () => {
    return(
        <View>
            {/* <Text style={{color: "#fff", fontSize: 25}}>Profile Section</Text> */}
            <ProfileDetails />
        </View>
    )
}