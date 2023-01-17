import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import Logo from '../../../assets/images/Achilles.png'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onLogInPressed = () => {
    // Validate user
    navigation.navigate('LogInScreen');
  }

  const onQuestionnairePressed = () => {
    navigation.navigate('QuestionnaireScreen');
  }

  const onImageAnalyzerPressed = () => {
    navigation.navigate('ImageAnalyzerScreen');
  }

  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <View style={styles.button}>
        {/* <CustomButton text="Log In" onPress={onLogInPressed} /> */}
        <CustomButton text="Questionnaire" onPress={onQuestionnairePressed} />
        <CustomButton text="Image Analyzer" onPress={onImageAnalyzerPressed} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 100,
  },
  logo: {
    width: '100%',
    maxWidth: 250,
    maxHeight: 250,
  },
  button: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 270,
  }
});

export default HomeScreen