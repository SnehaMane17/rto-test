import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, TextInput, Image } from 'react-native';
import { fetchData, BASE_URL } from '../services/api';
import { RadioButton } from 'react-native-paper';

const Reading = ({ route, navigation }) => {
  const { language, start, end } = route.params;
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [questionNumber, setQuestionNumber] = useState('');

  useEffect(() => {
    const fetchPracticeTestData = async () => {
      try {
        const responseData = await fetchData(`getquestions/`, language, 450, 1);
        setData(responseData.data);
      } catch (error) {
        Alert.alert('Error', error.message);
        console.log(error, 'error');
      }
    };

    fetchPracticeTestData();
  }, [language, start, end, currentIndex]);

  const findCorrectAnswer = (question) => {
    if (question && question.ANSWER) {
      const correctAnswer = question.ANSWER;
      if (correctAnswer === '1') return question.OPTION1;
      if (correctAnswer === '2') return question.OPTION2;
      if (correctAnswer === '3') return question.OPTION3;
      if (correctAnswer === '4') return question.OPTION4;
    }
    return 'Answer Not Found';
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleGoToQuestion = () => {
    const questionIndex = parseInt(questionNumber, 10) - 1;
    if (questionIndex >= 0 && questionIndex < data.length) {
      setCurrentIndex(questionIndex);
      setShowInput(false);
      setQuestionNumber('');
    } else {
      Alert.alert('Invalid question number');
    }
  };

  const question = data[currentIndex];

  const getOptionStyle = (question, option) => {
    const correctAnswer = findCorrectAnswer(question);
    if (option === correctAnswer) {
      return styles.correctOption;
    }
    return styles.incorrectOption;
  };

  if (showInput) {
    return (
      <View style={styles.inputContainer}>
      <Text style={styles.inputPlaceholder}>Enter question number</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={questionNumber}
        onChangeText={setQuestionNumber}
      />
      {questionNumber > 431 && (
        <Text style={styles.errorMessage}>Question number cannot be greater than 431</Text>
      )}
      <View style={styles.buttonProceed}>
        <Button title="Proceed" onPress={handleGoToQuestion} disabled={!questionNumber || questionNumber > 431} />
      </View>
    </View>
    
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question {currentIndex + 1} / 431</Text>
      {question && (
        <View style={[styles.itemContainer]}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.question}>{question.QUESTION}</Text>
          </View>
          {question.IMAGE && (
        <Image 
          source={{ uri: `${BASE_URL}${question.IMAGE}` }} 
          style={styles.image}
        />
      )}
          <RadioButton.Group value={null}>
            <View style={styles.radioButtonContainer}>
              <View style={[styles.radioButtonWrapper, getOptionStyle(question, question.OPTION1)]}>
                <RadioButton value={question.OPTION1} />
              </View>
              <Text style={styles.optionText}>{question.OPTION1}</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <View style={[styles.radioButtonWrapper, getOptionStyle(question, question.OPTION2)]}>
                <RadioButton value={question.OPTION2} />
              </View>
              <Text style={styles.optionText}>{question.OPTION2}</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <View style={[styles.radioButtonWrapper, getOptionStyle(question, question.OPTION3)]}>
                <RadioButton value={question.OPTION3} />
              </View>
              <Text style={styles.optionText}>{question.OPTION3}</Text>
            </View>
          </RadioButton.Group>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={handlePrevious} disabled={currentIndex === 0} />
        <Button title="Go to Question" onPress={() => setShowInput(true)} />
        <Button title="Next" onPress={handleNext} disabled={currentIndex === data.length - 1}/>
      </View>
    </View>
  );
};

export default Reading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#F9F3F2',
    padding: 20,
    borderRadius: 5,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioButtonWrapper: {
    borderRadius: 15,
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    flexShrink: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  
  inputPlaceholder: {
    marginBottom: 5,
    color: 'gray',
    textAlign: 'left'
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    fontSize: 40,
    height: 80,
    textAlignVertical: 'top',
  },
 
  buttonProceed: {
    width: '100%', 
    backgroundColor: '#007bff', 
    borderRadius: 10,
    marginTop: 20
},
errorMessage: {
  color: 'red',
  textAlign: 'left',
},
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  image: {
    width: '100%', 
    height: 70,  
    resizeMode: 'contain',
    marginTop: 8,
    marginBottom: 8
  }
});
