import React from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import Modal from 'react-native-modal';

export const AddonModal = ({addon, modalVisible, setModalVisible}) => {
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
    fontSize: 22,
    color: '#fff',
    fontWeight: Platform.OS === 'ios' ? '700' : '500',
    textAlign: 'center',
    marginTop: 5,
  },
  description: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'left',
    marginTop: 15,
  },
});
