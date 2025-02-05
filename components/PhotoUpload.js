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
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';




const on_touch_color = appColors.buttonColor;
const x_touch_color = appColors.buttonColor;
const x_color = appColors.lighterDark;


function getFormattedDate() {
    const date = new Date();
    
    const optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);

    const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-GB', optionsTime).toUpperCase();

    return `${formattedDate} - ${formattedTime}`;
}

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
    useEffect(() =>{
        if (props.image){
            uploadImage();
        }
    }, [props.isEdited])

    async function uploadImage() {
        if (!props.image) {
            Alert.alert('No image selected');
            return;
        }

        const formData = new FormData() ;
        formData.append('image', {
            uri: props.image.uri, // File URI
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
            props.setImage(result.assets[0]); // Store selected image data
        }
    }

    function onXpress(){
        props.setImage(null);
        props.setIsEdited(false);
        sendImageNull(props.filename);
    }


    function WithImage(){
        if (props.isEdited){
            return(
                <View style={styles.container}>
                    <View style={styles.previewImage}>
                        {props.image && (<Image source={{ uri: props.image.uri }} style={styles.previewImage} />)}
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
                    <TouchableHighlight style={styles.touchable} underlayColor={on_touch_color} onPress={() => {}}>
                        <View style={styles.imageContainer}>
                            <View style={styles.svgContainer}>
                                <UPLOAD_SVG color={'rgb(255, 255, 255)'}/>
                            </View>
                            <Text style={styles.text}>{(props.filename === '1.jpg')? 'Image 1': 'Image 2'}</Text>
                        </View>
                    </TouchableHighlight>
                    <EditImageModal setIsEdited={props.setIsEdited} setImage={props.setImage} uri={props.image.uri}></EditImageModal>
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


    if (props.image){
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

export function GenerateButton(props){
    const [generateClicked, setGenerateClicked] = useState(false);
    const [videoStream, setVideoStream] = useState(null);
    const [buttonStyle, setButtonStyle] = useState(styles.generateButton);
    const [buttonPressColor, setButtonPressColor] = useState(appColors.mediumDark);

    async function getVideoFromAPI(){
        const userID =  await getUniqueId();
        const url = `${backend_domain}/get-video?id=${userID}`;
        var fileName = (await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)).length;
        fileName = '000000' + fileName;
        fileName = fileName.substr(fileName.length-7);
        var date_right_now = getFormattedDate();
        const fileUri = FileSystem.documentDirectory + `${date_right_now}_${fileName}.mp4`;
        const { uri } = await FileSystem.downloadAsync(url, fileUri);
        setVideoStream(fileUri);
    }

    async function saveToGallery(){
        await MediaLibrary.saveToLibraryAsync(videoStream);
    }

    function onGeneratePress(){
        if (props.image1 !== null && props.image2 !== null){
            setButtonPressColor(appColors.buttonPressedColor);
            setGenerateClicked(true);
            getVideoFromAPI();
            props.setImage1(null);
            props.setImage2(null);
            props.setIsEdited1(false);
            props.setIsEdited2(false);
        }
    }

    function onModalClose(){
        setGenerateClicked(false);
    }

    useEffect(() => {
        if (props.image1 !== null && props.image2 !== null){
            setButtonStyle(styles.generateButton);
            setButtonPressColor(appColors.buttonPressedColor);
        }
        else{
            setButtonStyle(styles.generateButtonUnclickable);
            setButtonPressColor(appColors.mediumDark);
        }
    }, [props.image1, props.image2])


    if (generateClicked){
        return(
            <Modal color={appColors.background} animationType="slide" transparent={false} visible={true} onRequestClose={onModalClose}>
                <View style={styles.insideModalContainer}>
                    <View style={styles.videoModalContainer}>
                        <Vidplays source={videoStream}></Vidplays>
                    </View>
                    <TouchableHighlight style={styles.videoModalX} underlayColor={x_touch_color} onPress={onModalClose}>
                        <X_SVG color={x_color}/>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.downloadButton} underlayColor={appColors.buttonPressedColor} onPress={saveToGallery}>
                        <Text style={styles.downloadText}>Download</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        )
    }
    else{
        return(
            <View style={styles.generateButtonContainer}>
                <TouchableHighlight style={buttonStyle} underlayColor={buttonPressColor} onPress={onGeneratePress}>
                    <Text style={styles.generateText}>Generate</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export function UploadPhotosContainer(){
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [isEdited1, setIsEdited1] = useState(false);
    const [isEdited2, setIsEdited2] = useState(false);

    return(
        <View style={styles.uploadContainer}>
            <View style={styles.photosContainer}>
                <PhotoUpload isEdited={isEdited2} setIsEdited={setIsEdited2} image={image1} setImage={setImage1} filename={'1.jpg'}/>
                <PhotoUpload isEdited={isEdited1} setIsEdited={setIsEdited1} image={image2} setImage={setImage2} filename={'2.jpg'}/>
            </View>
            <GenerateButton isEdited1={isEdited1} setIsEdited1={setIsEdited1} isEdited2={isEdited2} setIsEdited2={setIsEdited2} image1={image1} setImage1={setImage1} image2={image2} setImage2={setImage2}/>
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

    generateButtonUnclickable: {
        width: 330,
        height: 50,
        borderRadius: 10,
        backgroundColor: appColors.mediumDark,
        alignItems: 'center',
        justifyContent: 'center',
    },

    generateText: {
        color: appColors.textColor,
        fontSize: 30,
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

    downloadButton: {
        width: 330,
        height: 50,
        borderRadius: 10,
        backgroundColor: appColors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    downloadText: {
        color: appColors.textColor,
        fontSize: 30,
    },

});
