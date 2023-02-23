import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ToastAndroid, async } from 'react-native'
import React, { useState, useEffect } from 'react'
import Logo from '../../../assets/images/Achilles.png'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { continueStatement } from '@babel/types';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const ImageAnalyzerScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [state, setState] = useState({
    photo: ''
  })
  const [filename, setFileName] = useState()
  const [prediction, setPrediction] = useState(null)

  const option = {
    mediaType: 'photo',
    quality: 1,
    saveToPhotos: true,
  }

  const toast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  }


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

      {state.photo == "" ? (
        <Text
          style={styles.italicText}>
          Take a photo with your camera, or upload an image from your gallery!
        </Text>
      ) : (
        <Image
          source={{ uri: state.photo }}
          style={[styles.image, { height: height }]}
          resizeMode="contain"
        />
      )}

      {prediction ? (
        <Text style={styles.italicText}>
          There is a {parseFloat(prediction.confidence_score.substring(0, 6)) * 100}% chance that you have {prediction.class_name}
        </Text>
      ) : (
        <Text></Text>
      )}

      <View style={styles.button}>
        <CustomButton text="Camera" onPress={() => requestCameraPermission()} />
        <CustomButton text="Gallery" onPress={onOpenGalleryPressed} />
        {filename && <CustomButton text="Predict" onPress={onSubmit} />}
      </View>

      {prediction == null ? (
        null
      ) : (
        <View style={styles.questionnaireContainer}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Answer a short questionnaire to increase the result accuracy!</Text>
          <View style={styles.questionnaireButton}>
            <CustomButton text="Questionnaire" onPress={() => navigation.navigate("QuestionnaireScreen", { prediction: prediction.class_name.trim() })} />
          </View>
        </View>
      )}
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
    width: 80,
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
  }
});

export default ImageAnalyzerScreen