import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Banner} from '../components/authorPage/banner';
import {Created} from '../components/authorPage/created';
import {MyActivity} from '../components/authorPage/myActivity';
import {OnSale} from '../components/authorPage/onSale';
import {Overview} from '../components/authorPage/overview';
import {Profile} from '../components/authorPage/profile';

export const AuthorScreen = ({navigation}) => {
  const [selected, setSelected] = useState(0);
  return (
    <ScrollView stickyHeaderIndices={[0]} style={styles.container}>
      <ScrollView horizontal={true}>
        <View style={styles.categories}>
          <TouchableOpacity onPress={() => setSelected(0)}>
            <Text
              style={
                selected === 0
                  ? styles.categorySelectedText
                  : styles.categoryText
              }>
              OverView
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(1)}>
            <Text
              style={
                selected === 1
                  ? styles.categorySelectedText
                  : styles.categoryText
              }>
              Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(2)}>
            <Text
              style={
                selected === 2
                  ? styles.categorySelectedText
                  : styles.categoryText
              }>
              Created
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(3)}>
            <Text
              style={
                selected === 3
                  ? styles.categorySelectedText
                  : styles.categoryText
              }>
              My Activity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(4)}>
            <Text
              style={
                selected === 4
                  ? styles.categorySelectedText
                  : styles.categoryText
              }>
              On Sale
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {selected === 0 && (
        <>
          <Banner />
          <Overview />
        </>
      )}
      {selected === 1 && <Profile />}
      {selected === 2 && <Created />}
      {selected === 3 && <MyActivity />}
      {selected === 4 && <OnSale />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14142f',
  },
  categories: {
    flexDirection: 'row',
    alignItems: "center",
    padding: 20,
    borderColor: '#fff',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    backgroundColor: '#14142f',
  },
  categoryText: {
    color: '#887bff',
    fontSize: 20,
    marginRight: 20,
  },
  categorySelectedText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: "600",
    marginRight: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  divider: {
    width: '100%',
    backgroundColor: '#887bff',
    height: 2,
    marginTop: 50,
    marginBottom: 20,
  },
});
