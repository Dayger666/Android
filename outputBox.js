import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  outputBox: {
    alignSelf: 'stretch',
    height: 150,
    backgroundColor: '#000',
    marginTop: 50,
    paddingTop: 50,
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  output: {
    alignSelf: 'flex-end',
    fontSize: 48,
    color: '#fff',
  },
});

export const OutputBox = (props) => (
  <View style={styles.outputBox}>
    <Text numberOfLines={1} style={styles.output}>
      {props.output}
    </Text>
  </View>
);
