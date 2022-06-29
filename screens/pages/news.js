import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ArticleCard} from '../components/newsPage/articleCard';
import config from '../helper/config';

export const NewsScreen = () => {
  const [categoryList, setCategoryList] = useState([
    {
      id: 0,
      title: 'All',
    },
  ]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    axios
      .get(config.API_BASE_URL + '/api/article')
      .then(function (response) {
        setArticles(response.data.articles);
      })
      .catch(function (error) {
        console.log('error Data: ', error);
      })
      .finally(function () {
        console.log('arrived there');
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryContainer}>
          {categoryList &&
            categoryList.map(item => (
              <TouchableOpacity
                style={styles.categoryTitle}
                onPress={() => setCurrentCategory(item.id)}>
                <Text
                  style={
                    item.id === currentCategory
                      ? styles.categoryActive
                      : styles.categoryItem
                  }>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <ScrollView>
        <View style={styles.articleContainer}>
          {articles &&
            articles.map(item => <ArticleCard item={item} key={item.id} />)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#14142f',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    marginTop: 10,
    paddingLeft: 10,
  },
  categoryTitle: {
    alignItems: 'flex-start',
    marginLeft: 10,
    height: 24,
    justifyContent: 'center',
  },
  categoryItem: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.33)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryActive: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#6a4dfd',
    backgroundColor: '#6a4dfd',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  articleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
});
