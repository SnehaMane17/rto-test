import React, {useEffect} from 'react';
import { View, Text, StyleSheet,BackHandler } from 'react-native';

const PracticeResultScreen = ({ route,navigation }) => {
  const { score, token, s_id } = route.params;

  const passThreshold = 12;

  useEffect(() => {
    console.log('PracticeResultScreen received token:', token, 'and s_id:', s_id);
  }, [token, s_id]);

  useEffect(() => {
    const backAction = () => {
      console.log('Navigating back to Home with token:', token, 'and s_id:', s_id);
      navigation.navigate('Practice', {token, s_id});
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, s_id]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Result</Text>
      <Text style={styles.result}>
        Your score: {score}/25
      </Text>
      {score >= passThreshold ? (
        <Text style={styles.pass}>Congratulations! You passed the test.</Text>
      ) : (
        <Text style={styles.fail}>Sorry, you did not pass the test.</Text>
      )}
    </View>
  );
};

export default PracticeResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
   
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,

  },
  result: {
    fontSize: 18,
    marginBottom: 20,
  },
  pass: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    borderRadius: 8,
    padding: 10
  },
  fail: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
     borderRadius: 8,
     padding: 10
  },
});


