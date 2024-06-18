import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import Card from '../components/Card';

const RTOResultScreen = ({ route, navigation }) => {
  const { score , token} = route.params;
  const passThreshold = 9;

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home', { token });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Result</Text>
      <Text style={styles.result}>
        Your score: {score}/15
      </Text>
      {score >= passThreshold ? (
        <Text style={styles.pass}>Congratulations! You passed the test.</Text>
      ) : (
        <Text style={styles.fail}>Sorry, you did not pass the test.</Text>
      )}
    </View>
  );
};

export default RTOResultScreen;

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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10
  },
  fail: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10
  },
});
