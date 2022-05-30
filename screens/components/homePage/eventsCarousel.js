import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/core';
import {getLatestEventCards} from '../../helper/event';
import Countdown from 'react-countdown';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const CompletionList = () => <Text style={styles.leftTime}>Event Started</Text>;

const pad = (num, size = 2) => {
  const s = '000000000' + num;
  return s.substr(s.length - size);
};

const renderer = ({days, hours, minutes, seconds, completed}) => {
  if (completed) {
    return <CompletionList />;
  } else {
    return (
      <Text style={styles.leftTime}>
        {days} days {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </Text>
    );
  }
};

const EventCountDown = ({date}) => {
  const d = new Date(date);
  return <Countdown date={d} renderer={renderer} />;
};

const EventCard = ({item}) => {
  const navigation = useNavigation();
  const addons = item.addons === '' ? [] : JSON.parse(item.addons);
  let addonPrice = 0;
  addons.forEach(addon => {
    addonPrice += Number(addon.price);
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('EventDetail', {item: item})}>
        <View style={styles.imageDiv}>
          <Image
            source={{
              uri:
                'http://192.168.106.26:3000/api/upload/get_file?path=' +
                item.picture_small,
            }}
            style={styles.img}
          />
          <EventCountDown date={new Date(item.date).toISOString()} />
        </View>
        <View style={styles.collectionMeta}>
          <View style={styles.detail}></View>
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
            <Text style={styles.price}>{item.price + addonPrice} BNB</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.price}>&#9825;</Text>
              <Text style={{...styles.price, marginLeft: 10}}>
                {item.likes_number ? item.likes_number : 0}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const renderItem = ({item, index}) => {
  return <EventCard item={item} index={index} />;
};

const EventsCarousel = () => {
  const [latestEvents, setLatestEvents] = useState([]);

  useEffect(() => {
    getLatestEventCards().then(res => {
      if (res.success) {
        setLatestEvents(res.eventcards);
      }
    });
  }, []);
  return (
    <View style={{marginVertical: 10}}>
      {latestEvents && (
        <Carousel
          data={latestEvents}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
      )}
    </View>
  );
};
export default EventsCarousel;

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
