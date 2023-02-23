import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        styles.buttonClose,
        bgColor ? { backgroundColor: bgColor } : {}
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {}
        ]}>
        {text}
      </Text>
    </Pressable >
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',

    padding: 15,
    marginVertical: 5,
    margin: 15,

    alignItems: 'center',
    borderRadius: 5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#005691',
  },
  container_SECONDARY: {
    borderColor: '#005691',
  },
  container_TERTIARY: {
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  text_TERTIARY: {
    color: 'gray',
  },

});

export default CustomButton