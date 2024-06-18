import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionDivision = ({ route, navigation }) => {
  const { language, s_id } = route.params;
  const totalQuestions = 431;
  const questionsPerPage = 25;

  const cards = Array.from({ length: Math.ceil(totalQuestions / questionsPerPage) }, (_, index) => ({
    id: index + 1,
    start: index * questionsPerPage + 1,
    end: Math.min((index + 1) * questionsPerPage, totalQuestions),
  }));

  const handleCardPress = (start, end) => {
    const newEnd = start + questionsPerPage - 1;
    console.log('hndlehhandle', s_id)
    navigation.navigate('Practice Test', { language, start, end: newEnd, s_id });
  };

  const renderItem = ({ item, index }) => {
    const cardNumber = index + 1;
    if (index % 2 === 0) {
      return (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item.start, item.end)}
          >
            <View style={styles.practiceHeader}>
              <Text style={styles.practiceHeaderText}>Practice {cardNumber}</Text>
            </View>
            <View style={styles.practiceRange}>
              <Text>{item.start}</Text>
              <Text>-</Text>
              <Text>{item.end}</Text>
            </View>
          </TouchableOpacity>
          {cards[index + 1] && (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardPress(cards[index + 1].start, cards[index + 1].end)}
            >
              <View style={styles.practiceHeader}>
                <Text style={styles.practiceHeaderText}>Practice {cardNumber + 1}</Text>    
              </View>
              <View style={styles.practiceRange}>
                <Text>{cards[index + 1].start}</Text>
                <Text>-</Text>
                <Text>{cards[index + 1].end}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a practice from below</Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
  card: {
    flex: 1,
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007bff',
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
    marginRight: 4
  },
  practiceRange: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default QuestionDivision;
