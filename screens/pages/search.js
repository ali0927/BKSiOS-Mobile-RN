import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getAllCollections} from '../helper/event';
import {SearchCard} from '../components/searchCard';

export const SearchScreen = () => {
  const {t} = useTranslation();
  const [collections, setCollections] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [digitalCollections, setDigitalCollections] = useState([]);
  const [servicesCollections, setServicesCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([
    {
      id: 0,
      title: t('all'),
    },
    {
      id: 1,
      title: t('events'),
    },
    {
      id: 2,
      title: t('digital art'),
    },
    {
      id: 3,
      title: t('services'),
    },
  ]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const searchInfo = useSelector(state => state.searchInfoReducer).searchInfo;
 
  const filterData = collections_ => {
    let res = [];
    if (searchInfo !== null) {
      res = collections_.filter(card =>
        card.name.toLowerCase().includes(searchInfo),
      );
      return res;
    } else {
      return collections_;
    }
  };

  useEffect(() => {
    getAllCollections().then(res => {
      if (res.success) {
        setIsLoading(false);
        console.log(res.collections);
        let temp = [];
        temp = res.collections;
        setAllCollections(temp);
        setCollections(
          temp.filter(collection => collection.category === 'Events'),
        );
        setDigitalCollections(
          temp.filter(collection => collection.category === 'Art'),
        );
        setServicesCollections(
          temp.filter(collection => collection.category === 'Store'),
        );
      } else {
        console.log('ERROR:::', res);
      }
    });
  }, []);

  useEffect(() => {
    console.log("Search info changed", searchInfo);
  }, [searchInfo]);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{maxHeight: 50}}>
        <View style={styles.categoryContainer}>
          {categoryList &&
            categoryList.map(item => (
              <TouchableOpacity
                style={styles.categoryTitle}
                onPress={() => setCurrentCategory(item.id)}
                key={item.id}>
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
        <Text style={styles.subtitle}>
          {categoryList[currentCategory].title}
        </Text>
        {currentCategory === 0 && (
          <SearchCard
            collections={filterData(allCollections)}
            isLoading={isLoading}
          />
        )}
        {currentCategory === 1 && (
          <SearchCard
            collections={filterData(collections)}
            isLoading={isLoading}
          />
        )}
        {currentCategory === 2 && (
          <SearchCard
            collections={filterData(digitalCollections)}
            isLoading={isLoading}
          />
        )}
        {currentCategory === 3 && (
          <SearchCard
            collections={filterData(servicesCollections)}
            isLoading={isLoading}
          />
        )}
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
  subtitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 24,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    lineHeight: 31,
    color: '#fff',
    textTransform: 'capitalize',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    height: 35,
  },
  categoryItem: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    letterSpacing: 1.2,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.33)',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryActive: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    letterSpacing: 1.2,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#6a4dfd',
    backgroundColor: '#6a4dfd',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    lineHeight: 22,
    color: '#fff',
    textAlign: 'center',
    marginRight: 10,
  },
});
