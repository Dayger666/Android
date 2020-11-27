import React from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import DialogInput from 'react-native-dialog-input';

import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";

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
  }
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
    const nextIndex = this.state.activeQuestionIndex + 1;
    if (nextIndex >= this.state.totalCount) {
      this.setState((state) => {
        return {useModal: true};
      });
    }
    if(!this.state.useModal) {
      this.setState(state => {
        const nextIndex = state.activeQuestionIndex + 1;

        if (nextIndex >= state.totalCount) {
          return this.props.navigation.popToTop();
        }

        return {
          activeQuestionIndex: nextIndex,
          answered: false
        };
      });
    }
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
        </SafeAreaView>
        <Alert
          correct={this.state.answerCorrect}
          visible={this.state.answered}
        />
        <DialogInput isDialogVisible={this.state.useModal}
                     title={`You scored ${this.state.correctCount} points`}
                     message={"Please,enter your name"}
                     hintInput ={""}
                     submitInput={ (inputText) => {
                       this.setState(state => {
                       const nextIndex = state.activeQuestionIndex + 1;

                       if (nextIndex >= state.totalCount) {
                         return this.props.navigation.popToTop();
                       }

                       return {
                         activeQuestionIndex: nextIndex,
                         answered: false,
                         useModal:false,
                       };
                     });
                     } }
                     closeDialog={ () => {
                       this.setState(state => {
                         const nextIndex = state.activeQuestionIndex + 1;

                         if (nextIndex >= state.totalCount) {
                           return this.props.navigation.popToTop();
                         }

                         return {
                           activeQuestionIndex: nextIndex,
                           answered: false,
                           useModal:false,
                         };
                       });
                     }}>
        </DialogInput>
      </View>
    );
  }
}

export default Quiz;
