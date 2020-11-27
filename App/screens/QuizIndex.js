import React from "react";
import { ScrollView, StatusBar,StyleSheet } from "react-native";

import { RowItem } from "../components/RowItem";

export default ({ navigation,questions,
                    getQuestions,setResult,result }) => (
  <ScrollView contentContainerStyle={styles.scrollView}>
    <StatusBar barStyle="dark-content" />
    <RowItem
        style={styles.item}
      name="Start quiz"
      color="#36b1f0"
      questions={questions}
        setResult={setResult}
      onPress={() =>
      {
          getQuestions(10, 'easy');
          navigation.navigate("Quiz", {
              title: "Space",
              questions: questions,
              color: "#36b1f0",
              setResult,
          })
      }
      }
    />
  </ScrollView>
);

const styles = StyleSheet.create({

    scrollView: {
        marginBottom: 2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    item:{
        marginTop: 50,
    },
});
