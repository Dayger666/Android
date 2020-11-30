import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'cursor',
    };
  }

  static propTypes = {
    onCommand: PropTypes.func,
    onEraseView: PropTypes.func,
    onRedo: PropTypes.func,
    onUndo: PropTypes.func,
  };

  render() {
    return (
      <View>
        <View style={styles.tools}>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onCommand.bind(this, 'select')}
            style={styles.tool_button}>
            <MaterialCommunityIcons name={"cursor-default-outline"} size={26} color={"#fff"} />
            {/*<Text style={{fontSize:10}}>pointer</Text>*/}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onCommand.bind(this, 'splines')}
            style={styles.tool_button}>
            <MaterialCommunityIcons name={"pencil"} size={26} color={"#fff"} />
           {/* <Text style={{fontSize:10}}>pencil</Text>*/}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onCommand.bind(this, 'line')}
            style={styles.tool_button}>
            <MaterialCommunityIcons name={"vector-line"} size={26} color={"#fff"} />
            {/*<Text style={{fontSize:10}}>line</Text>*/}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onCommand.bind(this, 'ellipse')}
            style={styles.tool_button}>
            <MaterialCommunityIcons name={"circle-outline"} size={26} color={"#fff"} />
           {/* <Text style={{fontSize:10}}>ellipse</Text>*/}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onCommand.bind(this, 'rect')}
            style={styles.tool_button}>
            <MaterialCommunityIcons name={"crop-square"} size={26} color={"#fff"} />
           {/* <Text style={{fontSize:10}}>square</Text>*/}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onCommand.bind(this, 'triangle')}
            style={styles.tool_button}>
            <MaterialCommunityIcons name={"triangle-outline"} size={26} color={"#fff"} />
           {/* <Text style={{fontSize:10}}>triangle</Text>*/}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onCommand.bind(this, 'erase')}
            style={[styles.tool_button]}>
            <MaterialCommunityIcons name={"eraser"} size={26} color={"#fff"} />
            {/*<Text style={{fontSize:10}}>eraser</Text>*/}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onEraseView.bind(this)}
            style={styles.tool_button}>
            <MaterialCommunityIcons name={"delete"} size={26} color={"#fff"} />
          {/*  <Text style={{fontSize:10}}>delete</Text>*/}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onUndo.bind(this)}
            style={[styles.tool_button]}>
            <MaterialCommunityIcons name={"reply"} size={26} color={"#fff"} />
            {/*<Text style={{fontSize:10}}>back</Text>*/}
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#D8D8D8"
            onPress={this.props.onRedo.bind(this)}
            style={styles.tool_button}>
            <MaterialCommunityIcons name={"share"} size={26} color={"#fff"} />
            {/*<Text style={{fontSize:10}}>forward</Text>*/}
          </TouchableHighlight>
        </View>
        <View style={styles.sub_tools} />
      </View>
    );
  }
}
