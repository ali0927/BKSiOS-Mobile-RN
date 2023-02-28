import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import {useSelector} from 'react-redux';
import avatarImg from '../../assets/img/avatars/avatar3.jpg';
import FastImage from 'react-native-fast-image';
import {Loading} from '../components/loading';
import config from '../helper/config';
import {allTickets, getAllCollections, getAllEventCards} from '../helper/event';

const deviceWidth = Dimensions.get('window').width;
export const SearchScreen = () => {
  const navigation = useNavigation();
  const [originTickets, setOriginTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [originEvents, setOriginEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [originCollections, setOriginCollections] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedTag, setSelectedTag] = useState('collections');
  const [colLoading, setColLoading] = useState(true);
  const [eventLoading, setEventLoading] = useState(true);
  const [ticketLoading, setTicketLoading] = useState(true);
  const searchInfo = useSelector(state => state.searchInfoReducer).searchInfo;

  const {t} = useTranslation();
  const filterTickets = tickets_ => {
    let res = [];
    if (searchInfo !== null) {
      res = tickets_.filter(card => card.eventcard.name.includes(searchInfo));
      setTickets([...res]);
    } else {
      setTickets(tickets_);
    }
  };

  const filterEvents = events_ => {
    let res = [];
    if (searchInfo !== null) {
      res = events_.filter(card => card.name.includes(searchInfo));
      setEvents([...res]);
    } else {
      setEvents(events_);
    }
  };

  const filterCollections = collections_ => {
    let res = [];
    if (searchInfo !== null) {
      res = collections_.filter(card =>
        card.name.toLowerCase().includes(searchInfo),
      );
      setCollections([...res]);
    } else {
      setCollections(collections_);
    }
  };

  useEffect(() => {
    getAllCollections().then(res => {
      if (res.success) {
        setColLoading(false);
        setOriginCollections(res.collections);
        filterCollections(res.collections);
      } else {
        console.log('ERROR:::', res);
      }
    });

    getAllEventCards().then(res => {
      if (res.success) {
        setEventLoading(false);
        setOriginEvents(res.eventcards);
        filterEvents(res.eventcards);
      }
    });

    allTickets().then(res => {
      if (res.success) {
        setTicketLoading(false);
        setOriginTickets(res.tickets);
        filterTickets(res.tickets);
      }
    });
  }, []);

  useEffect(() => {
    filterTickets(originTickets);
    filterEvents(originEvents);
    filterCollections(originCollections);
  }, [searchInfo]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mb20}>
          <Text style={styles.subtitle}>{t('categories')}</Text>
          <View style={styles.categoryContainer}>
            {selectedTag !== 'collections' && (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => setSelectedTag('collections')}>
                <Text style={styles.categoryTitle}>{t('collections')}</Text>
              </TouchableOpacity>
            )}
            {selectedTag !== 'events' && (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => setSelectedTag('events')}>
                <Text style={styles.categoryTitle}>{t('events')}</Text>
              </TouchableOpacity>
            )}
            {selectedTag !== 'tickets' && (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => setSelectedTag('tickets')}>
                <Text style={styles.categoryTitle}>{t('tickets')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.mb20}>
          <Text style={styles.subtitle}>
            {selectedTag == 'collections'
              ? t('collections')
              : selectedTag == 'events'
              ? t('events')
              : t('tickets')}
          </Text>
          {selectedTag === 'collections' && (
            <View style={styles.resultContainer}>
              {colLoading && <Loading />}
              {collections &&
                collections.map((collection, i) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() =>
                      navigation.navigate('AuthorProfile', {item: collection})
                    }
                    key={'collections' + i}>
                    <View style={styles.resultBackImg}>
                      <FastImage
                        source={{
                          uri:
                            config.API_BASE_URL +
                            '/api/upload/get_file?path=' +
                            collection.picture_background,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.backImg}
                      />
                    </View>
                    <View style={styles.resultMeta}>
                      <Image
                        source={{
                          uri:
                            config.API_BASE_URL +
                            '/api/upload/get_file?path=' +
                            collection.picture_small,
                        }}
                        style={styles.resultAvatarImg}
                      />
                      <View
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingBottom: 10,
                        }}>
                        <Text style={styles.resultName} numberOfLines={2}>
                          {collection.name}
                        </Text>
                        <Text style={styles.resultDescription}>
                          Accomodation
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          {selectedTag === 'events' && (
            <View style={styles.resultContainer}>
              {eventLoading && <Loading />}
              {events &&
                events.map((event, i) => {
                  const creatorAvatar = () => {
                    if (event.creator.avatar === '/img/avatars/avatar.jpg') {
                      return require('../../assets/img/avatars/avatar.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar2.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar2.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar3.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar3.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar4.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar4.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar5.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar5.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar6.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar6.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar7.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar7.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar8.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar8.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar9.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar9.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar10.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar10.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar11.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar11.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar12.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar12.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar13.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar13.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar14.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar14.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar15.jpg'
                    ) {
                      return require('../../assets/img/avatars/avatar15.jpg');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar17.png'
                    ) {
                      return require('../../assets/img/avatars/avatar17.png');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar18.png'
                    ) {
                      return require('../../assets/img/avatars/avatar18.png');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar19.png'
                    ) {
                      return require('../../assets/img/avatars/avatar19.png');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar20.png'
                    ) {
                      return require('../../assets/img/avatars/avatar20.png');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar21.png'
                    ) {
                      return require('../../assets/img/avatars/avatar21.png');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar22.png'
                    ) {
                      return require('../../assets/img/avatars/avatar22.png');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar23.png'
                    ) {
                      return require('../../assets/img/avatars/avatar23.png');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar24.png'
                    ) {
                      return require('../../assets/img/avatars/avatar24.png');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar25.png'
                    ) {
                      return require('../../assets/img/avatars/avatar25.png');
                    } else if (
                      event.creator.avatar === '/img/avatars/avatar26.png'
                    ) {
                      return require('../../assets/img/avatars/avatar26.png');
                    }
                  };
                  return (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() =>
                        navigation.navigate('EventDetail', {item: event})
                      }
                      key={'events' + i}>
                      <View style={styles.resultBackImg}>
                        <FastImage
                          source={{
                            uri:
                              config.API_BASE_URL +
                              '/api/upload/get_file?path=' +
                              event.picture_small,
                            priority: FastImage.priority.normal,
                          }}
                          style={styles.backImg}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </View>
                      <View style={styles.resultMeta}>
                        <Image
                          source={creatorAvatar()}
                          style={styles.resultAvatarImg}
                        />
                        <View
                          style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBottom: 10,
                          }}>
                          <Text style={styles.resultName} numberOfLines={2}>
                            {event.name}
                          </Text>
                          <Text style={styles.resultDescription}>
                            {event.creator.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
          )}
          {selectedTag === 'tickets' && (
            <View style={styles.resultContainer}>
              {ticketLoading && <Loading />}
              {tickets &&
                tickets.map((ticket, i) => (
                  <TouchableOpacity
                    style={styles.resultItem}
                    key={'tickets' + i}>
                    <View style={styles.resultBackImg}>
                      <FastImage
                        source={{
                          uri:
                            config.API_BASE_URL +
                            '/api/upload/get_file?path=' +
                            ticket.eventcard?.picture_small,
                          priority: FastImage.priority.normal,
                        }}
                        style={styles.backImg}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <View style={styles.resultMeta}>
                      <Image
                        source={avatarImg}
                        style={styles.resultAvatarImg}
                      />
                      <View
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingBottom: 10,
                        }}>
                        <Text style={styles.resultName} numberOfLines={2}>
                          {ticket.eventcard.name}
                        </Text>
                        <Text style={styles.resultDescription}>
                          {ticket.eventcard.creator.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
    padding: 20,
  },
  mb20: {
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    lineHeight: 31,
    color: '#fff',
    textTransform: 'capitalize',
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryItem: {
    display: 'flex',
    justifyContent: 'center',
    width:  deviceWidth/2 - 30,
    height: deviceWidth/2 - 30,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  categoryTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    color: '#fff',
    textAlign: 'center',
    margin: 'auto',
  },
  resultContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  resultItem: {
    display: 'flex',
    width: deviceWidth/2 - 30,
    height: deviceWidth/2 + 70,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  resultBackImg: {
    height: deviceWidth/2 - 30,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  backImg: {
    width: '100%',
    height: '100%',
  },
  resultAvatarImg: {
    backgroundColor: '#d878e1',
    marginTop: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  resultMeta: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultName: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#fff',
    width: 140,
  },
  resultDescription: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 13,
    color: 'rgba(255, 255, 255, 0.66)',
  },
});
