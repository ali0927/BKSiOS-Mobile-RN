import {useNavigation} from '@react-navigation/core';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from 'react-native-customizable-checkbox';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import arrowLeft from '../../../assets/img/icons/arrow-left.png';
import checkImg from '../../../assets/img/icons/check.png';
import blackImg from '../../../assets/img/BLANK_ICON.png';
import filterImg from '../../../assets/img/icons/filter.png';
import {AboutScreen} from '../../pages/about';
import {ActivityScreen} from '../../pages/activity';
import {AppSettingScreen} from '../../pages/appSetting';
import {MenuHomeScreen} from '../../pages/menuHome';
import {ProfileScreen} from '../../pages/profile';

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
    console.log('Item::', item);
    if (item === 0) {
      setChecked({...checked, listings: !checked.listings});
    } else if (item === 1) {
      setChecked({...checked, purchases: !checked.purchases});
    } else if (item === 2) {
      setChecked({...checked, sales: !checked.sales});
    } else if (item === 3) {
      setChecked({...checked, transfers: !checked.transfers});
    } else if (item === 4) {
      setChecked({...checked, bids: !checked.bids});
    } else if (item === 5) {
      setChecked({...checked, likes: !checked.likes});
    } else if (item === 6) {
      setChecked({...checked, follows: !checked.follows});
    }
  };
  const handleApply = () => {
    toggleModal();
    Toast.show({
      type: 'success',
      text1: 'Applied the choosen items.',
    });
  };

  return (
    <View style={styles.modalContainer}>
      <View>
        <View style={styles.modalTitle}>
          <Text style={styles.modalTitleText}>Filter</Text>
          <Text style={styles.modalClose} onPress={toggleModal}>
            Close
          </Text>
        </View>
        {checkList &&
          checkList.map(item => (
            <View key={item.id} style={styles.checkBoxContainer}>
              <CheckBox
                label=""
                value={checked[item.title]}
                onChangeValue={() => handleChecked(item.id)}
                colorInactive={'#09091a'}
                colorActive={'#6a4dfd'}
                boxStyle={{
                  ...styles.checkBox,
                  borderColor: checked[item.title] ? '#6a4dfd' : '#ffffff54',
                }}
                containerStyle={styles.checkBoxMark}
                checkImage={checked[item.title] ? checkImg : blackImg}
              />
              <TouchableOpacity
                onPress={() => handleChecked(item.id)}
                style={{flex: 1}}>
                <Text style={styles.checkBoxText}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <View style={styles.applyButton}>
        <TouchableOpacity style={styles.button} onPress={() => handleApply()}>
          <Text style={styles.text3}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const MenuStackScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const Header = ({title}) => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('MoreMain')}>
          <Image source={arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.titleText}>{title}</Text>
        <View style={{width: 60}} />
      </View>
    );
  };

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
      }}>
      <MenuStack.Screen
        name="MoreMain"
        component={MenuHomeScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <View />
              <Text style={styles.titleText}>More</Text>
              <View />
            </View>
          ),
        }}
      />
      <MenuStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: () => <Header title="Your Profile" />,
          headerBackVisible: false,
        }}
      />
      <MenuStack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('MoreMain')}>
                <Image source={arrowLeft} />
              </TouchableOpacity>
              <Text style={styles.titleText}>Activity</Text>
              <Modal
                isVisible={isModalVisible}
                backdropOpacity={0}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}>
                <FilterModal toggleModal={toggleModal} />
              </Modal>
              <TouchableOpacity onPress={toggleModal}>
                <Image source={filterImg} />
              </TouchableOpacity>
            </View>
          ),
          headerBackVisible: false,
        }}
      />
      <MenuStack.Screen
        name="Liked"
        component={ActivityScreen}
        options={{
          headerTitle: () => <Header title="Liked" />,
          headerBackVisible: false,
        }}
      />
      <MenuStack.Screen
        name="Settings"
        component={AppSettingScreen}
        options={{
          headerTitle: () => <Header title="App Settings" />,
          headerBackVisible: false,
        }}
      />
      <MenuStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTitle: () => <Header title="About" />,
          headerBackVisible: false,
        }}
      />
    </MenuStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    letterSpacing: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#09091a',
    justifyContent: 'space-between',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderWidth: 0.5,
    paddingBottom: 30,
    marginTop: Platform.OS === 'ios' ? 20 : -10,
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
  modalTitleText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    letterSpacing: 1.03,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 60,
    borderColor: 'rgba(121, 126, 137, 0.5)',
    borderBottomWidth: 0.5,
    paddingLeft: 20,
  },
  checkBoxMark: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 4,
  },
  checkBoxText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
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
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 16,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 40,
  },
  titleText: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'right',
    letterSpacing: 1.03,
  },
});
