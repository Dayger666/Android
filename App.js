import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Constants from 'expo-constants';

import {factorial, permutation, combination} from './factorial.js';
import {squareroot} from './squareroot.js';

import {OutputBox} from './outputBox.js';
import {BinaryOperation} from './binaryOperation.js';
import {UnaryOperation} from './unaryOperation.js';
import {NumberButton} from './numberButton.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    paddingTop: Constants.statusBarHeight,
    marginBottom: 30,
  },
  buttonRow: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  responsiveButtonRow: {
    marginBottom: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modeButtonRow: {
    marginBottom: 10,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  responsiveBox: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
    marginBottom: 30,
  },
});

export default class App extends React.Component {
  constructor() {
    super();
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      outputValue: 0,
      userIsInTheMiddleOfTyping: false,
      firstValueOnHold: 0,
      binaryOperationOnHold: '',
      userIsInTheMiddleOfBinaryOperation: false,
      currentCalculatorMode: 'Basic',
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }

  changeValue = (label) => {
    if (this.state.userIsInTheMiddleOfTyping) {
      if (this.state.outputValue.toString().indexOf('.') > -1 && label == '.') {
        this.setState((prevState) => ({
          outputValue: prevState.outputValue,
        }));
      } else {
        this.setState((prevState) => ({
          outputValue: prevState.outputValue + label,
        }));
      }
    } else {
      this.setState({
        outputValue: label,
        userIsInTheMiddleOfTyping: true,
      });
    }
  };

  mathematicalConstant = (label) => {
    switch (label) {
      case 'π':
        this.setState({
          outputValue: Math.PI,
        });
        break;
      case 'e':
        this.setState({
          outputValue: Math.E,
        });
    }
  };

  performUnaryOperation = (label) => {
    switch (label) {
      case 'sin':
        this.setState((prevState) => ({
          outputValue: Math.sin(prevState.outputValue),
        }));
        break;
      case 'cos':
        this.setState((prevState) => ({
          outputValue: Math.cos(prevState.outputValue),
        }));
        break;
      case 'tan':
        this.setState((prevState) => ({
          outputValue: Math.tan(prevState.outputValue),
        }));
        break;
      case '√':
        this.setState((prevState) => ({
          outputValue: squareroot(prevState.outputValue),
        }));
        break;
      case '±':
        this.setState((prevState) => ({
          outputValue: -prevState.outputValue,
        }));
        break;
      case 'x!':
        if (this.state.outputValue === '.') {
          this.setState({
            outputValue: 'Syntax ERROR',
          });
        } else {
          this.setState((prevState) => ({
            outputValue: factorial(parseFloat(prevState.outputValue)),
          }));
        }
        break;
      case 'AC':
        this.setState({
          outputValue: 0,
          userIsInTheMiddleOfTyping: false,
          firstValueOnHold: 0,
          binaryOperationOnHold: '',
          userIsInTheMiddleOfBinaryOperation: false,
        });
        break;
    }
  };
  pendingBinaryOperation = (label) => {
    if (this.state.userIsInTheMiddleOfBinaryOperation) {
      this.performBinaryOperation();
      this.setState((prevState) => ({
        binaryOperationOnHold: label,
        firstValueOnHold: prevState.outputValue,
        userIsInTheMiddleOfBinaryOperation: true,
      }));
    } else {
      this.setState({
        firstValueOnHold: this.state.outputValue,
        binaryOperationOnHold: label,
        userIsInTheMiddleOfBinaryOperation: true,
        userIsInTheMiddleOfTyping: false,
        outputValue: '0',
      });
    }
  };
  performBinaryOperation = () => {
    if (this.state.userIsInTheMiddleOfBinaryOperation) {
      switch (this.state.binaryOperationOnHold) {
        case '+':
          this.setState((prevState) => ({
            outputValue:
              parseFloat(this.state.firstValueOnHold) +
              parseFloat(prevState.outputValue),
          }));
          break;
        case '-':
          this.setState((prevState) => ({
            outputValue:
              parseFloat(this.state.firstValueOnHold) -
              parseFloat(prevState.outputValue),
          }));
          break;
        case 'x':
          this.setState((prevState) => ({
            outputValue:
              parseFloat(this.state.firstValueOnHold) *
              parseFloat(prevState.outputValue),
          }));
          break;
        case '÷':
          this.setState((prevState) => ({
            outputValue:
              parseFloat(this.state.firstValueOnHold) /
              parseFloat(prevState.outputValue),
          }));
          break;
        case 'nPr':
          if (
            this.state.firstValueOnHold === '.' ||
            this.state.outputValue == '.'
          ) {
            this.setState({
              outputValue: 'Syntax ERROR',
            });
          } else {
            this.setState((prevState) => ({
              outputValue: permutation(
                parseFloat(this.state.firstValueOnHold),
                parseFloat(prevState.outputValue),
              ),
            }));
          }
          break;
        case 'nCr':
          if (
            this.state.firstValueOnHold == '.' ||
            this.state.outputValue == '.'
          ) {
            this.setState({
              outputValue: 'Syntax ERROR',
            });
          } else {
            this.setState((prevState) => ({
              outputValue: combination(
                parseFloat(this.state.firstValueOnHold),
                parseFloat(prevState.outputValue),
              ),
            }));
          }
          break;
      }
      this.setState({
        userIsInTheMiddleOfBinaryOperation: false,
        userIsInTheMiddleOfTyping: false,
        binaryOperationOnHold: '',
      });
    }
  };

