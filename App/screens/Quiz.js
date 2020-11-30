import React from "react";
import {View, StyleSheet, StatusBar, Text, SafeAreaView, ScrollView} from "react-native";
import DialogInput from 'react-native-dialog-input';

import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";
import {AdMobBanner, AdMobRewarded} from "expo-ads-admob";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36B1F0",
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: "space-between"
  },
});

class Quiz extends React.Component {
  state = {
    correctCount: 0,
    totalCount: this.props.navigation.getParam("questions", []).length,
    activeQuestionIndex: 0,
    answered: false,
    answerCorrect: false,
    useModal:false,
  };
  answer = correct => {
    this.setState(
      state => {
        const nextState = { answered: true };

        if (correct) {
          nextState.correctCount = state.correctCount + 1;
          nextState.answerCorrect = true;
        } else {
          nextState.answerCorrect = false;
        }

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 750);
      }
    );
  };

  nextQuestion = () => {
    this.setState(state => {
      const nextIndex = state.activeQuestionIndex + 1;

      if (nextIndex >= state.totalCount) {
        const setResult = this.props.navigation.getParam("setResult",()=>{});
        const user = this.props.navigation.getParam("user", []);
        setResult(this.state.correctCount,user.displayName,user.email)
       AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1712485313').then(()=>{
         AdMobRewarded.requestAdAsync().then(()=>{
           AdMobRewarded.showAdAsync().then(()=>{
           })
         })
       });
        return this.props.navigation.popToTop();// Test ID, Replace with your-admob-unit-id
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false
      };
    });
  };

  render() {
    const questions = this.props.navigation.getParam("questions", []);
    const question = questions[this.state.activeQuestionIndex];
    let ques = question.question.replace(/&quot;/g,'"').replace(/&#039;/g,'');

    return (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.navigation.getParam("color") }
        ]}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safearea}>
          <View>
            <Text style={styles.text}>{ques}</Text>

            <ButtonContainer>
              {question.answers.map((answer,id,array) => (
                <Button
                  key={id}
                  text={answer}
                  onPress={() => this.answer(answer === question.correct_answer)}
                />
              ))}
            </ButtonContainer>
          </View>

          <Text style={styles.text}>
            {`${this.state.correctCount}/${this.state.totalCount}`}
          </Text>
          <View style={styles.advert}>
          <AdMobBanner
              bannerSize="fullBanner"
              adUnitID="ca-app-pub-3940256099942544/2934735716" // Test ID, Replace with your-admob-unit-id
              servePersonalizedAds // true or false
              onDidFailToReceiveAdWithError={(error) => {
                console.log(error)}}
          />
          </View>
        </SafeAreaView>
        <Alert
          correct={this.state.answerCorrect}
          visible={this.state.answered}
        />
      </View>
    );
  }
}

export default Quiz;
