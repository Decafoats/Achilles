import { View, Text, Image, StyleSheet, useWindowDimensions, AsyncStorage, Modal, Button, TouchableOpacity, ScrollView, BackHandler } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/images/Achilles.png'
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const HomeScreen = () => {

  const [showTerms, setShowTerms] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const onQuestionnairePressed = () => {
    navigation.navigate('QuestionnaireScreen', { prediction: null });
  }

  const onImageAnalyzerPressed = () => {
    navigation.navigate('ImageAnalyzerScreen');
  }

  const acceptTerms = () => {
    setAcceptedTerms(true);
    setShowTerms(false);
  };

  return (

    <View style={styles.root} >
      <Image
        source={Logo}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <LottieView
        source={require('../../../assets/animations/140209-feet-walking-loader.json')}
        style={{ width: height * 0.4, marginVertical: height * 0.04 }}
        autoPlay
        loop
      />

      <View style={[styles.button, { width: width * 0.4, marginTop: height * 0.05 }]}>
        <CustomButton text="Questionnaire" onPress={onQuestionnairePressed} />
        <CustomButton text="Image Analyzer" onPress={onImageAnalyzerPressed} />
      </View>

      {/* ***************************
        *  TERMS AND CONDITIONS
        *************************** */}
      {acceptedTerms === false ? (
        <View>
          <Modal
            visible={showTerms}
            animationIn='slide'
            style={styles.modal}
            onRequestClose={() => { }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <ScrollView>
                  <Text style={styles.modalTitle}>Terms and Conditions of Use for Achilles</Text>
                  <Text style={styles.sectionTitle}>1. About Achilles</Text>
                  <Text style={styles.sectionText}>
                    Achilles is a foot problem analyzing app that uses AI to detect the foot condition of the User. The User must consent to upload their foot images for analysis. The images uploaded by the User will not be stored.
                  </Text>

                  <Text style={styles.sectionTitle}>2. Disclaimer</Text>
                  <Text style={styles.sectionText}>
                    Achilles is not a substitute for professional medical advice, diagnosis, or treatment. The app is intended to provide general information about foot conditions and is not a substitute for professional medical advice. The User should consult a licensed podiatrist for any serious foot concerns.
                  </Text>

                  <Text style={styles.sectionTitle}>3. User Representations</Text>
                  <Text style={styles.sectionText}>
                    By using Achilles, the User represents that they are at least 18 years old and have the legal capacity to enter into these Terms. The User also represents that they will only upload their own foot images and that the images are accurate and not misleading.
                  </Text>

                  <Text style={styles.sectionTitle}>4. User Consent</Text>
                  <Text style={styles.sectionText}>
                    By using Achilles, the User consents to the collection and use of their foot images for analysis purposes. The images uploaded by the User will not be stored.
                  </Text>

                  <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
                  <Text style={styles.sectionText}>
                    Achilles is owned and operated by the developers in Saskatchewan, Canada. All intellectual property rights in Achilles are owned by the developers. The User may not use any content from Achilles for any commercial purposes.
                  </Text>

                  <Text style={styles.sectionTitle}>6. Disclaimer of Warranties</Text>
                  <Text style={styles.sectionText}>
                    Achilles is provided "as is" and without warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                  </Text>

                  <Text style={styles.sectionTitle}>7. Limitation of Liability</Text>
                  <Text style={styles.sectionText}>
                    In no event shall the developers be liable to the User or any third party for any damages arising out of or in connection with the use or inability to use Achilles. The developers is not liable for any indirect, incidental, consequential, special, or punitive damages arising out of or in connection with the use or inability to use Achilles.
                  </Text>

                  <Text style={styles.sectionTitle}>8. Modification of Terms</Text>
                  <Text style={styles.sectionText}>
                    The developers reserves the right to modify these Terms at any time without prior notice to the User. The User's continued use of Achilles after the modified Terms have been posted constitutes their acceptance of the modified Terms.
                  </Text>

                  <Text style={styles.sectionTitle}>9. Governing Law and Jurisdiction</Text>
                  <Text style={styles.sectionText}>
                    These Terms shall be governed by and construed in accordance with the laws of Saskatchewan, Canada. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Saskatchewan, Canada.
                  </Text>

                  <Text style={styles.sectionTitle}>10. Entire Agreement</Text>
                  <Text style={styles.sectionText}>
                    These Terms constitute the entire agreement between the User and the developers with respect to the use of Achilles and supersede all prior or contemporaneous communications and proposals, whether oral or written, between the User and the developers.
                  </Text>

                  <Text style={styles.sectionTitle}>11. Contact Information</Text>
                  <Text style={styles.sectionText}>
                    If you have any questions or comments about these Terms or Achilles, please contact the developers at xzn628@uregina.ca.
                  </Text>

                  <View style={{ alignItems: 'center', paddingTop: 20 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * 0.25 }}>
                      <CustomButton text="I Accept" onPress={acceptTerms} />
                      <CustomButton text="I Decline" onPress={BackHandler.exitApp} />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal >
        </View >
      ) : null}
    </View >
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#E8F1F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 10
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 8
  },
  sectionText: {
    fontSize: 12,
    paddingLeft: 15,
  }

});

export default HomeScreen