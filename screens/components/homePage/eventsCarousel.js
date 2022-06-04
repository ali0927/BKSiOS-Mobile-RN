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
import config from '../../helper/config';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

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
                config.API_BASE_URL + '/api/upload/get_file?path=' +
                item.picture_small,
            }}
            style={styles.img}
          />
        </View>
        <View style={styles.collectionMeta}>
          <View style={styles.detail}></View>
          <Text style={styles.name}>{item.name}</Text>
          <EventCountDown date={new Date(item.date).toISOString()} />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 40,
              marginBottom: 10,
            }}>
            <View style={{width: '50%'}}>
              <Text style={styles.info}>Date </Text>
              <Text style={styles.infoVal}>
                {new Date(item.date).toISOString().toString().split('T')[0]}
              </Text>
            </View>
            <View style={{width: '50%'}}>
              <Text style={styles.info}>Location</Text>
              <Text style={styles.infoVal}>{item.location}</Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View>
              <Text style={styles.info}>Current price</Text>
              <Text style={styles.price}>{item.price + addonPrice} €</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: "center"}}>
              <Text style={styles.like}>&#9825;</Text>
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
    backgroundColor: '#fff1',
    borderWidth: 1,
    borderColor: '#887bff',
    padding: 15,
    width: '100%',
    marginRight: 30,
    borderRadius: 12,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    height: 250,
    backgroundColor: 'pink',
  },
  imageDiv: {
    position: 'relative',
  },
  leftTime: {
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#6a4dfd',
    fontWeight: '400',
    letterSpacing: 1.6,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  collectionMeta: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    paddingLeft: 0,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  divider: {
    width: '100%',
    backgroundColor: '#fff2',
    height: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  name: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  info: {
    width: '100%',
    textAlign: 'left',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.66)',
    fontWeight: '400',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  infoVal: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    marginTop: 10,
  },
  date: {
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#6a4dfd',
    fontWeight: '400',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  price: {
    textAlign: 'left',
    fontSize: 24,
    marginTop: 5,
    color: '#fff',
    fontWeight: '600',
  },
  like: {
    textAlign: 'left',
    fontSize: 24,
    marginTop: 5,
    color: '#fff',
    fontWeight: '300',
  },
});
