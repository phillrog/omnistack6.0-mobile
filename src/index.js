import React from 'react';

import { View } from 'react-native';

import { StatusBar} from 'react-native';
StatusBar.setBackgroundColor('#7159c1');
StatusBar.setBarStyle('light-content');

import Routes from './routes';

const App = ( ) => <Routes />

export default App;