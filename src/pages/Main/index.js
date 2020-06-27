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

class Main extends Component {
    handleSignIn = async () => {
        const response = await api.post('/boxes',{
            title: this.props.newBox
        });

        this.props.history.push(`/box/${response.data._id}`);
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
                returnKeyType="send"
                
                />

            <TouchableOpacity
                onPress={()=>{}} 
                style={styles.button}
                
            >
                <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

export default connect(store => ({ newBox: store.newBox }))(Main);