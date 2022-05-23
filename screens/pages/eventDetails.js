import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {eventData} from '../constant/eventData';
import creatorImg from '../../assets/img/avatars/avatar.jpg';
import collectionImg from '../../assets/img/avatars/avatar2.jpg';
import badgeMark from '../../assets/img/icons/verified.png';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

export const EventDetailsScreen = ({route}) => {
  const [currentEvent, setCurrentEvent] = useState(null);
  useEffect(() => {
    setCurrentEvent(eventData.find(item => route.params.item == item.id));
  });
  return (
    <ScrollView style={styles.container}>
      {currentEvent && (
        <View>
          <View style={styles.itemContainer}>
            <Image source={currentEvent.img} style={styles.img} />
            <Text style={styles.info}>&#9825; {currentEvent.followers}</Text>
          </View>
          <Text style={styles.price}>Descriptions</Text>
          <Text style={styles.info}>{currentEvent.descriptions}</Text>
          <View style={styles.divider}></View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.info}>Creator</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image source={creatorImg} style={{position: 'relative'}} />
                  <Image source={badgeMark} style={styles.badgeMark} />
                </View>
                <Text style={styles.info}>Admin</Text>
              </View>
            </View>
            <View>
              <Text style={styles.info}>Collection</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={collectionImg} />
                <Text style={styles.info}>123456</Text>
              </View>
            </View>
          </View>
          <View style={styles.addons}>
            <Text style={styles.info}>Addons</Text>
            <TouchableOpacity>
              <Image source={creatorImg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.info}>Details</Text>
          <View style={styles.divider}></View>
          <View style={styles.details}>
            <Text style={styles.info}>Location: {currentEvent.location}</Text>
            <Text style={styles.info}>Date: {currentEvent.date}</Text>
            <Text style={styles.info}>Time: {currentEvent.time}</Text>
            <Text style={styles.info}>{currentEvent.descriptions}</Text>
            <Text style={styles.info}>
              {currentEvent.ticketAmount < 10 ? (
                <>{currentEvent.ticketAmount} tickets are left</>
              ) : (
                ''
              )}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.info}> &#9200; Events start in</Text>
              <Text style={styles.info}>Event Started</Text>
            </View>
            <View>
              <Text style={styles.info}>Price</Text>
              <Text style={styles.info}>{currentEvent.price} &#8364;</Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => console.log('Values: ', val)}
          />
          <TouchableOpacity style={styles.button} onPress={() => signIn()}>
            <Text style={styles.text3}>Buy Ticket</Text>
          </TouchableOpacity>
         
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    margin: 'auto',
    overflow: 'hidden',
    padding: 20,
  },
  itemContainer: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#14142f',
    margin: 'auto',
    borderWidth: 1,
    borderColor: '#887bff',
    padding: 25,
    borderRadius: 16,
    overflow: 'hidden',
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#534f77',
    margin: 10,
    padding: 8,
    paddingLeft: 20,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  text3: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    height: 40,
    width: '100%',
  },
  button: {
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: '#6164ff',
    borderRadius: 12,
    width: 350,
    margin: 10,
  },
  img: {
    width: '100%',
    borderRadius: 16,
  },
  imageDiv: {
    position: 'relative',
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
    
    textAlign: 'left',
    fontSize: 20,
    color: '#bdbdbd',
    fontWeight: '400',
  },
  owner: {
    textAlign: 'left',
    fontSize: 20,
    color: '#bdbdbd',
    fontWeight: '400',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  price: {
    textAlign: 'left',
    fontSize: 26,
    marginTop: 20,
    color: '#fff',
    fontWeight: '600',
  },
  badgeMark: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    width: 30,
    height: 30,
  },
});
