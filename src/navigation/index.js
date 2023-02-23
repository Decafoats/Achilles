import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LogInScreen from '../screens/LogInScreen/LogInScreen';
import QuestionnaireScreen from '../screens/QuestionnaireScreen/QuestionnaireScreen';
import ImageAnalyzerScreen from '../screens/ImageAnalyzerScreen/ImageAnalyzerScreen';
import ResultScreen from '../screens/ResultScreen/ResultScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#E8F1F5' }
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ImageAnalyzerScreen" component={ImageAnalyzerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer >
  )
}

export default Navigation