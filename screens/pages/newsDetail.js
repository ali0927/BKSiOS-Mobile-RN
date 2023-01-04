import axios from 'axios';
import React, {useEffect, useState} from 'react';
import DateObject from 'react-date-object';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Toast from 'react-native-toast-message';
import ClockImg from '../../assets/img/icons/clock.svg';
import MessageImg from '../../assets/img/icons/message.svg';
import {Loading} from '../components/loading';
import {useTranslation} from 'react-i18next';
import config from '../helper/config';

const deviceWidth = Dimensions.get('window').width;
export const NewsDetailScreen = ({route, navigation}) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const {t} = useTranslation();
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
        setLoading(false);
        setArticle(response.data.article);
        console.log('Article', response.data.article);
      })
      .catch(function (error) {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error occured while calling data...',
          text2: error,
        });
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
        {loading && <Loading />}
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
                <ClockImg style={styles.msgImg} />
                <Text style={styles.timeText}>
                  {dateString(article.createdAt)}
                </Text>
              </View>
              <View style={styles.flexRow}>
                <MessageImg style={styles.msgImg} />
                <Text style={styles.timeText}>0</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.newsButton}
              onPress={() => console.log('Clicked News Button')}>
              <Text style={styles.newsText}>{t('news')}</Text>
            </TouchableOpacity>
            <Text style={styles.articleTitle}>{article.title}</Text>
            <HTMLView value={article.description} stylesheet={htmlStyleSheet} />
            <View style={{height: 100}} />
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
    height: deviceWidth - 40,
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
  newsButton: {
    alignItems: 'center',
    height: 24,
    width: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginTop: 25,
  },
  newsText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: 'rgba(255,255,255,0.66)',
    paddingVertical: 4,
  },
  articleTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    lineHeight: 26,
    color: '#fff',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginTop: 10,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
});
const htmlStyleSheet = StyleSheet.create({
  h1: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    lineHeight: 26,
    color: '#fff',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    marginBottom: -50,
  },
  strong: {
    fontFamily: 'SpaceGrotesk-Medium',
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
