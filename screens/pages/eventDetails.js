import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {eventData} from '../constant/eventData';
import creatorImg from '../../assets/img/avatars/avatar.jpg';
import collectionImg from '../../assets/img/avatars/avatar2.jpg';
import addonsImg from '../../assets/img/avatars/avatar5.jpg';
import badgeMark from '../../assets/img/icons/verified.png';
import OthersCarousel from '../components/eventDetails/otherAuthorCarousel';
import {
  getEventCardById,
  getCollectionById,
  getLatestEventCards,
  getBuyState,
} from '../helper/event';
import Countdown from 'react-countdown';

export const EventDetailsScreen = ({route}) => {
  const id = route.params.item.id;
  const tempData = route.params.item;
  const [isSold, setSold] = useState(false);
  const [addons, setAddons] = useState([]);
  const [addonPrice, setAddonPrice] = useState(0);
  const [collectionName, setCollectionName] = useState();
  const [latestEvents, setLatestEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isAddonModalVisible, setAddonModalVisible] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventCard, setEventCard] = useState(false);

  const toggleModal = () => {
    console.log('This is Modal');
    setModalVisible(!isModalVisible);
  };

  const toggleAddonModal = item => {
    console.log('This is Addon Modal', item);
    setSelectedAddon(item);
    setAddonModalVisible(!isAddonModalVisible);
  };

  const CompletionList = () => <Text style={styles.text1}>Event Started</Text>;

  const pad = (num, size = 2) => {
    const s = '000000000' + num;
    return s.substr(s.length - size);
  };

  const renderer = ({days, hours, minutes, seconds, completed}) => {
    if (completed) {
      return <CompletionList />;
    } else {
      return (
        <Text style={styles.text1}>
          {days} days {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </Text>
      );
    }
  };

  const EventCountDown = ({date}) => {
    const d = new Date(date);
    return <Countdown date={d} renderer={renderer} />;
  };

  useEffect(() => {
    setCurrentEvent(eventData.find(item => id == item.id));

    getEventCardById(id).then(res => {
      console.log('EventCardById', res);
      if (res.success) {
        console.log('Success!!!');
        setEventCard(res.eventcard);
        if (res.eventcard.total_tickets === res.eventcard.buy_count)
          setSold(true);
        const _addons =
          res.eventcard.addons === '' ? [] : JSON.parse(res.eventcard.addons);
        setAddons(_addons);
        console.log('Addons:::', _addons);
        let _addonPrice = 0;
        _addons.forEach(addon => {
          _addonPrice += Number(addon.price);
        });
        setAddonPrice(_addonPrice);
        console.log('Before setting colle.name', res.eventcard.collection);
        getCollectionById(res.eventcard.collection).then(res => {
          if (res.success) {
            console.log('CollectionByID11111', res.collection.name);
            setCollectionName(res.collection.name);
          }
        });
      }
    });

    getLatestEventCards().then(res => {
      if (res.success) {
        setLatestEvents(res.eventcards);
      }
    });

    getBuyState(id)
      .then(res => {
        if (res.success) {
          console.log('Already bought');
          // setSold(true);
        } else {
          console.log('You can buy');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <ScrollView style={styles.container}>
      {tempData && (
        <View>
          <View style={styles.imgContainer}>
            {tempData.picture_large && (
              <Image
                source={{
                  uri:
                    'http://192.168.106.26:3000/api/upload/get_file?path=' +
                    tempData.picture_large,
                }}
                style={styles.eventImg}
              />
            )}
            <Text style={styles.followers}>&#9825; 358</Text>
          </View>
          <Text style={styles.text1}>Descriptions</Text>
          <Text style={styles.infoText}>{tempData.venue_description}</Text>
          <View style={styles.divider}></View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.text2}>Creator</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image source={creatorImg} style={styles.avatarImg} />
                  <Image source={badgeMark} style={styles.badgeMark} />
                </View>
                <Image source={{uri: tempData.creator.avatar}} />
                <Text style={styles.infoText}>{tempData.creator.name}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.text2}>Collection</Text>
              {collectionName && (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image source={collectionImg} style={styles.avatarImg} />
                  <Text style={styles.infoText}>{collectionName}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{marginBottom: 50}}>
            <Text style={styles.text1}>Addons</Text>
            {addons &&
              addons.map(item => {
                let addonImg;
                switch (item.icon) {
                  case '/img/avatars/avatar.jpg':
                    addonImg = require('../../assets/img/avatars/avatar.jpg');
                    break;
                  case '/img/avatars/avatar1.jpg':
                    addonImg = require('../../assets/img/avatars/avatar2.jpg');
                    break;
                  case '/img/avatars/avatar2.jpg':
                    addonImg = require('../../assets/img/avatars/avatar2.jpg');
                    break;
                  case '/img/avatars/avatar3.jpg':
                    addonImg = require('../../assets/img/avatars/avatar3.jpg');
                    break;
                  case '/img/avatars/avatar4.jpg':
                    addonImg = require('../../assets/img/avatars/avatar4.jpg');
                    break;
                  case '/img/avatars/avatar5.jpg':
                    addonImg = require('../../assets/img/avatars/avatar5.jpg');
                    break;
                  case '/img/avatars/avatar6.jpg':
                    addonImg = require('../../assets/img/avatars/avatar6.jpg');
                    break;
                  case '/img/avatars/avatar7.jpg':
                    addonImg = require('../../assets/img/avatars/avatar7.jpg');
                }
                return (
                  <TouchableOpacity onPress={() => toggleAddonModal(item)}>
                    <Image source={addonImg} style={styles.avatarImg} />
                  </TouchableOpacity>
                );
              })}
          </View>
          <Modal isVisible={isAddonModalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <View>
                  <Text style={{...styles.modalTitle, marginVertical: 5}}>
                    Name: {selectedAddon ? selectedAddon.name : ''}
                  </Text>
                  <Text style={{...styles.modalTitle, marginVertical: 5}}>
                    Description:{' '}
                    {selectedAddon ? selectedAddon.description : ''}
                  </Text>
                  <Text style={{...styles.modalTitle, marginVertical: 5}}>
                    Price: {selectedAddon ? selectedAddon.price + '€' : ''}
                  </Text>
                </View>
                <TouchableOpacity onPress={toggleAddonModal}>
                  <Text style={styles.modalClose}>&times;</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Text style={styles.text1}>Details</Text>
          <View style={styles.divider}></View>
          <View>
            <Text style={styles.text2}>Location: {eventCard.location}</Text>
            <Text style={styles.text2}>
              Date:{' '}
              {new Date(tempData.date).toISOString().toString().split('T')[0]}
            </Text>
            <Text style={styles.text2}>
              Time:{' '}
              {new Date(tempData.date).toISOString().toString().split('T')[1]}
            </Text>
            <Text style={styles.text2}>{tempData.descriptions}</Text>
            <Text style={styles.text2}>
              {tempData.total_tickets - tempData.buy_count} tickets are left
              {/* {eventCard.ticketAmount < 10 ? (
                <>{eventCard.ticketAmount} tickets are left</>
              ) : (
                ''
              )} */}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{minWidth: 160}}>
              <Text style={styles.text2}> &#9200; Events start in</Text>
              <EventCountDown date={new Date(tempData.date).toISOString()} />
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                borderColor: '#887bff',
                paddingLeft: 20,
                marginLeft: 50,
              }}>
              <Text style={styles.text2}>Price</Text>
              <Text style={styles.text1}>{tempData.price} &#8364;</Text>
            </View>
          </View>
          <View style={styles.divider}></View>
          <TextInput
            style={styles.input}
            placeholder="amount of ticket"
            autoCapitalize="none"
            defaultValue="1"
            keyboardType={'numeric'}
            placeholderTextColor="white"
            onChangeText={val => console.log('Values: ', val)}
          />
          <TouchableOpacity style={styles.button} onPress={() => toggleModal()}>
            <Text style={styles.text3}>Buy Ticket</Text>
          </TouchableOpacity>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Proceed to Pay</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.modalClose}>&times;</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => toggleModal()}>
                <Text style={styles.text3}>Pay with PayPal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => toggleModal()}>
                <Text style={styles.text3}>Buy with crypto: BSC</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => toggleModal()}>
                <Text style={styles.text3}>Buy with Crypto: NEAR</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Text style={styles.text3}>Other Author Assets</Text>
          <OthersCarousel />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    overflow: 'hidden',
    padding: 20,
  },
  imgContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#887bff',
    padding: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  eventImg: {
    width: '100%',
    borderRadius: 16,
    height: 280,
    backgroundColor: 'pink',
  },
  followers: {
    textAlign: 'right',
    fontSize: 20,
    color: '#bdbdbd',
    fontWeight: '400',
  },
  text1: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
  },
  text2: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  infoText: {
    textAlign: 'left',
    fontSize: 20,
    color: '#bdbdbd',
    fontWeight: '400',
  },
  divider: {
    width: '100%',
    backgroundColor: '#887bff',
    height: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  badgeMark: {
    position: 'absolute',
    right: 15,
    bottom: -5,
    backgroundColor: '#2f80ed',
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    width: 20,
    height: 20,
  },
  avatarImg: {
    position: 'relative',
    width: 50,
    height: 50,
    borderColor: '#6164ff',
    marginRight: 20,
    borderRadius: 10,
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#534f77',
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
    marginBottom: 50,
    paddingTop: 10,
    backgroundColor: '#6164ff',
    borderRadius: 12,
    width: 350,
  },
  modalContainer: {
    backgroundColor: '#14142f',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#887bff',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  modalClose: {
    color: '#fff',
    width: 25,
    margin: 0,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
  },
  payButton: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: '#6164ff',
    borderRadius: 12,
  },
});
