import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ToastAndroid, async } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/images/Achilles.png'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { continueStatement } from '@babel/types';

const ImageAnalyzerScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [state, setState] = useState({
    photo: ''
  })
  const [filename, setFileName] = useState()


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
      }
    })
  }

  const onSubmit = async e => {
    e.preventDefault();
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

    fetch('http://10.0.2.2:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        // setPrediction(data);
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
          style={{
            fontStyle: 'italic',
            paddingHorizontal: 40,
            textAlign: 'center',
            textShadowColor: '#777',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 1,
          }}>
          Take a photo with your camera, or upload an image from your gallery!
        </Text>
      ) : (
        <Image
          source={{ uri: state.photo }}
          style={[styles.image, { height: height }]}
          resizeMode="contain"
        />
      )
      }

      <View style={styles.button}>
        <CustomButton text="Camera" onPress={() => requestCameraPermission()} />
        <CustomButton text="Gallery" onPress={onOpenGalleryPressed} />
        <CustomButton text="Predict" onPress={onSubmit} />
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    maxWidth: 250,
    maxHeight: 250,
    marginTop: 20,
  },
  button: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 50,
    paddingHorizontal: 100,
  },
  image: {
    width: '100%',
    maxWidth: 250,
    maxHeight: 250,
  }
});

export default ImageAnalyzerScreen