// src/navigation/AppNavigator.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import PracticeTest from '../screens/PracticeTest';
import RTOTest from '../screens/RTOTest';
import LanguageSelection from '../screens/LanguageSelection';
import QuestionDivision from '../screens/QuestionDivision';
import InstructionScreen from '../screens/InstructionScreen';
import PracticeResultScreen from '../screens/PracticeResultScreen';
import RTOResultScreen from '../screens/RTOResultScreen';
import Reading from '../screens/Reading';
import LoginScreen from '../screens/LoginScreen';
import InfoModal from '../components/InfoModal';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [infoVisible, setInfoVisible] = useState(false);

  const showInfoModal = () => setInfoVisible(true);
  const hideInfoModal = () => setInfoVisible(false);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen
            name="Practice Test"
            component={PracticeTest}
            options={{ headerTitleAlign: 'center' }}
          />
          <Stack.Screen name="RTOTest" component={RTOTest} options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen name="Language Selection" component={LanguageSelection} options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen
            name="Practice"
            component={QuestionDivision}
            options={({ navigation }) => ({
              headerTitleAlign: 'center',
              headerRight: () => (
                <IconButton icon="information" onPress={showInfoModal} size={40}/>
              ),
            })}
          />
          <Stack.Screen name="Instructions" component={InstructionScreen} options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen name="PracticeResult" component={PracticeResultScreen} options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen name="RTOResultScreen" component={RTOResultScreen} options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen name="Reading" component={Reading} options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitleAlign: 'center' }} />
        </Stack.Navigator>
        <InfoModal visible={infoVisible} hideModal={hideInfoModal} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigator;
