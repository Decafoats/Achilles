import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState } from 'react';
import Logo from '../../../assets/images/Achilles.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput';


const LogInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { height } = useWindowDimensions();

  const onLogInPressed = () => {
    console.warn("Log in");
  }

  const onSignUpPressed = () => {
    console.warn("Sign up");
  }

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password.");
  }

  const onLogInFacebook = () => {
    console.warn("Facebook");
  }

  const onLogInGoogle = () => {
    console.warn("Google");
  }

  const onLogInApple = () => {
    console.warn("Apple");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />

        <View style={styles.button}>
          <CustomButton text="Log In" onPress={onLogInPressed} />
          <CustomButton
            text="Forgot Password?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />

          <CustomButton
            text="Log In With Facebook"
            onPress={onLogInFacebook}
            bgColor="#E7EAF4"
            fgColor="#4765A9"
          />
          <CustomButton
            text="Log In With Google"
            onPress={onLogInGoogle}
            bgColor="#FAE9EA"
            fgColor="#DD4D44"
          />
          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPressed}
            type="TERTIARY"
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 50,
  },
  logo: {
    width: '100%',
    maxWidth: 250,
    maxHeight: 250,
  },
  button: {
    width: '100%',
    alignItems: 'center',
  }
});

export default LogInScreen