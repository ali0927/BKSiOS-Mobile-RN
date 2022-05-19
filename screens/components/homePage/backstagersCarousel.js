import React from 'react';
import {Text, View, Dimensions, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import img1 from '../../../assets/img/avatars/avatar2.jpg';
import img2 from '../../../assets/img/avatars/avatar4.jpg';
import img3 from '../../../assets/img/avatars/avatar5.jpg';
import img4 from '../../../assets/img/avatars/avatar7.jpg';
import img5 from '../../../assets/img/avatars/avatar8.jpg';
import img6 from '../../../assets/img/avatars/avatar10.jpg';
import img7 from '../../../assets/img/avatars/avatar11.jpg';
import img8 from '../../../assets/img/avatars/avatar13.jpg';
import img9 from '../../../assets/img/avatars/avatar14.jpg';
import img10 from '../../../assets/img/avatars/avatar15.jpg';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const data = [
  {
    id: 1,
    img: img1,
    name: 'miriuuu',
  },
  {
    id: 2,
    img: img2,
    name: 'fantraingle',
  },
  {
    id: 3,
    img: img3,
    name: 'llllily',
  },
  {
    id: 4,
    img: img4,
    name: 'oxyoxy',
  },
  {
    id: 5,
    img: img5,
    name: '1one',
  },
  {
    id: 6,
    img: img6,
    name: 'sc00ty',
  },
  {
    id: 7,
    img: img7,
    name: 'nickname',
  },
  {
    id: 8,
    img: img8,
    name: 'johndoe',
  },
  {
    id: 9,
    img: img9,
    name: 'kateblank',
  },
  {
    id: 10,
    img: img10,
    name: 'redalert',
  },
];

const renderItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Image source={item.img} style={styles.img} />
      <Text style={styles.name}>@ {item.name}</Text>
    </View>
  );
};

const BackstagersCarousel = () => {
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
export default BackstagersCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: '#887bff',
    padding: 25,
    width: '100%',
    marginRight: 30,
    borderRadius: 16,
    overflow: 'hidden',
  },
  img: {
    width: 100,
    height: 100,
    marginRight: 30,
    borderRadius: 16,
  },
  name: {
    textAlign: 'right',
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
});
