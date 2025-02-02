import React from 'react';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Alert, TouchableHighlight, Text, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import UPLOAD_SVG from '../assets/images/UploadSvg';
import X_SVG from '../assets/images/XSVG';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EditImageModal } from './ManipulateImage.js';
import { appColors } from '../constant/AppColors';
import * as SecureStore from 'expo-secure-store';
import * as crypto from 'expo-crypto';
import { backend_domain } from '../constant/Settings.js';
import { Vidplays } from './Vidplays.js';


const on_touch_color = appColors.buttonColor;
const x_touch_color = appColors.buttonColor;
const x_color = appColors.lighterDark;

async function getUniqueId() {
    let userId = await SecureStore.getItemAsync('userId');

    if (userId) {
        return userId;
    }
    else{
        userId = crypto.randomUUID();
        await SecureStore.setItemAsync('userId', userId);
    } 
}

async function sendImageNull(image) {
    const id = await getUniqueId();
    const url = `${backend_domain}/remove-image?image=${image}&id=${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

export function PhotoUpload(props){
    const [image, setImage] = useState(null);
    const route = useRoute();
    const navigation = useNavigation();
    const [isEdited, setIsEdited] = useState(false);
    
    useEffect(() =>{
        if (image){
            uploadImage();
        }
    }, [isEdited])

    async function uploadImage() {
        if (!image) {
            Alert.alert('No image selected');
            return;
        }

        const formData = new FormData() ;
        formData.append('image', {
            uri: image.uri, // File URI
            type: 'image/jpeg', // MIME type
            name: props.filename, // File name
        });

        try {
            const userID = await getUniqueId();
            const response = await axios.post(`${backend_domain}/upload?id=${userID}`, formData);
        }
        catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Upload Failed', 'Something went wrong while uploading the image.');
        }
    }

    async function selectImage(){
        // Ask for permissions to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]); // Store selected image data
        }
    }

    function onXpress(){
        setImage(null);
        setIsEdited(false);
        sendImageNull(props.filename);
    }


    function WithImage(){
        if (isEdited){
            return(
                <View style={styles.container}>
                    <View style={styles.previewImage}>
                        {image && (<Image source={{ uri: image.uri }} style={styles.previewImage} />)}
                    </View>
                    <TouchableHighlight style={styles.touchableX} underlayColor={x_touch_color} onPress={onXpress}>
                        <X_SVG color={x_color}/>
                    </TouchableHighlight>
                </View>
            );
        }

        else{
            return(
                <View style={styles.container}>
                    <TouchableHighlight style={styles.touchable} underlayColor={on_touch_color} onPress={console.log('Nice try')}>
                        <View style={styles.imageContainer}>
                            <View style={styles.svgContainer}>
                                <UPLOAD_SVG color={'rgb(255, 255, 255)'}/>
                            </View>
                            <Text style={styles.text}>{(props.filename === '1.jpg')? 'Image 1': 'Image 2'}</Text>
                        </View>
                    </TouchableHighlight>
                    <EditImageModal setIsEdited={setIsEdited} setImage={setImage} uri={image.uri}></EditImageModal>
                </View>
            );
        }
    }

    function WithoutImage(){
        return(
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchable} underlayColor={on_touch_color} onPress={selectImage}>
                    <View style={styles.imageContainer}>
                        <View style={styles.svgContainer}>
                            <UPLOAD_SVG color={'rgb(255, 255, 255)'}/>
                        </View>
                        <Text style={styles.text}>{(props.filename === '1.jpg')? 'Image 1': 'Image 2'}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }


    if (image){
        return(
            <WithImage/>
        );
    }
    else{
        return(
            <WithoutImage/>
        );
    }
}

export function GenerateButton(){
    const [generateClicked, setGenerateClicked] = useState(false);
    const [userID, setUserID] = useState('');

    function onGeneratePress(){
        setGenerateClicked(true);
        getUniqueId().then((data) => {setUserID(data)});
    }

    function onModalClose(){
        setGenerateClicked(false);
    }


    async function getVideoURL(){
        const user_id = await getUniqueId();
        const url = `${backend_domain}/get-video?id=${user_id}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        } catch (error) {
            console.error(error.message);
        }
    } 

    if (generateClicked){
        return(
            <Modal color={appColors.background} animationType="slide" transparent={false} visible={true} onRequestClose={onModalClose}>
                <View style={styles.insideModalContainer}>
                    <View style={styles.videoModalContainer}>
                        <Vidplays source={`${backend_domain}/get-video?id=${userID}`}></Vidplays>
                    </View>
                    <TouchableHighlight style={styles.videoModalX} underlayColor={x_touch_color} onPress={onModalClose}>
                        <X_SVG color={x_color}/>
                    </TouchableHighlight>
                </View>
            </Modal>
        )
    }
    else{
        return(
            <View style={styles.generateButtonContainer}>
                <TouchableHighlight style={styles.generateButton} underlayColor={appColors.buttonPressedColor} onPress={onGeneratePress}>
                    <Text style={styles.generateText}>Generate</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export function UploadPhotosContainer(){
    return(
        <View style={styles.uploadContainer}>
            <View style={styles.photosContainer}>
                <PhotoUpload filename={'1.jpg'}/>
                <PhotoUpload filename={'2.jpg'}/>
            </View>
            <GenerateButton/>
        </View>
    )
}
  
const styles = StyleSheet.create({
    uploadContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    photosContainer:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
    },

    previewImage: {
        display: 'flex',
        borderRadius: 10,
        width: 150,
        height: 150,
        ...appColors.addShadow
    },

    touchable: {
        borderRadius: 10,
    },

    imageContainer:{
        backgroundColor: appColors.lighterDark,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,

        ...appColors.addShadow
    },

    touchableX: {
        backgroundColor: appColors.lightColor,
        borderRadius: 1000,
        borderWidth: 0,
        width: 40,
        height: 40,
        position: 'absolute',
        right: -15,
        top: -15,
    },

    svgContainer:{
        width: 100,
        height: 100,
        marginBottom: 10,
    },

    text: {
        color: appColors.textColor,
    },

    generateButtonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    generateButton: {
        width: 330,
        height: 50,
        borderRadius: 10,
        backgroundColor: appColors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    generateText: {
        color: appColors.textColor,
        fontSize: 30,
        fontFamily: 'Poppins',
    },

    insideModalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: appColors.background,
    },
    
    videoModalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
        height: 198,
    },

    videoModalX: {
        backgroundColor: appColors.lightColor,
        borderRadius: 1000,
        borderWidth: 0,
        width: 40,
        height: 40,
        position: 'relative',
        right: 0,
        top: 0,
    },

});
