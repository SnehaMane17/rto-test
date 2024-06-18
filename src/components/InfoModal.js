import React from 'react';
import { Modal, Portal, Text, Provider } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native';

const InfoModal = ({ visible, hideModal }) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer} dismissable={true}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            <View style={[styles.circle, { backgroundColor: 'red' }]} /> Fail
          </Text>
          <Text style={styles.text}>
            <View style={[styles.circle, { backgroundColor: 'green' }]} /> Pass
          </Text>
          <Text style={styles.text}>
            <View style={[styles.circle, { backgroundColor: 'grey' }]} /> Not Attempted
          </Text>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // semi-transparent background
  },
  innerContainer: {
    backgroundColor: '#fff', // modal content background
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.46,
    shadowRadius: 16,
    elevation: 10, // for Android shadow
    minWidth: 300, // ensure minimum width
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default InfoModal;
