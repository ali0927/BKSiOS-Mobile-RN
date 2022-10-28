import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';

export const AddonModal = ({addon, modalVisible, setModalVisible}) => {
  console.log('DATA=>');
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}>
      <View style={styles.container}>
        <Text style={styles.title}>{addon?.name}</Text>
        <Text style={styles.description}>{addon?.description}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#14142f',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 26,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 20,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'justify',
    marginTop: 5,
  },
});
