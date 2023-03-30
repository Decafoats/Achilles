import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from 'react';
import { StyleSheet, useWindowDimensions, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import mediations from "../../data/MediationData";

const ResultScreen = ({ answers }) => {

  const route = useRoute();
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  // Pull JSON data from MediationData
  const data = mediations

  const [currentResult, setCurrentResult] = useState("")
  const [currentMediation, setCurrentMediation] = useState("")
  const [showDropdown, setShowDropdown] = useState(false);


  const handlePress = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    route.params.answers.map((item, index) => {
      if (item.result !== null) {
        setCurrentResult(item.result);
      }
    });
  }, [])

  const renderMediationText = () => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (currentResult !== "" && item.identifier === currentResult) {
        console.log(item.identifier)
        console.log(currentResult)
        return (
          <Text key={item.id} style={{ paddingVertical: 8 }}>
            {item.mediation}
          </Text>
        )
      }
    }
    return null;
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Results</Text>

        <View style={styles.questionAnswerContainer}>
          {route.params.answers.map((item, index) => (
            <View key={index} style={styles.resultContainer}>
              {item.result != null ? <Text style={styles.result}>Your Final Result is: {item.result}</Text> : null}
            </View>
          ))}

          <View style={styles.result}>
            <Text style={{ fontWeight: 'bold', fontSize: width * 0.06 }}>Mediation Methods:</Text>
            {currentResult !== "" && renderMediationText()}
          </View>

          <TouchableOpacity onPress={handlePress} style={styles.dropdownButton}>
            <Text style={styles.buttonText}>Show Questions and Answers</Text>
            <LottieView
              source={require('../../../assets/animations/95940-arrow-down.json')}
              style={{ width: height * 0.02, marginLeft: height * 0.008 }}
              autoPlay
              loop
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownContent}>
              {route.params.answers.map((item, index) => (
                <View>
                  <View key={index} style={styles.answerContainer}>
                    <Text style={styles.question}>{item.question}</Text>
                    <Text style={styles.answer}>{item.answer}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.disclaimer}>
            Disclaimer: Achilles is not a substitute for a licensed podiatrist, and the results provided by the app are not intended to be taken as medical advice or facts. The information and results provided by Achilles are for educational and informational purposes only. If you have any concerns about your foot health or if you have a history of arthritis and diabetes, it is recommended that you consult a licensed podiatrist for professional medical advice and treatment.
          </Text>

        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: width * 0.3,
          paddingTop: height * 0.02
        }}
        >
          <CustomButton
            text="Back to Home"
            onPress={() => navigation.navigate("HomeScreen")}
          />
        </View>

      </View>
    </ScrollView >
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
  resultContainer: {
    borderRadius: 8,
    backgroundColor: '#005691',
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
    marginBottom: 25,
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
    padding: 10,
    fontSize: 10,
    borderRadius: 8,
    color: 'black',
    fontStyle: 'italic',
    backgroundColor: '#DAF0F7',
  },
  dropdownButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  dropdownContent: {
    padding: 10,
    borderRadius: 5,
  },
});

export default ResultScreen;
