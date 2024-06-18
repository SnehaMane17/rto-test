import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { fetchPracticeList } from '../services/api';

const QuestionDivision = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const { language, s_id } = route.params;
  const questionsPerPage = 25;

  useEffect(() => {
    const fetchPracticeTestData = async () => {
      try {
        const responseData = await fetchPracticeList(`getPracticeList/`, language, s_id);
        setData(responseData.data);
        setTotalQuestions(responseData.total_count);
      } catch (error) {
        Alert.alert('Error', error.message);
        console.log(error, 'error');
      }
    };

    fetchPracticeTestData();
  }, [language, s_id]);

  const cards = [];
  for (let i = 0; i < Math.ceil(totalQuestions / questionsPerPage); i++) {
    const start = i * questionsPerPage + 1;
    const end = Math.min((i + 1) * questionsPerPage, totalQuestions);
    cards.push({ id: i + 1, start, end });
  }

  const handleCardPress = (start, end) => {
    const newEnd = start + questionsPerPage - 1;
    console.log('handleCardPress', s_id);
    navigation.navigate('Practice Test', { language, start, end: newEnd, s_id });
  };

  const renderItem = ({ item, index }) => {
    const cardNumber = index + 1;

    const cardData = data.find(dataItem =>
      dataItem.question_range === `${item.start} - ${item.end}`
    );

    return (
      <TouchableOpacity
        style={[styles.card, { borderColor: '#007bff' }]}
        onPress={() => handleCardPress(item.start, item.end)}
      >
        <View style={styles.practiceHeader}>
          <View style={[styles.circle, { backgroundColor: getCircleColor(cardData) }]} />
          <Text style={styles.practiceHeaderText}>Practice {cardNumber}</Text>
        </View>
        <View style={styles.practiceRange}>
          <Text>{item.start}</Text>
          <Text>-</Text>
          <Text>{item.end}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getCircleColor = (cardData) => {
    if (cardData) {
      if (cardData.flag === 'fail') {
        return '#dc3545'; // Red color for fail
      } else if (cardData.flag === 'pass') {
        return '#28a745'; // Green color for pass
      }
    }
    return '#6c757d'; // Default gray color
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a practice from below</Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          if (index % 2 === 0) {
            const firstItem = item;
            const secondItem = cards[index + 1];

            return (
              <View style={styles.row}>
                <View style={styles.cardWrapper}>
                  {renderItem({ item: firstItem, index })}
                </View>
                {secondItem && (
                  <View style={styles.cardWrapper}>
                    {renderItem({ item: secondItem, index: index + 1 })}
                  </View>
                )}
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 4, // Adjust padding to reduce distance between cards
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007bff',
    width: '100%',
  },
  practiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  practiceHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  practiceRange: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    alignSelf: 'center',
  },
});

export default QuestionDivision;
