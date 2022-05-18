import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import { NFTCreating } from '../constant/nftCreating';


export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const GetStarted = () => {
  return (
    <View style={styles.container}>
      {NFTCreating.map((item) => (
        <View>
          <View style={styles.main}>
            <Image source ={item.img} style={styles.img}/>
            <Text style={styles.maintitle}>{item.title}</Text>
          </View>
          <Text style={styles.detail}>{item.detail}</Text>
          {item.link && <Text style={styles.link}>{item.link.title}</Text>}
        </View>
      ))}
    </View>
  );
};
export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 50
  },
  main: {
    dispay: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10
  },
  img: {
    marginRight: 20
  },
  maintitle: {
    fontSize: 24,
    color: "#fff",
  },
  detail: {
    fontSize: 20,
    color: "#fff",
    lineHeight: 30
  },
  link: {
    fontSize: 22,
    color: "#6164ff",
    textDecorationLine: 'underline',
  }
});
