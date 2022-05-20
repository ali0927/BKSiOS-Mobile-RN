import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CreatedCarousel from './createdCarousel';
export const Created = () => {
  const [isDetails, setIsDetails] = useState(true);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: 20,
        }}>
        <Text style={styles.text3}>
          {isDetails ? 'Slide View' : 'List View'}
        </Text>
        <TouchableOpacity onPress={() => setIsDetails(!isDetails)}>
          <Text style={styles.text2}>
            {isDetails ? 'List View ' : 'Slide View '}&#10148;
          </Text>
        </TouchableOpacity>
      </View>
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
});