  render() {
    switch (this.state.currentCalculatorMode) {
      case 'Basic':
        var specialButtonOne = (
          <NumberButton onPress={this.mathematicalConstant} label="π" />
        );
        var specialButtonTwo = (
          <UnaryOperation onPress={this.performUnaryOperation} label="sin" />
        );
        var specialButtonThree = (
          <UnaryOperation onPress={this.performUnaryOperation} label="cos" />
        );
        var specialButtonFour = (
          <UnaryOperation onPress={this.performUnaryOperation} label="tan" />
        );
        break;
    }
    return (
      <View
        style={
          this.state.orientation === 'landscape'
            ? styles.responsiveBox
            : styles.container
        }>
        <OutputBox output={this.state.outputValue} />
        {this.state.orientation === 'landscape' ? (
          <View style={styles.buttonRow}>
            {specialButtonOne}
            {specialButtonTwo}
            {specialButtonThree}
            {specialButtonFour}
          </View>
        ) : null}
        <View
          style={
            this.state.orientation === 'landscape'
              ? styles.responsiveButtonRow
              : styles.buttonRow
          }>
          <BinaryOperation onPress={this.pendingBinaryOperation} label="+" />
          <BinaryOperation onPress={this.pendingBinaryOperation} label="-" />
          <BinaryOperation onPress={this.pendingBinaryOperation} label="x" />
          <BinaryOperation onPress={this.pendingBinaryOperation} label="÷" />
        </View>
        <View
          style={
            this.state.orientation === 'landscape'
              ? styles.responsiveButtonRow
              : styles.buttonRow
          }>
          <UnaryOperation onPress={this.performUnaryOperation} label="√" />
          <NumberButton onPress={this.changeValue} label="7" />
          <NumberButton onPress={this.changeValue} label="8" />
          <NumberButton onPress={this.changeValue} label="9" />
        </View>
        <View
          style={
            this.state.orientation === 'landscape'
              ? styles.responsiveButtonRow
              : styles.buttonRow
          }>
          <UnaryOperation onPress={this.performUnaryOperation} label="x!" />
          <NumberButton onPress={this.changeValue} label="4" />
          <NumberButton onPress={this.changeValue} label="5" />
          <NumberButton onPress={this.changeValue} label="6" />
        </View>
        <View
          style={
            this.state.orientation === 'landscape'
              ? styles.responsiveButtonRow
              : styles.buttonRow
          }>
          <UnaryOperation onPress={this.performUnaryOperation} label="±" />
          <NumberButton onPress={this.changeValue} label="1" />
          <NumberButton onPress={this.changeValue} label="2" />
          <NumberButton onPress={this.changeValue} label="3" />
        </View>
        <View
          style={
            this.state.orientation === 'landscape'
              ? styles.responsiveButtonRow
              : styles.buttonRow
          }>
          <UnaryOperation onPress={this.performUnaryOperation} label="AC" />
          <NumberButton onPress={this.changeValue} label="." />
          <NumberButton onPress={this.changeValue} label="0" />
          <BinaryOperation onPress={this.performBinaryOperation} label="=" />
        </View>
      </View>
    );
  }
}
