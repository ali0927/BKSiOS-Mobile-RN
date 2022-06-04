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
import shareImg1 from '../../assets/img/icons/facebook.png';
import shareImg2 from '../../assets/img/icons/twitter.png';
import shareImg3 from '../../assets/img/icons/medium.png';

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
    <View style={{backgroundColor: "#14142f", flex: 1}}>
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
              style={{
                width: '100%',
                height: 200,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                backgroundColor: 'pink',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={clockImg} style={{marginRight: 10}} />
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.66)',
                    fontSize: 12,
                    fontWeight: '400',
                    letterSpacing: 1.05,
                  }}>
                  {dateString(article.createdAt)}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={messageImg} style={{marginRight: 5}} />
                <Text
                  style={{
                    color: 'rgba(255, 255, 255, 0.66)',
                    fontSize: 12,
                    fontWeight: '400',
                  }}>
                  0
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'flex-start',
              }}
              onPress={() => console.log('Clicked News Button')}>
              <Text
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.66)',
                  fontWeight: '500',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden',
                  borderRadius: 11,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginTop: 20,
                }}>
                News
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 24,
                color: '#fff',
                fontWeight: '700',
                marginTop: 10,
                marginBottom: 10,
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
    </View>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3d6199',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
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
  },
});
const htmlStyleSheet = StyleSheet.create({
  h1: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginBottom: -50,
  },
  p: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 20,
    fontWeight: '400',
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
