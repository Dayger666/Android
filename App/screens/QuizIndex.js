import React, {Component} from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, StyleSheet} from "react-native";

import { RowItem } from "../components/RowItem";


    class QuizIndex extends Component {
        static navigationOptions = ({ navigation, }) => {
            const signout = navigation.getParam("signout",()=>{});
            const onSignedOut = () => {
                navigation.navigate('Auth');
            }

            return {
                title: 'Quiz',
                headerRight: ()=> (
                    <Button
                        title='log out'
                        onPress={() => signout(onSignedOut)}
                         />
                )
            }
        };
        componentDidMount(){
            this.props.getResult();
            this.props.navigation.setParams({
                signout: this.props.signout
            })
            }
        componentDidUpdate(prevProps,prevState,snapshot) {
            if (this.props.result !== prevProps.result) {
                this.props.getResult();
            }
        }
        render() {
            return <ScrollView contentContainerStyle={styles.scrollView}>
                <StatusBar barStyle="dark-content"/>
                <RowItem
                    style={styles.item}
                    name="Start quiz"
                    color="#36b1f0"
                    questions={this.props.questions}
                    setResult={this.props.setResult}
                    onPress={() => {
                        this.props.getQuestions(10, 'easy');
                        this.props.navigation.navigate("Quiz", {
                            title: "Space",
                            questions: this.props.questions,
                            color: "#36b1f0",
                            setResult:this.props.setResult,
                            user:this.props.user,
                        })
                    }
                    }
                />
                <RowItem
                    style={styles.item}
                    name="Leaderboard"
                    color="#36b1f0"
                    onPress={() => {
                        this.props.getResult();
                        this.props.navigation.navigate("Leaderboard", {
                            result: this.props.result,
                        })
                    }
                    }
                />
            </ScrollView>
        }
}

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
 export default QuizIndex;
