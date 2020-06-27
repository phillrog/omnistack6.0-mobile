import React, {Component} from 'react';

import { 
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity    
} from 'react-native';

import styles from './styles';

import logo from '../../assets/logo.png';

import api from '../../services/api';

import actionBox from '../../actions/actionBox';

import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

class Main extends Component {
    async componentDidMount() {
        const box = await AsyncStorage.getItem('@RocketBox:box');

        if (box) {
            this.props.navigation.navigate('Box');
        }
    }

    handleSignIn = async () => {
        const response = await api.post('/boxes',{
            title: this.props.newBox
        });

        await AsyncStorage.setItem('@RocketBox:box', response.data._id);

        this.props.navigation.navigate("Box");
    }

    handleInputChange = ( e) => {
        this.props.dispatch(actionBox.newBox(e))
    }

    render() {
        return (
        <View style={styles.conatiner}>
            <Image style={styles.logo} source={logo}></Image>
            <TextInput
                style={styles.input}
                placeholder="Crie um box"
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
                value={this.props.newBox}
                onChangeText={this.handleInputChange}
                />

            <TouchableOpacity
                onPress={this.handleSignIn} 
                style={styles.button}
                
            >
                <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

export default connect(store => ({ newBox: store.newBox }))(Main);