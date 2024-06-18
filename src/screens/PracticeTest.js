import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, Image, TouchableOpacity } from 'react-native';
import { fetchData, saveScore, getScore, BASE_URL } from '../services/api';
import { RadioButton } from 'react-native-paper';

const PracticeTest = ({ route, navigation }) => {
  const { language, start, end, token, s_id } = route.params;
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [results, setResults] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [disabledQuestions, setDisabledQuestions] = useState({});
  const [previousScore, setPreviousScore] = useState(null);
  const [timer, setTimer] = useState(30);
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchPracticeTestData = async () => {
      try {
        const responseData = await fetchData(`getquestions/`, language, 25, start);
        console.log(responseData);
        setData(responseData.data);
        setTimer(30);
      } catch (error) {
        Alert.alert('Error', error.message);
        console.log(error, 'error');
      }
    };

    const fetchPreviousScore = async () => {
      try {
        const previousscoreData = await getScore('getPreviousScore/', 1, 25, start);
        if (previousscoreData.status === "success" && previousscoreData.data.length > 0) {
          setPreviousScore(previousscoreData.data[0].score);
        } else {
          console.log("No previous score data available");
        }
      } catch (error) {
        console.log(error, 'error');
      }
    };

    fetchPracticeTestData();
    fetchPreviousScore();
    
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [language, start, end, currentIndex]);

  useEffect(() => {
    if (timer === 0) {
      handleNext();
    } else {
      const timerId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timer]);


  const handleOptionSelect = (examquestion_id, option) => {
    setSelectedOption({ ...selectedOption, [examquestion_id]: option });
    setDisabledQuestions({ ...disabledQuestions, [examquestion_id]: false });
    checkAnswers(examquestion_id, option);
  };

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

  const checkAnswers = (examquestion_id, selectedOption) => {
    const question = data.find(q => q.examquestion_id === examquestion_id);
    const correctAnswer = findCorrectAnswer(question);
    setResults({ ...results, [examquestion_id]: selectedOption === correctAnswer });
  };

  const handleNext = () => {
    setShowResults(true); // show results when "Next" is clicked
    setTimeout(() => {
      setShowResults(false); // reset showing results for the next question
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTimer(30); // Reset timer for the next question
      }
    }, 2000); 
  };

  const handleSubmit = async () => {
    const attemptedQuestions = Object.keys(selectedOption).length;
    const correctAnswers = Object.values(results).filter(result => result === true).length;
    const notAttempted = data.length - attemptedQuestions;
    const flag = correctAnswers >= 12 ? 'pass' : 'fail';

    const scoreData = {
      student_id: s_id,
      score: correctAnswers,
      attempted: attemptedQuestions,
      not_attempted: notAttempted,
      flag:flag,
      limit: 25,
      offset: start
    };
    console.log(scoreData, 'scoree data')

    try {
      const response = await saveScore('savescore', scoreData, token);
      console.log(response.data);
      setSubmitted(true);
      navigation.navigate('PracticeResult', { score: correctAnswers, token });
    } catch (error) {
      Alert.alert('Error', 'Failed to save score');
      console.log(error, 'error');
    }
  }

  const question = data[currentIndex];
  const correctAnswersCount = Object.values(results).filter(result => result === true).length;

  const getOptionStyle = (question, option) => {
    const correctAnswer = findCorrectAnswer(question);
    const selectedAnswer = selectedOption[question.examquestion_id];

    if (showResults) {
      if (option === correctAnswer) return styles.correctOption;
      if (selectedAnswer && selectedAnswer !== correctAnswer && option !== correctAnswer) return styles.incorrectOption;
      if (!selectedAnswer && option !== correctAnswer) return styles.incorrectOption;
    }

    return styles.defaultOption;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Question {currentIndex + 1} / 25</Text>
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
          <RadioButton.Group
            onValueChange={(newValue) => handleOptionSelect(question.examquestion_id, newValue)}
            value={selectedOption[question.examquestion_id]}
          >
            <TouchableOpacity
              style={[styles.radioButtonContainer, getOptionStyle(question, question.OPTION1)]}
              onPress={() => handleOptionSelect(question.examquestion_id, question.OPTION1)}
              disabled={disabledQuestions[question.examquestion_id]}
            >
              <RadioButton
                value={question.OPTION1}
                disabled={disabledQuestions[question.examquestion_id]}
                color='#007BFF'
              />
              <Text style={styles.optionText}>{question.OPTION1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButtonContainer, getOptionStyle(question, question.OPTION2)]}
              onPress={() => handleOptionSelect(question.examquestion_id, question.OPTION2)}
              disabled={disabledQuestions[question.examquestion_id]}
            >
              <RadioButton
                value={question.OPTION2}
                disabled={disabledQuestions[question.examquestion_id]}
                 color='#007BFF'
              />
              <Text style={styles.optionText}>{question.OPTION2}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButtonContainer, getOptionStyle(question, question.OPTION3)]}
              onPress={() => handleOptionSelect(question.examquestion_id, question.OPTION3)}
              disabled={disabledQuestions[question.examquestion_id]}
            >
              <RadioButton
                value={question.OPTION3}
                disabled={disabledQuestions[question.examquestion_id]}
                 color='#007BFF'
              />
              <Text style={styles.optionText}>{question.OPTION3}</Text>
            </TouchableOpacity>
          </RadioButton.Group>
      
        </View>
      )}
     
      <View style={styles.buttonSubmit}>
 {currentIndex < data.length - 1 ? (
          <Button title="Next" onPress={handleNext} disabled={!selectedOption[question?.examquestion_id] || submitted} />
        ) : (
          <Button title="Submit" onPress={handleSubmit} disabled={!selectedOption[question?.examquestion_id] || submitted} />
        )}
      </View>
      <View style={styles.scoreContainer}>
        <View style={styles.scoreSection}>
          <Text style={styles.scoreLabelText}>Current Score</Text>
          <Text style={styles.scoreValueText}>{correctAnswersCount}/25</Text>
        </View>
        <View style={styles.scoreSection}>
          <Text style={styles.scoreLabelText}>Time remaining</Text>
          <Text style={[styles.scoreValueText, timer <= 5 && styles.redText]}>{timer}</Text>
        </View>
        <View style={styles.scoreSection}>
          <Text style={styles.scoreLabelText}>Previous Score</Text>
          <Text style={styles.scoreValueText}>{previousScore !== null ? `${previousScore}/25` : 'NA'}</Text>
        </View>
      </View>
    </View>
  );
};

export default PracticeTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
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
    padding: 10,
    borderRadius: 5,
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
  },
  buttonSubmit: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 5,
  },
  scoreContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreSection: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  previousScoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreLabelText: {
    fontWeight: 'bold',
  },
  scoreValueText: {
    color: 'green',
    fontWeight: 'bold',
  },
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  defaultOption: {
    backgroundColor: 'transparent',
  },
redText: {
    color: 'red',
  },
  image: {
    width: '100%', // Adjust the width as needed
    height: 70,   // Adjust the height as needed
    resizeMode: 'contain',
    marginTop: 8,
    marginBottom: 8
  }
});
