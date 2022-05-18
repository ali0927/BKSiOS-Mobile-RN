import React from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import img1 from '../../assets/img/cover/cover3.jpg';
import img2 from '../../assets/img/cover/cover4.jpg';
import img3 from '../../assets/img/cover/cover5.jpg';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const data = [
  {
    id: 1,
    img: img1,
    leftTime: 12,
    name: 'Fed3',
    date: '2022-08-08',
    location: 'Paris',
    price: 3,
  },
  {
    id: 2,
    img: img2,
    leftTime: 9,
    name: 'Fed3',
    date: '2022-06-10',
    location: 'Toronto',
    price: 2,
  },
  {
    id: 3,
    img: img3,
    leftTime: 15,
    name: 'Fed3',
    date: '2022-06-5',
    location: 'New York',
    price: 4,
  },
];

const renderItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageDiv}>
        <Image source={item.img} style={styles.img} />
        <Text style={styles.delete}>DELETE</Text>
        <Text style={styles.leftTime}>{item.leftTime} days</Text>
      </View>
      <View style={styles.collectionMeta}>
        <View style={styles.detail}>

        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>{item.date}</Text>
        <Text style={styles.info}>Location: {item.location}</Text>
        <View style={styles.divider}></View>
        <Text style={styles.info}>Current price</Text>
        <Text style={styles.price}>{item.price} BNB</Text>
      </View>
    </View>
  );
};

const ExploreCarousel = () => {
  return (
    <View style={{marginVertical: 10}}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
      />
    </View>
  );
};
export default ExploreCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    borderWidth: 1,
    borderColor: '#887bff',
    padding: 25,
    width: '100%',
    marginRight: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    borderRadius: 16,
  },
  imageDiv: {
    position: "relative"
  },
  delete: {
    position: "absolute",
    right: -10,
    backgroundColor: "#702fa0",
    borderRadius: 8,
    overflow: "hidden",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    borderColor: "#fff",
    borderWidth: 1,
  },
  leftTime: {
    position: "absolute",
    left: 10,
    bottom: 0,
    backgroundColor: "#534f77",
    borderRadius: 20,
    overflow: "hidden",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    borderColor: "#6164ff",
    borderWidth: 1,
  },
  collectionMeta: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 0,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
 divider: {
   width: "100%",
   backgroundColor: "#887bff",
   height: 2,
   marginTop: 20,
   marginBottom: 20
 },
  name: {
    width: '100%',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: "600",
    color: '#fff',
    marginBottom: 10,
  },
  info: {
    width: '100%',
    textAlign: 'left',
    fontSize: 20,
    color: '#bdbdbd',
    fontWeight: '400',
  },
  price: {
    width: '100%',
    textAlign: 'left',
    fontSize: 26,
    marginTop: 20,
    color: '#fff',
    fontWeight: '600',
  },
});
