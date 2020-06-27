import React, {Component} from 'react';

import { 
    View,
    Text,
    FlatList,
    TouchableOpacity
 } from 'react-native';

import styles from './styles';

import api from '../../services/api';

import actionCurrentBox from '../../actions/actionCurrentBox';

import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {formatDistance, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';

import ImagePicker from 'react-native-image-picker';

class Box extends Component {
    async componentDidMount() {
        const box = await AsyncStorage.getItem('@RocketBox:box');

        const response = await api.get(`/boxes/${box}`);

        this.props.dispatch(actionCurrentBox.currentBox(response.data));
    }

    renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() => {}}
            style={styles.file}
            >
            <View style={styles.fileInfo}>
                <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
                <Text style={styles.fileTitle}>{this.trunc(item.title)}</Text>
            </View>
            <Text style={styles.fileDate}>
                há {" "} 
                {formatDistance(parseISO(item.createdAt), new Date(), {
                                locale: pt
                            })}
            </Text>
        </TouchableOpacity>
    )

    trunc(text) {
        return text.length > 20 ? `${text.substr(0, 20)}...` : text;
    }

    handleUpload(){
        ImagePicker
    }
    

    render() {
        return (        
            <View style={styles.container}>
                <Text style={styles.boxTitle}>{this.props.box.title}</Text>
                <FlatList
                    data={this.props.box.files}
                    style={styles.list}
                    keyExtractor={file => file._id}
                    ItemSeparatorComponent={() => (<View style={styles.separator} />)}
                    renderItem={this.renderItem}
                ></FlatList>

                <TouchableOpacity style={styles.fab} onPress={this.handleUpload}>
                    <Icon name="cloud-upload" size={24} color="#FFF" />        
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(store => ({ box: store.box }))(Box);