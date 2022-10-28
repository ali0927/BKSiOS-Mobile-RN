import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import {getAllEventCards, updateEventLike} from '../../helper/event';
import {EventCard} from '../eventCard';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const EventsCarousel = () => {
  const [latestEvents, setLatestEvents] = useState([]);
  const [userInfo, setUserInfo] = useState();

  const _userInfo = useSelector(state => state.userInfoReducer).userInfo;

  const renderItem = ({item, index}) => {
    return (
      <EventCard
        userInfo={userInfo}
        item={item}
        index={index}
        onClickLike={onClickLike}
      />
    );
  };

  const onClickLike = index => {
    if (!userInfo) return;
    let likes = [];
    try {
      likes = JSON.parse(latestEvents[index].likes_number);
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
      id: latestEvents[index]?.id,
      likes_number: JSON.stringify(likes),
    }).then(res => {
      if (res.success) {
        const _eventCards = [...latestEvents];
        _eventCards[index].likes_number = JSON.stringify(likes);
        setLatestEvents(_eventCards);
      }
    });
  };

  useEffect(() => {
    getAllEventCards().then(res => {
      if (res.success) {
        let temp = [];
        const d = new Date();
        temp = res.eventcards.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        let shift = 0;
        temp.map((item, index) => {
          if (new Date(item.date).getTime() - d.getTime() < 0) {
            shift++;
          }
        });
        for (let index = 0; index < shift; index++) {
          let item = temp[0];
          temp.splice(0, 1);
          temp.push(item);
        }
        setLatestEvents(
          temp.filter(eventcard => eventcard.category === 'Category1'),
        );
      }
    });
  }, []);

  useEffect(() => {
    setUserInfo(JSON.parse(_userInfo));
  }, [_userInfo]);

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
