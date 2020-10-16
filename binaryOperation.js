import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  buttonBox: {
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 35,
    color: '#000',
  },
  respButtonText: {
    fontSize: 20,
    color: '#000',
  },
});

export class BinaryOperation extends React.Component {
  constructor() {
    super();

    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape',
    };
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape',
      });
    });
  }
  static propTypes = {
    label: PropTypes.string,
  };

  _onPress = () => {
    this.props.onPress(this.props.label);
  };

  render() {
    return (
      <TouchableOpacity style={styles.buttonBox} onPress={this._onPress}>
        <Text
          style={
            this.state.orientation === 'landscape'
              ? styles.respButtonText
              : styles.buttonText
          }>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}
