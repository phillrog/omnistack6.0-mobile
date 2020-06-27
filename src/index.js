import React from 'react';

import { View } from 'react-native';

import { StatusBar} from 'react-native';
StatusBar.setBackgroundColor('#00acee');
StatusBar.setBarStyle('light-content');

import Routes from './routes';

const App = ( ) => <Routes />

export default App;