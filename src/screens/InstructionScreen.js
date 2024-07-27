
import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Platform, Alert } from 'react-native';
import { fetchPracticeDataStatus } from '../services/api';

const InstructionScreen = ({ navigation, route }) => {
  const { language, s_id,  token } = route.params;

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPracticeTestDataStatus = async () => {
      try {
        const responseData = await fetchPracticeDataStatus(`getPracticeCompletionStatus/`, language, s_id);
        setData(responseData.data);
        console.log('cattt', responseData.data)
      } catch (error) {
        Alert.alert('Error', error.message);
        console.log(error, 'error');
      }
    };

    fetchPracticeTestDataStatus();
  }, []);


  const instructions = {
    english: [
      "1. Total Question 431 are present in the Question Bank.",
      "2. Randomly 15 questions are asked in online Exam.",
      "3. Correct right answer are required for qualifying for Learner's Licence.",
      "4. Each Question is for 30 seconds duration.",
      "5. Applicant has to report 1 hour before the appoint time.",
      "6. Original documents are to be brought for verification at the time of appointment.",
    ],
    hindi: [
      "1.  प्रश्नसमूह में कुल 431 प्रश्न हैं।",
      "2. ऑनलाइन परीक्षा में कोई भी 15 प्रश्न पूछे जाएंगे।",
      "3. लर्नर लाइसेंस के लिए अर्हता प्राप्त करने के लिए सही उत्तर आवश्यक हैं।",
      "4. प्रत्येक प्रश्न की अवधि 30 सेकंड है।",
      "5. आवेदक को नियुक्ति समय से 1 घंटे पहले रिपोर्ट करना आवश्यक है।",
      "6. नियुक्ति के समय सत्यापन के लिए मूल दस्तावेज लाने होंगे।",
    ],
  };

  const handleStartTest = () => {
    if (data.status) {
      navigation.navigate('RTOTest', { language, s_id, token });
    } else {
      Alert.alert(
        language === 'hindi' ? 'कृपया ६०% अभ्यास परीक्षा पूरी करें।' : 'Please complete atleast 60 % of the Practice test.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {language === 'hindi' ? 'अनुदेश' : 'Instructions'}</Text>
      {instructions[language].map((instruction, index) => (
        <Text key={index} style={styles.instructions}>{instruction}</Text>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Start Test" onPress={handleStartTest} color={Platform.OS === 'ios' ? '#fff' : ''} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
     width: '100%',
    backgroundColor: '#007bff',
    borderRadius: 10,
    marginTop: 40,
    alignSelf: 'center'
  },
});

export default InstructionScreen;



