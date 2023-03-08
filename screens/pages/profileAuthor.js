import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import facebookImg from '../../assets/img/icons/facebook.png';
import CheckBox from 'react-native-customizable-checkbox';
import globalImg from '../../assets/img/icons/globe.png';
import instagramImg from '../../assets/img/icons/instagram.png';
import mediumImg from '../../assets/img/icons/medium.png';
import telegramImg from '../../assets/img/icons/telegram.png';
import twitterImg from '../../assets/img/icons/twitter.png';
import badgeMark from '../../assets/img/icons/verified.png';
import FilterImg from '../../assets/img/icons/filter.svg';
import SortImg from '../../assets/img/icons/sort.svg';
import DropImg from '../../assets/img/icons/drop-arrow.svg';
import SearchTopImg from '../../assets/img/icons/search-top.svg';
import UpImg from '../../assets/img/icons/up-arrow.svg';
import blackImg from '../../assets/img/BLANK_ICON.png';
import checkImg from '../../assets/img/icons/check.png';
import config from '../helper/config';
import {useSelector} from 'react-redux';
import {getEventCardInCollection, updateEventLike} from '../helper/event';
import {Loading} from '../components/loading';
import {EventCard} from '../components/eventCard';
import {getLikesNumber} from '../utils';

const windowWidth = Dimensions.get('window').width;

