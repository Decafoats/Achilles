import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
  const { height } = useWindowDimensions();
  // Took these jokes from : https://www.welovepuns.com/best-foot-puns/
  const [jokesArray, setJokesArray] = useState([
    "What is a foot’s favorite breakfast food? Toe-st.",
    "Burglars don’t really wear shoes; because they have to be quiet, they go for sneakers.",
    "It can be hard to referee an argument between your feet. No matter how hard they try, they can’t both be right.",
    "What creature lies on the floor, one hundred feet in the air? The answer is a dead centipede.",
    "Why is 2 plus 2 = 10 the same thing as a left foot? Because it’s not right.",
    "How do feet capture their most special memories? They take a pho-toe.",
    "I didn’t think I’d like my orthopedic new shoes, but now I stand corrected.",
    "I wanted to propose romantically to my partner, barefooted in the snow. I didn’t do it in the end; I got cold feet.",
    "It is important to stand on your left foot at midnight on New Year’s Eve. This means that you start the new year on the right foot.",
    "Have you heard the phrase “don’t criticize someone until you have walked a mile in their shoes”? This is good advice, because now you are a mile away from them, and you have their shoes.",
    "What happens if your feet break down on a long journey? You simply call a toe truck.",
    "You know that feeling when you have been sitting on your feet and they go to sleep? This is known as coma-toes.",
    "I am an artist, and I have been struggling to draw a really good picture of feet. Well, the other day I toe-tally nailed it.",
    "What do dogs do when they hurt their feet? They visit a paw-diatrist.",
    "I got into a relationship with my podiatrist, but we broke up after a while. Turns out we weren’t sole mates.",
    "Alligators can grow up to 22 feet. Usually they just grow four though.",
    "Marathon runners can truly accomplish a great feet.",
    "I fell in love with a long distance runner. He swept me right off my feet.",
    "Cows don’t actually have feet, they have hooves. Do you know why this is? Because they lactose.",
    "Dogs are actually really cool. They don’t wear normal shoes; they always go for Dog Martens.",
    "Are you struggling with a tricky problem? Just foot on your thinking cap and you should be able to sort it.",
    "A friend is annoying you with their constant foot puns? Tell them to put a sock in it.",
    "I wanted to visit the tropics, but I’m just not sure how I heel about the feet.",
    "I went out for dinner with a couple of my podiatrist friends. Unfortunately I had to foot the bill.",
    "My new shoes are toe-tally awesome!",
    "I was in the cinema watching a re-run of Bigfoot. It was a great feet-ure.",
    "I’ve really (toe)nailed these puns.",
    "I thought I loved you before, but then you bought me new shoes. Now I know we’re sole mates.",
    "I’ve been learning how to run better. Turns out I just needed a trainer.",
    "I was having a contest with someone I thought was a friend.. They cheated again, so now we’re arch enemies.",
    "I was researching my family tree and I have found that I have an aunt and an ankle I never knew about.",
    "Unfortunately, all my friends know that punning is my Achilles heel.",
    "I tendon to repeat myself if I pun too many times.",
    "I’m heeling good about this next one.",
    "So, I went to sleep on my shoes last night. I dreamed I ate the right shoe. When I woke up, there was only one left and I was speaking in tongues."]
  );

  const randomJoke = () => {
    const randomIndex = Math.floor(Math.random() * jokesArray.length);
    const randomString = jokesArray[randomIndex];
    return randomString
  }

  return (
    <View style={styles.root}>
      <LottieView
        source={require('../../../assets/animations/19910-feet-finger.json')}
        style={{ width: height * 0.15 }}
        autoPlay
        loop
      />
      <Text style={styles.text}>Loading...</Text>
      <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', paddingTop: 20 }]}>Enjoy this joke while you wait:</Text>
      <Text style={[styles.text, { fontSize: 15, paddingTop: 20 }]}>{randomJoke()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    alignContent: 'center',
    paddingHorizontal: 25,
  },
});

export default LoadingScreen;