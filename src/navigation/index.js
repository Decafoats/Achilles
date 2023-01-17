import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LogInScreen from '../screens/LogInScreen/LogInScreen';
import QuestionnaireScreen from '../screens/QuestionnaireScreen/QuestionnaireScreen';
import ImageAnalyzerScreen from '../screens/ImageAnalyzerScreen/ImageAnalyzerScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#E8F1F5' }
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        {/* <Stack.Screen name="LogInScreen" component={LogInScreen} /> */}
        <Stack.Screen name="QuestionnaireScreen" component={QuestionnaireScreen} />
        <Stack.Screen name="ImageAnalyzerScreen" component={ImageAnalyzerScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  )
}

export default Navigation