export const ProfileAuthorScreen = ({route}) => {
  const collectionData = route.params.item;
  const {t} = useTranslation();
  // for events
  const [originEvents, setOriginEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredDigital, setFilteredDigital] = useState([]);
  const [filteredService, setFilteredService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();

  const _userInfo = useSelector(state => state.userInfoReducer).userInfo;

  // for search
  const [focusedItem, setFocusedItem] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // for filter
  const [isFilter, setIsFiilter] = useState(false);
  const [filterChecked, setFilterChecked] = useState({
    all: true,
    event: true,
    digitalArt: true,
    service: true,
  });

  // for sort
  const [isSort, setIsSort] = useState(false);
  const [sortChecked, setSortChecked] = useState({
    recentlyListed: true,
    mostLikes: false,
  });

  const filterCheckList = [
    {id: 0, title: t('all'), label: 'all'},
    {id: 1, title: t('event'), label: 'event'},
    {id: 2, title: t('digital Art'), label: 'digitalArt'},
    {id: 3, title: t('service'), label: 'service'},
  ];
  const sortCheckList = [
    {id: 0, title: t('recently listed'), label: 'recentlyListed'},
    {id: 1, title: t('most likes'), label: 'mostLikes'},
  ];
  const handleFilterChecked = item => {
    switch (item) {
      case 0:
        setFilterChecked({
          ...filterChecked,
          all: !filterChecked.all,
          event: !filterChecked.all ? true : false,
          digitalArt: !filterChecked.all ? true : false,
          service: !filterChecked.all ? true : false,
        });
        break;
      case 1:
        setFilterChecked({
          ...filterChecked,
          all:
            filterChecked.all && filterChecked.event
              ? false
              : filterChecked.all,
          event: !filterChecked.event,
        });
        break;
      case 2:
        setFilterChecked({
          ...filterChecked,
          all:
            filterChecked.all && filterChecked.digitalArt
              ? false
              : filterChecked.all,
          digitalArt: !filterChecked.digitalArt,
        });
        break;
      case 3:
        setFilterChecked({
          ...filterChecked,
          all:
            filterChecked.all && filterChecked.service
              ? false
              : filterChecked.all,
          service: !filterChecked.service,
        });
        break;
      default:
        break;
    }
  };

  const handleSortChecked = item => {
    switch (item) {
      case 0:
        setSortChecked({
          ...sortChecked,
          recentlyListed: !sortChecked.recentlyListed,
          mostLikes: !sortChecked.recentlyListed
            ? false
            : sortChecked.mostLikes,
        });
        break;
      case 1:
        setSortChecked({
          ...sortChecked,
          mostLikes: !sortChecked.mostLikes,
          recentlyListed: !sortChecked.mostLikes
            ? false
            : sortChecked.recentlyListed,
        });
        break;
      default:
        break;
    }
  };
  const handleSearchChange = value => {
    setSearchValue(value);
  };
  const searchEvents = events_ => {
    let res = [];
    if (searchValue !== '') {
      res = events_.filter(card =>
        card.name.toLowerCase().includes(searchValue),
      );
      setEvents([...res]);
    } else {
      setEvents(events_);
    }
  };
  const filterEvents = () => {
    let temp = [...originEvents];
    if (filterChecked.all) {
      setEvents(temp);
    } else {
      let ttt = [];
      filterChecked.event && ttt.push.apply(ttt, filteredEvents);
      filterChecked.digitalArt && ttt.push.apply(ttt, filteredDigital);
      filterChecked.service && ttt.push.apply(ttt, filteredService);
      setEvents(ttt);
    }
  };
  const sortEvents = () => {
    const temp = [...events];
    let ttt = [];
    if (temp !== []) {
      if (sortChecked.mostLikes) {
        ttt = temp.sort((a, b) => getLikesNumber(b) - getLikesNumber(a));
      } else {
        ttt = temp.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      }
      setEvents(ttt);
    }
  };
  const onClickLike = index => {
    if (!userInfo) return;
    let likes = [];
    try {
      likes = JSON.parse(originEvents[index].likes_number);
    } catch (err) {
      likes = [];
      console.log(err);
    }
    if (typeof likes !== 'object' || likes === null) likes = [];
    const userId = userInfo?.user?.id;
    if (likes.includes(userId)) {
      const index = likes.indexOf(userId);
      likes.splice(index, 1);
    } else {
      likes.push(userId);
    }
    updateEventLike({
      id: originEvents[index]?.id,
      likes_number: JSON.stringify(likes),
    }).then(res => {
      if (res.success) {
        const _eventCards = [...originEvents];
        _eventCards[index].likes_number = JSON.stringify(likes);
        setOriginEvents(_eventCards);
      }
    });
  };

  useEffect(() => {
    setUserInfo(JSON.parse(_userInfo));
  }, [_userInfo]);
  useEffect(() => {
    searchEvents(originEvents);
  }, [searchValue]);
  useEffect(() => {
    filterEvents();
  }, [filterChecked]);
  useEffect(() => {
    sortEvents();
  }, [sortChecked]);
  useEffect(() => {
    getEventCardInCollection(collectionData.id).then(res => {
      if (res.success) {
        setLoading(false);
        let temp = [];
        temp = res.eventcards.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        setFilteredEvents(
          temp.filter(eventcard => eventcard.category === 'Category1'),
        );
        setFilteredDigital(
          temp.filter(eventcard => eventcard.category === 'Category2'),
        );
        setFilteredService(
          temp.filter(eventcard => eventcard.category === 'Category3'),
        );
        setOriginEvents([...temp]);
        searchEvents([...temp]);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backgroundImgContainer}>
          <Image
            source={{
              uri:
                config.API_BASE_URL +
                '/api/upload/get_file?path=' +
                collectionData.picture_background,
            }}
            resizeMode="cover"
            style={styles.backgroundImg}
          />
        </View>
        {collectionData && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarDiv}>
                <Image
                  source={{
                    uri:
                      config.API_BASE_URL +
                      '/api/upload/get_file?path=' +
                      collectionData.picture_small,
                  }}
                  resizeMode="contain"
                  style={styles.avatarImg}
                />
              </View>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.text1}>{collectionData.name}</Text>
              <Image source={badgeMark} style={styles.badgeMark} />
            </View>
            <Text style={styles.idText}>@{collectionData.creator.name}</Text>
            <Text style={styles.description}>{collectionData.description}</Text>
            <Text style={styles.subTitle}>{t('links')}</Text>
            <View style={styles.socialDiv}>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() => Linking.openURL('https://bksbackstage.io')}>
                <Image source={globalImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() => Linking.openURL('https://t.me/BKSBackstage')}>
                <Image source={telegramImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() =>
                  Linking.openURL('https://bksbackstageofficial.medium.com/')
                }>
                <Image source={mediumImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() =>
                  Linking.openURL('https://twitter.com/BackstageBks')
                }>
                <Image source={twitterImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() =>
                  Linking.openURL('https://www.facebook.com/BKSBackstage')
                }>
                <Image source={facebookImg} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.socialImg}
                onPress={() =>
                  Linking.openURL(
                    'https://www.instagram.com/bksbackstage/?hl=en',
                  )
                }>
                <Image source={instagramImg} />
              </TouchableOpacity>
            </View>
            <View style={styles.followDiv}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text4}>
                  {collectionData.creator.followers}
                </Text>
                <Text style={{...styles.description, marginTop: 0}}>
                  {t('followers')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('FollowButton Clicked')}>
                <Text style={styles.text3}>{t('follow')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <View style={styles.funcDiv}>
              <View>
                <TouchableOpacity
                  style={styles.funcBtn}
                  onPress={() => {
                    setIsSort(false);
                    setIsFiilter(!isFilter);
                  }}>
                  <FilterImg />
                  <Text style={styles.funcTxt}>FILTER</Text>
                  {isFilter ? <UpImg /> : <DropImg />}
                </TouchableOpacity>
                {isFilter && (
                  <View style={styles.modalContainer}>
                    {filterCheckList &&
                      filterCheckList.map((item, i) => (
                        <View
                          key={item.id}
                          style={{...styles.checkBoxContainer}}>
                          <CheckBox
                            label=""
                            isContainerClickable={true}
                            value={filterChecked[item.label]}
                            onChangeValue={() => handleFilterChecked(item.id)}
                            colorInactive={'#09091a'}
                            colorActive={'#6a4dfd'}
                            boxStyle={{
                              ...styles.checkBox,
                              borderColor: filterChecked[item.label]
                                ? '#6a4dfd'
                                : '#ffffff54',
                            }}
                            containerStyle={styles.checkBoxMark}
                            checkImage={
                              filterChecked[item.label] ? checkImg : blackImg
                            }
                          />
                          <View style={{flex: 1}}>
                            <Text style={styles.checkBoxText}>
                              {item.title}
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
                )}
              </View>

              <View>
                <TouchableOpacity
                  style={styles.funcBtn}
                  onPress={() => {
                    setIsFiilter(false);
                    setIsSort(!isSort);
                  }}>
                  <SortImg />
                  <Text style={styles.funcTxt}>SORT</Text>
                  {isSort ? <UpImg /> : <DropImg />}
                </TouchableOpacity>
                {isSort && (
                  <View
                    style={{...styles.modalContainer, right: 0, width: 200}}>
                    {sortCheckList &&
                      sortCheckList.map((item, i) => (
                        <View key={item.id} style={styles.checkBoxContainer}>
                          <CheckBox
                            label=""
                            value={sortChecked[item.label]}
                            onChangeValue={() => handleSortChecked(item.id)}
                            colorInactive={'#09091a'}
                            colorActive={'#6a4dfd'}
                            boxStyle={{
                              ...styles.checkBox,
                              borderColor: sortChecked[item.label]
                                ? '#6a4dfd'
                                : '#ffffff54',
                            }}
                            containerStyle={styles.checkBoxMark}
                            checkImage={
                              sortChecked[item.label] ? checkImg : blackImg
                            }
                          />
                          <View style={{flex: 1}}>
                            <Text style={styles.checkBoxText}>
                              {item.title}
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
                )}
              </View>
            </View>
            <View style={styles.searchContainer}>
              <TextInput
                onFocus={() => setFocusedItem(true)}
                onBlur={() => setFocusedItem(false)}
                placeholder={t('explore')}
                placeholderTextColor=" rgba(255, 255, 255, 0.33)"
                style={focusedItem ? styles.inputOnFocus : styles.input}
                value={searchValue}
                autoCapitalize="none"
                onChangeText={val => handleSearchChange(val.toLowerCase())}
              />
              <SearchTopImg style={styles.searchImage} />
            </View>
            <View style={styles.eventCardsContainer}>
              {loading && <Loading />}
              {events.map((item, index) => (
                <EventCard
                  userInfo={userInfo}
                  item={item}
                  index={index}
                  onClickLike={onClickLike}
                  key={'exc' + index}
                />
              ))}
              {events.length === 0 && !loading && (
                <Text style={styles.text2}>Doesn't exist any event.</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImgContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 224,
  },
  backgroundImg: {
    height: '100%',
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarDiv: {
    position: 'relative',
    width: 140,
    height: 140,
    marginTop: -70,
    marginBottom: 30,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    borderColor: '#ededed',
    borderWidth: 1,
    backgroundColor: 'pink',
  },
  badgeMark: {
    backgroundColor: '#2f80ed',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 1,
    width: 16,
    height: 16,
  },
  text1: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginRight: 10,
  },
  text2: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 30,
  },
  text3: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  text4: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginRight: 10,
  },
  idText: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#6a4dfd',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'justify',
    color: 'rgba(255, 255, 255, 0.66)',
    marginTop: 10,
  },
  subTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.66)',
    textTransform: 'uppercase',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginTop: 30,
    letterSpacing: 1.15,
  },
  button: {
    justifyContent: 'center',
    height: 44,
    width: 140,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
  },
  socialDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  socialImg: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 10,
    borderRadius: 4,
  },
  followDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  divider: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: 1,
    marginTop: 40,
    marginBottom: 0,
  },
  funcDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  funcBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.33)',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  funcTxt: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 14,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    color: '#fff',
    letterSpacing: 1.15,
    marginHorizontal: 10,
  },
  modalContainer: {
    position: 'absolute',
    top: 50,
    width: 160,
    backgroundColor: '#09091a',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.33)',
    paddingVertical: 20,
    zIndex: 50,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
    paddingLeft: 20,
    overflow: 'hidden',
  },
  checkBoxMark: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 4,
  },
  checkBoxText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    letterSpacing: 1.03,
    textTransform: 'capitalize',
    fontFamily: 'SpaceGrotesk-Medium',
  },
  searchContainer: {
    width: windowWidth - 20,
    position: 'relative',
    borderRadius: 4,
    height: 44,
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.33)',
    padding: 8,
    paddingLeft: 40,
    color: 'white',
    borderRadius: 4,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    fontWeight: '500',
  },
  inputOnFocus: {
    shadowColor: '#6a4dfd',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderColor: '#6a4dfd',
    width: '100%',
    height: 44,
    borderWidth: 1,
    padding: 8,
    paddingLeft: 40,
    color: 'white',
    borderRadius: 4,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    fontWeight: '500',
  },
  searchImage: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  eventCardsContainer: {
    alignItems: 'center',
  },
});
