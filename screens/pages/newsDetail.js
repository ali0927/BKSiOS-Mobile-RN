import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import DateObject from 'react-date-object';
import clockImg from '../../assets/img/icons/clock.png';
import messageImg from '../../assets/img/icons/message.png';
// import shareImg1 from '../../assets/img/icons/facebook.png';
// import shareImg2 from '../../assets/img/icons/twitter.png';
// import shareImg3 from '../../assets/img/icons/medium.png';
import config from '../helper/config';

// import {getArticleById} from "../helper/article";

export const NewsDetailScreen = ({route, navigation}) => {
  const [article, setArticle] = useState(null);

  const dateString = d => {
    var date = new DateObject({
      date: new Date(d),
    });
    return date.format('MMMM DD, YYYY');
  };

  const getArticleById = e => {
    axios
      .get(config.API_BASE_URL + '/api/article/' + e)
      .then(function (response) {
        setArticle(response.data.article);
      })
      .catch(function (error) {
        console.log('Response Data: ', error);
      })
      .finally(function () {
        console.log('arrived there');
      });
  };

  useEffect(() => {
    getArticleById(route.params.id);
  }, [route.params.id]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        {article && (
          <View style={styles.innerContainer}>
            <Image
              source={{
                uri:
                  config.API_BASE_URL +
                  '/api/upload/get_file?path=' +
                  article.image,
              }}
              style={styles.mainImg}
            />
            <View style={styles.timeContainer}>
              <View style={styles.flexRow}>
                <Image source={clockImg} style={styles.msgImg} />
                <Text style={styles.timeText}>
                  {dateString(article.createdAt)}
                </Text>
              </View>
              <View style={styles.flexRow}>
                <Image source={messageImg} style={styles.msgImg} />
                <Text style={styles.timeText}>0</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.newsButton}
              onPress={() => console.log('Clicked News Button')}>
              <Text style={styles.newsText}>News</Text>
            </TouchableOpacity>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <HTMLView value={article.description} stylesheet={htmlStyleSheet} />
            {/* <View style={styles.shareButtons}>
              <TouchableOpacity style={styles.shareButton}>
                <Image source={shareImg1} style={styles.msgImg} />
                <Text style={styles.shareButtonText}>share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tweetButton}>
                <Image source={shareImg2} style={styles.msgImg} />
                <Text style={styles.shareButtonText}>tweet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Image source={shareImg3} style={styles.msgImg} />
                <Text style={styles.shareButtonText}>share</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#14142f',
    flex: 1,
  },
  scrollStyle: {
    backgroundColor: '#14142f',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    overflow: 'hidden',
    margin: 20,
  },
  mainImg: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgImg: {
    marginRight: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeText: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  newsText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    color: 'rgba(255,255,255,0.66)',
    fontWeight: '500',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    borderRadius: 11,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  articleTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    lineHeight: 26,
    color: '#fff',
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  // shareButtons: {
  //   flexDirection: 'row',
  //   marginBottom: 10,
  //   marginTop: 80,
  // },
  // shareButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#3d6199',
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  //   borderRadius: 15,
  //   marginRight: 10,
  // },
  // tweetButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#57aef5',
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  //   borderRadius: 15,
  //   marginRight: 10,
  // },
  // shareButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: '700',
  // },
  newsButton: {
    alignItems: 'flex-start',
  },
});
const htmlStyleSheet = StyleSheet.create({
  h1: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    lineHeight: 26,
    color: '#fff',
    fontWeight: '700',
    marginBottom: -50,
  },
  p: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.66)',
    lineHeight: 20,
    fontWeight: '400',
    marginBottom: -60,
  },
  ul: {
    color: 'rgba(255, 255, 255, 0.66)',
    marginBottom: -40,
  },
  li: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 16,
  },
  ol: {
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 16,
    marginTop: -20,
    marginBottom: -50,
  },
  blockquote: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.66)',
    fontSize: 16,
  },
});
