import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { login } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [registrationNo, setRegistrationNo] = useState('');
  const [dob, setDob] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const enrollmentInputRef = useRef(null); 

  const handleSignIn = async () => {
    if (!registrationNo) {
      Alert.alert('Validation Error', 'Enrollment number is required');
      return;
    }
    if (!dob) {
      Alert.alert('Validation Error', 'Date of birth is required');
      return;
    }

    console.log('Enrollment:', registrationNo); 
    console.log('Date of Birth:', dob);

    try {
      const response = await login(registrationNo, dob);
      if (response && response.status == 200) {
        const token = response.token;
        const s_id = response.data.s_id;
        navigation.navigate('Home', { token: token, s_id: s_id });
      } else {
        Alert.alert('Login Failed', response.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', 'An error occurred while trying to log in');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set') { 
      const currentDate = selectedDate || dob;
      setShowDatePicker(false);
      const formattedDate = currentDate.toISOString().split('T')[0]; 
      setDob(formattedDate);
    } else {
      setShowDatePicker(false);
    }
  };

  const showDatePickerHandler = () => {
    enrollmentInputRef.current.blur(); 
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text>Enrollment number</Text>
      <TextInput
        ref={enrollmentInputRef} 
        style={styles.input}
        placeholder="Enter enrollment number"
        value={registrationNo}
        onChangeText={setRegistrationNo}
      />
      <Text>Date of birth</Text>
      <TouchableOpacity onPress={showDatePickerHandler}>
        <TextInput
          style={styles.input}
          placeholder="DD-MM-YYYY"
          value={dob}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dob ? new Date(dob) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#007bff',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'black',
    borderRadius: 3,
  },
});

export default LoginScreen;
