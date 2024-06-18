// src/screens/HomeScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '../components/Card';

const HomeScreen = ({ navigation, route  }) => { 
  const { token, s_id} = route.params;
  const navigateToLanguageSelection = (nextScreen) => {
    console.log('home', s_id)
    navigation.navigate('Language Selection', { nextScreen, token ,s_id });
  };

  return (
    <View style={styles.container}>
      <Card
        title="Reading"
        description="Comprehensive list of all questions and answers"
        iconName="menu-book"
        onPress={() =>navigateToLanguageSelection('Reading')}
      />
      <Card
        title="Practice Test"
        description="Test your knowledge with time and question bound tests"
        iconName="book"
        onPress={() => navigateToLanguageSelection('Practice')}
      />
        <Card
        title="RTO Test"
        description="Random questions and time bound test exactly same as actual RTO test"
        iconName="directions-car"
        onPress={() => navigateToLanguageSelection('Instructions', 'english')}
      />
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
});

export default HomeScreen;
