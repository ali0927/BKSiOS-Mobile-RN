import React from "react";
import {View, Image} from "react-native";
import img from "../../../assets/img/bg/bg.png";

export const Banner = () => {
    return(
        <View>
            <Image source = {img} />
        </View>
    )
}