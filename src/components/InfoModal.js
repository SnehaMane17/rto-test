// src/components/InfoModal.js
import React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const InfoModal = ({ visible, hideModal }) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
        <Text style={styles.text}> <View style={[styles.circle, { backgroundColor: 'red' }]} />   Fail</Text>
        <Text style={styles.text}> <View style={[styles.circle, { backgroundColor: 'green' }]} />  Pass</Text>
        <Text style={styles.text}> <View style={[styles.circle, { backgroundColor: 'grey' }]} />  Not Attempted</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={hideModal} textColor="#fff">CLOSE</Button>
        </View> 
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    display: 'inline-block',
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 1,
    color: 'white',
  }
});

export default InfoModal;
