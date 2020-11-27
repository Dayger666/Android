import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import QuizIndexContainer from "./screens/QuizIndexContainer";
import Quiz from "./screens/Quiz";
import React from "react";
import { Provider } from 'react-redux';
import {configureStore} from "../redux/config/store";

const MainStack = createStackNavigator({
  QuizIndex: {
    screen: QuizIndexContainer,
    navigationOptions: {
      headerTitle: "Quizzes"
    }
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
  }
});

const AppContainer = createAppContainer(MainStack);
const store = configureStore();

let App = () => {
    return (
        <Provider store={store}>
          <AppContainer/>
        </Provider>
    )
}
export default App;
