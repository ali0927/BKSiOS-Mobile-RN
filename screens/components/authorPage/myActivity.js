import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from 'react-native-check-box';

import CreatedCarousel from './createdCarousel';
export const MyActivity = () => {
  const [isDetails, setIsDetails] = useState(true);
  const [checked, setChecked] = useState({
    all: true,
    listings: false,
    purchases: false,
    sales: false,
    transfers: false,
    bids: false,
    likes: false,
    followings: false,
  });
  const [filters, setFilters] = useState(true);

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
      setChecked({...checked, followings: !checked.followings});
    } else if (item == 100) {
      setChecked({
        ...checked,
        all: !checked.all,
        listings: !checked.all,
        purchases: !checked.all,
        sales: !checked.all,
        transfers: !checked.all,
        bids: !checked.all,
        likes: !checked.all,
        followings: !checked.all,
      });
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setFilters(!filters)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 20,
          paddingLeft: 20,
          marginTop: 20,
          borderColor: '#6164ff',
          borderBottomWidth: 1,
        }}>
        <Text style={{color: '#fff', fontSize: 20}}>Filters</Text>
        <Text style={{color: '#fff', fontSize: 20}}>
          {filters ? <>&#9650;</> : <>&#9660;</>}
        </Text>
      </TouchableOpacity>
      {filters && (
        <View style={{padding: 20, marginBottom: 30, borderBottomWidth: 3, borderColor: "#6164ff"}}>
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              handleChecked(100);
            }}
            isChecked={checked.all}
            checkBoxColor={'#534f77'}
            rightTextStyle={styles.checkBoxText}
            rightText={'Select All'}
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              handleChecked(0);
            }}
            isChecked={checked.listings}
            checkBoxColor={'#534f77'}
            rightTextStyle={styles.checkBoxText}
            rightText={'Listings'}
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              handleChecked(1);
            }}
            isChecked={checked.purchases}
            checkBoxColor={'#534f77'}
            rightTextStyle={styles.checkBoxText}
            rightText={'Purchases'}
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              handleChecked(2);
            }}
            isChecked={checked.sales}
            checkBoxColor={'#534f77'}
            rightTextStyle={styles.checkBoxText}
            rightText={'Sales'}
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              handleChecked(3);
            }}
            isChecked={checked.transfers}
            checkBoxColor={'#534f77'}
            rightTextStyle={styles.checkBoxText}
            rightText={'Transfers'}
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              handleChecked(4);
            }}
            isChecked={checked.bids}
            checkBoxColor={'#534f77'}
            rightTextStyle={styles.checkBoxText}
            rightText={'Bids'}
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              handleChecked(5);
            }}
            isChecked={checked.likes}
            checkBoxColor={'#534f77'}
            rightTextStyle={styles.checkBoxText}
            rightText={'Likes'}
          />
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              handleChecked(6);
            }}
            isChecked={checked.followings}
            checkBoxColor={'#534f77'}
            rightTextStyle={styles.checkBoxText}
            rightText={'Followings'}
          />
        </View>
      )}

      {isDetails && <CreatedCarousel />}
      {!isDetails && (
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              marginLeft: 20,
              marginTop: 50,
            }}>
            Created Lists Here...
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text2: {
    color: '#6164ff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  text3: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  checkBox: {
    width: 350,
    height: 30,
    marginTop: 10,
  },
  checkBoxText: {
    color: '#fff',
    fontSize: 20,
  },
});
