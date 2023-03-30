// Import the necessary libraries and components
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ToastAndroid, async, Easing } from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from '../../../assets/images/Achilles.png'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { continueStatement } from '@babel/types';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LottieView from 'lottie-react-native';
import TypeWriter from 'react-native-typewriter';

const ImageAnalyzerScreen = () => {
  const PEDICTION_ERROR = 3
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  // Initialize the state variables and update them whenever needed
  const [state, setState] = useState({
    photo: ''
  })
  const [filename, setFileName] = useState(null)
  const [prediction, setPrediction] = useState(null)

  // Camera and gallery settings
  const option = {
    mediaType: 'photo',
    quality: 1,
    saveToPhotos: true,
  }

  // Display toast messages on the screen.
  const toast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  }

  // Request permission from the user to access the camera and handle the response
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(option, (res) => {
          if (res.didCancel) {
            toast('Take a picture canceled.')
          } else if (res.errorCode) {
            toast('Error while opening camera.', res.errorCode)
            console.log(res.errorMessage)
          } else {
            const filename = res.assets[0].uri.substring(res.assets[0].uri.lastIndexOf('/') + 1);
            console.log(res.assets[0].uri)
            setState({ photo: res.assets[0].uri })
            setFileName(filename);
            setPrediction(null);
          }
        })
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  // Open the gallery and handle the response
  const onOpenGalleryPressed = () => {
    launchImageLibrary(option, (res) => {
      if (res.didCancel) {
        toast('Gallery canceled.')
      } else if (res.errorCode) {
        toast('Error while opening gallery.', res.errorCode)
        console.log(res.errorMessage)
      } else {
        const filename = res.assets[0].uri.substring(res.assets[0].uri.lastIndexOf('/') + 1);
        console.log(res.assets[0].uri)
        setState({ photo: res.assets[0].uri })
        setFileName(filename);
        setPrediction(null);
      }
    })
  }

  const displayImageLogic = () => {
    // Check if a photo is available
    if (state.photo === "") {
      // If no photo is available, display a message
      return (
        <Text style={styles.italicText}>
          Take a photo with your camera, or upload an image from your gallery!
        </Text>
      );
    }

    // Check if prediction is available
    if (prediction === null) {
      // If no prediction is available, display the photo
      return (
        <Image
          source={{ uri: state.photo }}
          style={[styles.image, { height: height }]}
          resizeMode="contain"
        />
      );
    }

    // Return null if no photo or prediction is available
    return null;
  }

  // Initialize the loading state variable and set it to true when the form is submitted
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingScreen />;
  }

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('file', {
      name: filename,
      type: 'image/jpeg',
      uri:
        Platform.OS === "android"
          ? state.photo
          : state.photo.replace("file://", "")
    });
    console.log(state.photo);
    console.log("filename: " + filename)
    // Use the fetch function to send the photo to the server and get a prediction back
    fetch('https://achilles-flask.azurewebsites.net/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPrediction(data);
        console.log(prediction);
        setLoading(false);
      });
  };


  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      {
        prediction == null ? (
          null
        ) : (
          <View style={{ position: 'absolute', bottom: - (height * 0.1), left: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <LottieView
                source={require('../../../assets/animations/134244-futuristic-robot-constructor.json')}
                style={{ width: height * 0.1 }}
                autoPlay
                loop
              />
              <TypeWriter
                typing={1}
                style={{ fontSize: height * 0.015, paddingRight: height * 0.19, fontStyle: 'italic' }}
                maxDelay={10}
              >
                "I'm a robot, not a fortune-teller! If you want 100% accuracy, go see a crystal ball. Otherwise, please consult a medical professional if you're worried. I'm just here to beep and boop."
              </TypeWriter>
            </View>
          </View>
        )
      }

      {displayImageLogic()}

      {prediction ? (
        <View style={{ paddingVertical: 25 }}>
          <AnimatedCircularProgress
            style={styles.animatedCircularProgress}
            size={height * 0.22}
            width={10}
            fill={parseFloat(prediction.confidence_score.substring(0, 4)) * 100 - PEDICTION_ERROR}
            tintColor="#005691"
            backgroundColor="#98c5e4"
            backgroundWidth={5}
            lineCap="round"
            duration={1800}>
            {
              (fill) => (
                <Text style={{
                  fontSize: height * 0.022,
                  textAlign: 'center',
                  textShadowColor: '#98c5e4',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 10,
                  color: '#005691'
                }}>
                  {parseFloat(prediction.confidence_score.substring(0, 4)) * 100 - PEDICTION_ERROR}%
                  {'\n'}{prediction.class_name}
                </Text>
              )
            }
          </AnimatedCircularProgress>
        </View>
      ) : (
        <Text></Text>
      )
      }

      <View style={styles.button}>
        <CustomButton text="Camera" onPress={() => requestCameraPermission()} />
        <CustomButton text="Gallery" onPress={onOpenGalleryPressed} />
        {filename && <CustomButton text="Predict" onPress={onSubmit} />}
      </View>

      {
        prediction == null ? (
          null
        ) : (
          <View style={styles.questionnaireContainer}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Answer a short questionnaire to increase the result accuracy!</Text>
            <View style={styles.questionnaireButton}>
              <CustomButton text="Questionnaire" onPress={() => navigation.navigate("QuestionnaireScreen", { prediction: prediction.class_name.trim() })} />
            </View>
          </View>
        )
      }
    </View >
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 18,
  },
  logo: {
    width: '100%',
    maxWidth: 200,
    maxHeight: 200,
  },
  button: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    maxWidth: 250,
    maxHeight: 250,
  },
  italicText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    paddingHorizontal: 25,
  },
  questionnaireContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10
  },
  questionnaireButton: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 150,
  },
  animatedCircularProgress: {
    // paddingVertical: 15,
  }

});

export default ImageAnalyzerScreen