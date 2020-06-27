import React, {Component} from 'react';

import { 
    View,
    Text,
    FlatList,
    TouchableOpacity
 } from 'react-native';

import styles from './styles';

export default class Box extends Component {
    render() {
        return (        
            <View style={styles.container}>
                <Text style={styles.boxTitle}>RocketSeat</Text>

            </View>
        );
    }
}