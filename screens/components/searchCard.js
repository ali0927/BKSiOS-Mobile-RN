import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import config from '../helper/config';
import {Loading} from './loading';

const deviceWidth = Dimensions.get('window').width;
export const SearchCard = ({collections, isLoading}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  useEffect(() => {
    console.log('FSAFAF', isLoading, 'VVV==>', collections);
  }, []);
  return (
    <View style={styles.resultContainer}>
      {isLoading && <Loading />}
      {collections &&
        collections.map((collection, i) => {
          return (
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
                  style={styles.backImg}
                  resizeMode={FastImage.resizeMode.contain}
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
                    {collection.category}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: deviceWidth / 2 - 30,
    height: deviceWidth / 2 - 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  resultBackImg: {
    height: deviceWidth / 2 - 115,
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
