import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import axios from 'axios';
import DateObject from 'react-date-object';
import {useNavigation} from '@react-navigation/core';
import clockImg from '../../assets/img/icons/clock.png';
import messageImg from '../../assets/img/icons/message.png';
import shareImg1 from '../../assets/img/icons/share1.png';
import shareImg2 from '../../assets/img/icons/share2.png';
import shareImg3 from '../../assets/img/icons/share3.png';

export const NewsDetailScreen = ({route}) => {
  const [article, setArticle] = useState(null);

  const navigation = useNavigation();

  const dateString = d => {
    var date = new DateObject({
      date: new Date(d),
    });

    return date.format('MM.DD.YYYY, HH:mm');
  };

  const getArticleById = e => {
    console.log('GetArticleById Function...', e);
    axios
      .get('http://192.168.106.26:3000/api/article/' + e)
      .then(function (response) {
        console.log('Response Data: ', response.data.article);
        setArticle(response.data.article);
      })
      .catch(function (error) {
        console.log('Response Data: ', response);
      })
      .finally(function () {
        console.log('arrived there');
      });
  };

  useEffect(() => {
    getArticleById(route.params.id);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#14142f',
        paddingHorizontal: 20,
        alignItems: 'center',
      }}>
      {article && (
        <View
          style={{
            width: '100%',
            overflow: 'hidden',
            margin: 20,
          }}>
          <Image
            source={{
              uri:
                'http://192.168.106.26:3000/api/upload/get_file?path=' +
                article.image,
            }}
            style={{width: '100%', height: 200, borderRadius: 16}}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <TouchableOpacity
              style={styles.newsButton}
              onPress={() => console.log('News Button')}>
              <Text style={{fontSize: 18, color: '#fff', fontWeight: '700'}}>
                News
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={clockImg} style={{marginRight: 10}} />
              <Text style={{color: '#fff', fontSize: 16}}>
                {dateString(article.createdAt)}
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 26,
              color: '#fff',
              fontWeight: '700',
              marginTop: 50,
              marginBottom: 30,
            }}>
            {article.title}
          </Text>
          <HTMLView value={article.description} stylesheet={htmlStyleSheet} />
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              marginTop: 80,
            }}>
            <TouchableOpacity style={styles.shareButton}>
              <Image source={shareImg1} style={{marginRight: 10}} />
              <Text style={styles.shareButtonText}>share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.shareButton, backgroundColor: '#57aef5'}}>
              <Image source={shareImg2} style={{marginRight: 10}} />
              <Text style={styles.shareButtonText}>tweet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Image source={shareImg3} style={{marginRight: 10}} />
              <Text style={styles.shareButtonText}>share</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3d6199',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  newsButton: {
    backgroundColor: '#6164ff',
    borderRadius: 12,
    width: 80,
    alignItems: 'center',
    paddingVertical: 5,
  }
});
const htmlStyleSheet = StyleSheet.create({
  h1: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    marginBottom: -50,
  },
  p: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 28,
    marginBottom: -60,
  },
  ul: {
    color: 'white',
    marginBottom: -40,
  },
  li: {
    color: 'white',
    fontSize: 16,
  },
  ol: {
    color: '#fff',
    fontSize: 16,
    marginTop: -20,
    marginBottom: -50,
  },
  blockquote: {
    color: '#fff',
    fontSize: 16,
  },
});
