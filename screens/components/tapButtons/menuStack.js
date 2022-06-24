import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MenuHomeScreen} from '../../pages/menuHome';
import {ProfileScreen} from '../../pages/profile';
import {ActivityScreen} from '../../pages/activity';
import {AboutScreen} from '../../pages/about';
import {AppSettingScreen} from '../../pages/appSetting';
import arrowLeft from '../../../assets/img/icons/arrow-left.png';
import filterImg from '../../../assets/img/icons/filter.png';
import {useNavigation} from '@react-navigation/core';
import Modal from 'react-native-modal';
import CheckBox from 'react-native-customizable-checkbox';
import checkImg from '../../../assets/img/icons/check.png';

const MenuStack = createNativeStackNavigator();
const THEME_COLOR = '#14142f';

const FilterModal = ({toggleModal}) => {
  const [checked, setChecked] = useState({
    listings: true,
    purchases: true,
    sales: true,
    transfers: true,
    bids: true,
    likes: true,
    follows: true,
  });

  const checkList = [
    {id: 0, title: 'listings'},
    {id: 1, title: 'purchases'},
    {id: 2, title: 'sales'},
    {id: 3, title: 'transfers'},
    {id: 4, title: 'bids'},
    {id: 5, title: 'likes'},
    {id: 6, title: 'follows'},
  ];
  const handleChecked = item => {
    if (item == 0) {
      setChecked({...checked, listings: !checked.listings});
    } else if (item == 1) {
      setChecked({...checked, purchases: !checked.purchases});
    } else if (item == 2) {
      setChecked({...checked, sales: !checked.sales});
    } else if (item == 3) {
      setChecked({...checked, transfers: !checked.transfers});
    } else if (item == 4) {
      setChecked({...checked, bids: !checked.bids});
    } else if (item == 5) {
      setChecked({...checked, likes: !checked.likes});
    } else if (item == 6) {
      setChecked({...checked, follows: !checked.follows});
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View>
        <View style={styles.modalTitle}>
          <Text style={{fontSize: 20, color: '#fff'}}>Filter</Text>
          <Text style={styles.modalClose} onPress={toggleModal}>
            Close
          </Text>
        </View>
        {checkList &&
          checkList.map(item => (
            <TouchableOpacity
              onPress={() => handleChecked(item.id)}
              key={item.id}>
              <CheckBox
                label={item.title}
                value={checked[item.title]}
                onChangeValue={() => handleChecked(item.id)}
                colorInactive={'#09091a'}
                colorActive={'#6a4dfd'}
                textStyle={styles.checkBoxText}
                boxStyle={{
                  ...styles.checkBox,
                  borderColor: checked[item.title] ? '#6a4dfd' : '#ffffff54',
                }}
                containerStyle={styles.checkBoxContainer}
                checkImage={checked[item.title] ? checkImg : ''}
              />
            </TouchableOpacity>
          ))}
      </View>
      <View style={styles.applyButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Applied filter')}>
          <Text style={styles.text3}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const MenuStackScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const toggleModal = () => {
    console.log('This is Modal');
    setModalVisible(!isModalVisible);
  };

  return (
    <MenuStack.Navigator
      initialRouteName="MoreMain"
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME_COLOR,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <MenuStack.Screen
        name="MoreMain"
        component={MenuHomeScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                More
              </Text>
            </View>
          ),
        }}
      />
      <MenuStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                Profile
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MoreMain')}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          ),
        }}
      />
      <MenuStack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                Activity
              </Text>
              <Modal
                isVisible={isModalVisible}
                backdropOpacity={0}
                animationIn={'slideInDown'}
                animationOut={'slideOutUp'}>
                <FilterModal toggleModal={toggleModal} />
              </Modal>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MoreMain')}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleModal}>
              <Image source={filterImg} />
            </TouchableOpacity>
          ),
        }}
      />
      <MenuStack.Screen
        name="Settings"
        component={AppSettingScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  marginLeft: 10,
                  fontWeight: '600',
                }}>
                App Settings
              </Text>
            </View>
          ),
        }}
      />
      <MenuStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: '700',
                  letterSpacing: 0.8,
                }}>
                About
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('MoreMain')}>
              <Image source={arrowLeft} />
            </TouchableOpacity>
          ),
        }}
      />
    </MenuStack.Navigator>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#09091a',
    justifyContent: 'space-between',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderWidth: 0.5,
    paddingBottom: 30,
    marginTop: 20,
    marginBottom: -20,
    marginHorizontal: -20,
  },
  modalTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 60,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(121, 126, 137, 0.5)',
  },
  modalClose: {
    fontSize: 12,
    position: 'absolute',
    fontWeight: '400',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#fff',
    right: 20,
    bottom: 20,
  },
  checkBoxContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    borderColor: 'rgba(121, 126, 137, 0.5)',
    borderBottomWidth: 0.5,
    paddingLeft: 20,
  },
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 4,
  },
  checkBoxText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.03,
    textTransform: 'capitalize',
    fontFamily: 'SpaceGrotesk-Medium',
  },
  applyButton: {
    height: 60,
    borderColor: 'rgba(121, 126, 137, 0.5)',
    borderTopWidth: 0.5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    paddingTop: 12,
    textAlignVertical: 'center',
    height: 44,
    backgroundColor: '#6a4dfd',
    borderRadius: 4,
  },
  text3: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
});
