import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform  } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LanguageSelection = ({ navigation, route }) => {
    const { nextScreen , s_id, token} = route.params;
    const [selectedLanguage, setSelectedLanguage] = useState('english'); // default to English

    const handleStartTest = () => {
        console.log('lang', s_id)
        navigation.navigate(nextScreen, { language: selectedLanguage, s_id, token });

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose test language</Text>

            <Picker
                selectedValue={selectedLanguage}
                style={{ width: 350}} // Add marginBottom to create space below the Picker
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
