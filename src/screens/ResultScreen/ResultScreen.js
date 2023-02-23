import { useRoute } from "@react-navigation/native";
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const ResultScreen = ({ answers }) => {

  const route = useRoute();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Results</Text>
        <View style={styles.questionAnswerContainer}>
          {route.params.answers.map((item, index) => (
            <View key={index} style={styles.answerContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
              {item.result != null ? <Text style={styles.result}>Your Final Result is: {item.result}</Text> : null}
            </View>
          ))}
          <Text style={styles.disclaimer}>
            Disclaimer: Achilles is not a substitute for a licensed podiatrist, and the results provided by the app are not intended to be taken as medical advice or facts. The information and results provided by Achilles are for educational and informational purposes only. If you have any concerns about your foot health or if you have a history of arthritis and diabetes, it is recommended that you consult a licensed podiatrist for professional medical advice and treatment.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#005691',
    marginBottom: 16,
    textShadowColor: '#B6C7E7',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  questionAnswerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#005691',
    marginBottom: 5
  },
  answerContainer: {
    marginBottom: 5,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#DAF0F7',
  },
  answer: {
    color: '#F0F0ED',
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#DAF0F7',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#6F3030"
  },
  disclaimer: {
    paddingTop: 10,
    paddingHorizontal: 5,
    fontSize: 10,
    color: 'white',
    fontStyle: 'italic'
  }
});

export default ResultScreen;
