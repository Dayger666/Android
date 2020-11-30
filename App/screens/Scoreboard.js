import React, {Component} from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import DialogInput from 'react-native-dialog-input';

import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";
import Leaderboard from "react-native-leaderboard";



class Scoreboard extends Component {

    render() {
        const result = this.props.navigation.getParam("result", []);
        return (
            <Leaderboard
                data={result}
                sortBy='highScore'
                labelBy='userName'/>)
    }
}

export default Scoreboard;
