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

import RNFS from 'react-native-fs';

import FileViewer from 'react-native-file-viewer';

import socket from 'socket.io-client';

class Box extends Component {
    async componentDidMount() {
        const box = await AsyncStorage.getItem('@RocketBox:box');

        this.subscribeToNewFiles(box);

        const response = await api.get(`/boxes/${box}`);

        this.props.dispatch(actionCurrentBox.currentBox(response.data));
    }

    subscribeToNewFiles = (box) => {  
        const io = socket('https://omnistack6-api.herokuapp.com');

        io.emit('connectRoom', box);

        io.on('file', data => {
            this.props.dispatch(actionCurrentBox.currentBox({
                ...this.props.box,
                files: [ data, ...this.props.box.files]
            })); 
        });
    }

    openFile = async (file) => {
        try {
            const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;

            await RNFS.downloadFile({
                fromUrl: file.url,
                toFile: filePath
            });

            await FileViewer.open(filePath);
        } catch (error){
            console.error(error);            
        }
    }

    renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() => this.openFile(item)} 
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
        return text.length > 10 ? `${text.substr(0, 10)}...` : text;
    }

    handleUpload = () => {
        ImagePicker.launchImageLibrary({}, async upload => {
            if (upload.error) {
                console.loog("ImagePicker error");
            } else if (upload.didCancel) {
                console.loog("Canceled by user");
            } else {
                const data = new FormData();
                const [prefix, suffix] = upload.fileName.split('.');
                const ext = suffix.toLowerCase() ==='heic' ? 'jpg' : suffix;

                data.append('file', {
                    uri: upload.uri,
                    type: upload.type,
                    name: `${prefix}.${ext}`
                });
                
                await api.post(`/boxes/${this.props.box._id}/files`, data).then(response => {

                    console.log(response);
                })
                .then(error => console.log(error));                                
            }
            
        });
     
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