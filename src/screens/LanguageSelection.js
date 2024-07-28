import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, Alert  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {fetchReadingDataStatus } from '../services/api';

const LanguageSelection = ({ navigation, route }) => {
    const { nextScreen , s_id, token} = route.params;
    const [data, setData] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('english'); // default to English

    const handleStartTest = async () => {
        if (nextScreen === 'Practice') {
            try {
                const responseData = await fetchReadingDataStatus(`getReadingCompletionStatus/`, selectedLanguage, s_id);
                if (responseData.data === false) {
                    Alert.alert('Alert', 'Please complete 60% reading  practice.');
                } else {
                    navigation.navigate(nextScreen, { language: selectedLanguage, s_id, token });
                }
            } catch (error) {
                Alert.alert('Error', error.message);
                console.log(error, 'error');
            }
        } else {
            navigation.navigate(nextScreen, { language: selectedLanguage, s_id, token });
        }
    };
    

    useEffect(() => {
        if (nextScreen === 'Practice') {
            const fetchPracticeTestDataStatus = async () => {
                try {
                    const responseData = await fetchReadingDataStatus(`getReadingCompletionStatus/`, selectedLanguage, s_id);
                    setData(responseData.data);
                    console.log('cattt', responseData.data);
                } catch (error) {
                    Alert.alert('Error', error.message);
                    console.log(error, 'error');
                }
            };

            fetchPracticeTestDataStatus();
        }
    }, [nextScreen, selectedLanguage, s_id]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose test language</Text>

            <Picker
                selectedValue={selectedLanguage}
                style={{ width: 350}} 
                onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
                <Picker.Item label="English" value="english" />
                <Picker.Item label="Hindi" value="hindi" />
            
            </Picker>

            <View style={styles.buttonContainer}>
                <Button title="Start Test" onPress={handleStartTest}  color={Platform.OS === 'ios' ? '#fff' : ''} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    title: {
        fontSize: 24,
        // fontWeight: 'bold',
        marginTop: -200
    },
    buttonContainer: {
        width: '90%', 
        backgroundColor: '#007bff', 
        borderRadius: 10,
        marginTop: 40
    }
});

export default LanguageSelection;
