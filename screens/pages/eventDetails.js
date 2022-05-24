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


export const EventDetailsScreen = ({route}) => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    console.log('This is Modal');
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setCurrentEvent(eventData.find(item => route.params.item == item.id));
  });
  return (
    <ScrollView style={styles.container}>
      {currentEvent && (
        <View>
          <View style={styles.imgContainer}>
            <Image source={currentEvent.img} style={styles.eventImg} />
            <Text style={styles.followers}>
              &#9825; {currentEvent.followers}
            </Text>
          </View>
          <Text style={styles.text1}>Descriptions</Text>
          <Text style={styles.infoText}>{currentEvent.descriptions}</Text>
          <View style={styles.divider}></View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.text2}>Creator</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View>
                  <Image source={creatorImg} style={styles.avatarImg} />
                  <Image source={badgeMark} style={styles.badgeMark} />
                </View>
                <Text style={styles.infoText}>Admin</Text>
              </View>
            </View>
            <View>
              <Text style={styles.text2}>Collection</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={collectionImg} style={styles.avatarImg} />
                <Text style={styles.infoText}>123456</Text>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 50}}>
            <Text style={styles.text1}>Addons</Text>
            <TouchableOpacity onPress={() => console.log('AddonClick...')}>
              <Image source={addonsImg} style={styles.avatarImg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.text1}>Details</Text>
          <View style={styles.divider}></View>
          <View>
            <Text style={styles.text2}>Location: {currentEvent.location}</Text>
            <Text style={styles.text2}>Date: {currentEvent.date}</Text>
            <Text style={styles.text2}>Time: {currentEvent.time}</Text>
            <Text style={styles.text2}>{currentEvent.descriptions}</Text>
            <Text style={styles.text2}>
              {currentEvent.ticketAmount < 10 ? (
                <>{currentEvent.ticketAmount} tickets are left</>
              ) : (
                ''
              )}
            </Text>
          </View>
          <View style={styles.divider}></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text style={styles.text2}> &#9200; Events start in</Text>
              <Text style={styles.text1}>Event Started</Text>
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                borderColor: '#887bff',
                paddingLeft: 20,
                marginLeft: 50,
              }}>
              <Text style={styles.text2}>Price</Text>
              <Text style={styles.text1}>{currentEvent.price} &#8364;</Text>
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
    borderRadius: 10,
    marginBottom: 20,
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
    marginBottom: 20
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
  }
});
