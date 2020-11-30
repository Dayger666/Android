import {createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import QuizIndexContainer from "./screens/QuizIndexContainer";
import Quiz from "./screens/Quiz";
import React from "react";
import { Provider } from 'react-redux';
import {configureStore} from "../redux/config/store";
import LoginScreenContainer from "./screens/LoginScreenContainer";
import {Button} from "react-native";
import Scoreboard from "./screens/Scoreboard";

const MainStack = createStackNavigator({
  QuizIndex: {
    screen: QuizIndexContainer,
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.getParam("title"),
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: navigation.getParam("color"),
        borderBottomColor: navigation.getParam("color")
      }
    })
  },
  Leaderboard:{
      screen: Scoreboard,
  }
});
const AuthNavigator = createStackNavigator({
  LoginRoute: {
    screen: LoginScreenContainer,
    navigationOptions: () => ({
      headerShown: false,
    })
  }
});

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        App: MainStack,
      Auth: AuthNavigator
    },
    {
      initialRouteName: 'Auth',
    }
));
const store = configureStore();

let App = () => {
    return (
        <Provider store={store}>
          <AppContainer screenProps={{ appName: 'Quizz app' }}/>
        </Provider>
    )
}
export default App;
