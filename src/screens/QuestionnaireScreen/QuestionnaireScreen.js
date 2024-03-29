import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import questions from "../../data/QuestionnaireData";

const QuestionnaireScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  // Pull JSON data from QuestionnaireData
  const data = questions;
  // Option Index
  const [index, setIndex] = useState(0)
  // Question Indentifier
  const route = useRoute();
  const [identifier, setIdentifier] = useState("general_1");
  // Skip general questions if coming from Image Analyzer screen
  useEffect(() => {
    if (route.params.prediction !== null) {
      switch (true) {
        case route.params.prediction.includes("Bunions"):
          setIdentifier("bunion_1");
          break;
        case route.params.prediction.includes("Claw or Hammer Toes"):
          setIdentifier("claw_hammer_1");
          break;
        case route.params.prediction.includes("Corn or Calluses"):
          setIdentifier("corn_callus_1");
          break;
        case route.params.prediction.includes("Healthy Feet"):
          break;
        default:
          break;
      }
    }
  }, [route.params.prediction]);


  // Answers
  const [answers, setAnswers] = useState([]);
  // Selected Answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [previousQuestions, setPreviousQuestions] = useState([]);

  // Time complexity: O(n)
  const currentQuestion = data.find((item) => item.identifier === identifier);

  useEffect(() => {
    setSelectedAnswerIndex(null);
  }, [identifier])

  // Set question colour based on yes/no answer or multiple choice question
  const questionColourLogic = (index) => {
    if (selectedAnswerIndex !== null && selectedAnswerIndex === index) {
      return styles.questions_selected_neutral;
    } else {
      return styles.questions
    }
  }

  // Logic for determining next question based on yes or no answer
  const yesOrNoQuestionLogic = () => {
    if (selectedAnswerIndex === 0) {
      return currentQuestion?.nextQuestionIdentifierYes
    }
    else {
      return currentQuestion?.nextQuestionIdentifierNo
    }
  }

  // Logic for determining next question based on multiple choice answer
  const multipleChoiceQuestionLogic = () => {
    const choices = {
      "general_2": ["bunion_1", "claw_hammer_1", "claw_hammer_1", "corn_callus_1", "corn_callus_1"],
      "general_4": ["bunion_1", "claw_hammer_1", "claw_hammer_1", "corn_callus_1", "corn_callus_1"],
      "general_5": ["claw_hammer_1", "corn_callus_1", "bunion_1", "corn_callus_1", "claw_hammer_1", "bunion_1"]
    }

    if (currentQuestion?.identifier && choices[currentQuestion.identifier]) {
      return choices[currentQuestion.identifier][selectedAnswerIndex] || null;
    }
    return null;
  }

  // This function returns a JSX button component that either leads to the results page or the next question
  const nextOrResultsButtonLogic = () => {
    let button;
    if (
      // If the current question has no more "yes" questions and the "yes" answer was selected, 
      // or no more "no" questions and the "no" answer was selected
      (currentQuestion?.nextQuestionIdentifierYes === null && currentQuestion?.yesResult != null && selectedAnswerIndex === 0) ||
      (currentQuestion?.nextQuestionIdentifierNo === null && currentQuestion?.noResult != null && selectedAnswerIndex === 1)
    ) {
      // Create a "See Results" button that navigates to the results page and includes 
      // the selected answer in the answer array
      button = (
        <CustomButton
          text="See Results"
          onPress={() => {
            const answer = {
              question: currentQuestion?.question,
              answer: currentQuestion?.options[selectedAnswerIndex].answer,
              result: selectedAnswerIndex === 0 ? currentQuestion?.yesResult : currentQuestion?.noResult,
            };
            const updatedAnswers = [...answers, answer];
            navigation.navigate("ResultScreen", { answers: updatedAnswers });
          }}
        />
      );
    } else if (selectedAnswerIndex !== null) {
      // Create a "Next Question" button that loads the next question and saves the current answer 
      // in the answer array
      button = (
        <CustomButton
          text="Next Question"
          onPress={() => {
            const nextQuestionId = currentQuestion?.yesOrNo === true ? yesOrNoQuestionLogic() : multipleChoiceQuestionLogic();
            setIdentifier(nextQuestionId);
            previousQuestions.push(currentQuestion?.identifier);
            answers.push({
              question: currentQuestion?.question,
              answer: currentQuestion?.options[selectedAnswerIndex].answer
            });
          }}
        />
      );
    } else {
      // If no answer was selected, return null
      button = null;
    }

    return button;
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Tell Us About Your Feet!</Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{currentQuestion?.question}</Text>

          <View style={styles.imageContainer}>
            {currentQuestion?.imagePath && (
              <Image
                source={currentQuestion.imagePath}
                resizeMode="contain"
                style={{
                  height: height * 0.3,
                  maxWidth: 300,
                }}
              />
            )}
          </View>

          <View style={{ marginTop: 12 }}>
            {currentQuestion?.options.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedAnswerIndex(index)}
                style={
                  questionColourLogic(index)
                }
              >
                <Text style={styles.options}>{item.option}</Text>
                <Text style={styles.answer}>{item.answer}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        {
          selectedAnswerIndex === null ? null : (
            <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold' }}>Answer Selected!</Text>
          )
        }
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={[styles.button, { width: width * 0.25 }]}>
            {previousQuestions.length !== 0 ? (
              <CustomButton
                text="Previous Question"
                onPress={() =>
                  setIdentifier(
                    previousQuestions[previousQuestions.length - 1],
                    previousQuestions.pop(),
                    answers.pop(),
                  )
                }
              />
            ) : (
              <CustomButton
                text="Back to Home"
                onPress={() => navigation.navigate("HomeScreen")}
              />
            )}
            {nextOrResultsButtonLogic()}
          </View >
        </View >
      </View >
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 40,
  },
  logo: {
    width: '100%',
    maxWidth: 250,
    maxHeight: 250,
  },
  button: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    //width: 130,
  },
  questions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#AEC6CF',
    marginVertical: 10,
    borderRadius: 30,
  },
  questions_selected_neutral: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#AEC6CF',
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: '#AEC6CF',
  },
  questions_selected_yes: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#77DD77',
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: '#77DD77',
  },
  questions_selected_no: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FF6961',
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: '#FF6961',
  },
  options: {
    textAlign: 'center',
    width: 40,
    height: 40,
    padding: 10,
  },
  answer: {
    marginLeft: 10,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default QuestionnaireScreen