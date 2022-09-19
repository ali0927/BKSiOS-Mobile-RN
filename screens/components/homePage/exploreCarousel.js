import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import img1 from '../../../assets/img/cover/cover3.jpg';
import img2 from '../../../assets/img/cover/cover4.jpg';
import img3 from '../../../assets/img/cover/cover5.jpg';
import config from '../../helper/config';
import {getAllEventCards} from '../../helper/event';
import CurrencySymbol from '../currency/CurrencySymbol';

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
  const addons = item.addons === '' ? [] : JSON.parse(item.addons);
  let addonPrice = 0;
  addons.forEach(addon => {
    addonPrice += Number(addon.price);
  });
  return (
    <View style={styles.container}>
      <View style={styles.imageDiv}>
        <Image
          source={{
            uri:
              config.API_BASE_URL +
              '/api/upload/get_file?path=' +
              item.picture_small,
          }}
          style={styles.img}
        />
        <Text style={styles.leftTime}>{item.leftTime}15 minutes left</Text>
      </View>
      <View style={styles.collectionMeta}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.info}>
          Date: {new Date(item.date).toISOString().toString().split('T')[0]}
        </Text>
        <Text style={styles.info}>Location: {item.location}</Text>
        <View style={styles.divider}></View>
        <Text style={styles.info}>Current price</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text style={styles.price}>
            {item.price + addonPrice} <CurrencySymbol />
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.price}>&#9825;</Text>
            <Text style={{...styles.price, marginLeft: 10}}>
              {item.likes_number ? item.likes_number : 0}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ExploreCarousel = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEventCards().then(res => {
      if (res.success) {
        console.log('Explorer Event Result', res.eventcards);
        setEvents(res.eventcards);
      }
    });
  }, []);
  return (
    <View style={{marginVertical: 10}}>
      {events && (
        <Carousel
          data={events}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
      )}
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
    height: 250,
    backgroundColor: 'pink',
  },
  imageDiv: {
    position: 'relative',
  },
  delete: {
    position: 'absolute',
    right: -10,
    backgroundColor: '#702fa0',
    borderRadius: 8,
    overflow: 'hidden',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    borderColor: '#fff',
    borderWidth: 1,
  },
  leftTime: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    backgroundColor: '#534f77',
    borderRadius: 20,
    overflow: 'hidden',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    borderColor: '#6164ff',
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
    width: '100%',
    backgroundColor: '#887bff',
    height: 2,
    marginTop: 20,
    marginBottom: 20,
  },
  name: {
    width: '100%',
    textAlign: 'left',
    fontSize: 24,
    fontWeight: '600',
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
    textAlign: 'left',
    fontSize: 26,
    marginTop: 20,
    color: '#fff',
    fontWeight: '600',
  },
});
