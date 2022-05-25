import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View, Text, Button, ScrollView} from 'react-native';
import {ArticleCard} from '../components/newsPage/articleCard';
export const NewsScreen = ({navigation}) => {
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    console.log('GetArticles Function...', articles);
    axios
      .get('http://192.168.106.26:3000/api/article')
      .then(function (response) {
        console.log('Response Data: ', response.data.articles[6].image);
        setArticles(response.data.articles);
      })
      .catch(function (error) {
        console.log('Response Data: ', response);
      })
      .finally(function () {
        console.log('arrived there');
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <ScrollView style={{backgroundColor: "#14142f", paddingHorizontal: 20}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {articles &&
          articles.map((item, key) => (
            <ArticleCard item={item} key={item.id} />
          ))}
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </ScrollView>
  );
};
