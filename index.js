/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import App from './src/App';

import {name as appName} from './app.json';

// StatusBar.setBarStyle('default');
AppRegistry.registerComponent(appName, () => App);

// import {AppRegistry, StatusBar} from 'react-native';
// import App from './src/App';
//
// StatusBar.setBarStyle('default');
// AppRegistry.registerComponent('name', () => App);
