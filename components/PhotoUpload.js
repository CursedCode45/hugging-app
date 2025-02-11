import React from 'react';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Alert, TouchableHighlight, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import UPLOAD_SVG from '../assets/images/UploadSvg';
import X_SVG from '../assets/images/XSVG';
import { appColors } from '../constant/AppColors';
import { backend_domain } from '../constant/Settings.js';
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';
import { wp, hp } from '../constant/Helpers.js';
import { setVideoSize } from '../constant/Helpers.js';
import GenerateVideoButton from './GenerateVideoButton.js';
import GeneratingVideoModal from './GeneratingVideoModal.js';
import { getFormattedDate, getUniqueId } from '../constant/Helpers.js';


const on_touch_color = appColors.buttonColor;
const x_touch_color = appColors.buttonColor;
const x_color = appColors.lighterDark;


function PhotoUpload({image, setImage, filename}){

    useEffect(() => {
        if (image) {
            apiUploadImage();
        }
    }, [image])

    
    async function apiRemoveImage(image) {
        const id = await getUniqueId();
        const url = `${backend_domain}/remove-image?image=${image}&id=${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    async function apiUploadImage() {
        const formData = new FormData() ;
        formData.append('image', {
            uri: image.uri,
            type: 'image/jpeg',
            name: filename,
        });

        try {
            const userID = await getUniqueId();
            await axios.post(`${backend_domain}/upload?id=${userID}`, formData);
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
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]); // Store selected image data
        }
    }

    function onXpress(){
        setImage(null);
        apiRemoveImage(filename);
    }


    function WithImage(){
        return(
            <View style={styles.container}>
                <View style={styles.previewImage}>
                    <Image source={{ uri: image.uri }} style={styles.previewImage} />
                </View>
                <TouchableHighlight style={styles.touchableX} underlayColor={x_touch_color} onPress={onXpress}>
                    <X_SVG color={x_color}/>
                </TouchableHighlight>
            </View>
        );
    }

    function WithoutImage(){
        return(
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchable} underlayColor={on_touch_color} onPress={selectImage}>
                    <View style={styles.imageContainer}>
                        <View style={styles.svgContainer}>
                            <UPLOAD_SVG color={'rgb(255, 255, 255)'}/>
                        </View>
                        <Text style={styles.text}>{(filename === '1.jpg')? 'Image 1': 'Image 2'}</Text>
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
    return(
        <WithoutImage/>
    );

}

function GenerateButton({image1, setImage1, image2, setImage2}){
    const [videoWidth, setVideoWidth] = useState(0);
    const [videoHeight, setVideoHeight] = useState(0);
    const [videoAspectRatio, setVideoAspectRatio] = useState(1);

    const [gettingVideo, setGettingVideo] = useState(false);
    const [generateClicked, setGenerateClicked] = useState(false);
    const [videoStream, setVideoStream] = useState(null);

    async function getVideoFromAPI(){
        const userID =  await getUniqueId();
        const url = `${backend_domain}/get-video?id=${userID}`;
        var fileName = (await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)).length;
        fileName = '000000' + fileName;
        fileName = fileName.substr(fileName.length-7);
        var date_right_now = getFormattedDate();
        const fileUri = FileSystem.documentDirectory + `${date_right_now}_${fileName}.mp4`;
        await FileSystem.downloadAsync(url, fileUri);
        setVideoSize(fileUri, setVideoWidth, setVideoHeight, setVideoAspectRatio);
        setVideoStream(fileUri);
        setGettingVideo(false);
    }

    async function saveToGallery(){
        await MediaLibrary.saveToLibraryAsync(videoStream);
    }

    function onGeneratePress(){
        if (image1 !== null && image2 !== null){
            setGenerateClicked(true);
            getVideoFromAPI();
            setGettingVideo(true);
            setImage1(null);
            setImage2(null);
        }
    }

    function onModalClose(){
        setGenerateClicked(false);
        setGettingVideo(false);
    }


    if (generateClicked){
        return(
            <GeneratingVideoModal gettingVideo={gettingVideo} onModalClose={onModalClose} videoStream={videoStream} videoAspectRatio={videoAspectRatio}/>
        )
    }
    return(
        <GenerateVideoButton image1={image1} image2={image2} onPress={onGeneratePress}/>
    );
}

export function UploadPhotosContainer(){
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);


    return(
        <View style={styles.uploadContainer}>
            <View style={styles.photosContainer}>
                <PhotoUpload image={image1} setImage={setImage1} filename={'1.jpg'}/>
                <PhotoUpload image={image2} setImage={setImage2} filename={'2.jpg'}/>
            </View>
            <GenerateButton image1={image1} setImage1={setImage1} image2={image2} setImage2={setImage2}/>
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
        justifyContent: 'center',
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
        ...appColors.addShadow,

        borderWidth: 0.3,
        borderColor: appColors.veryLightColor,
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

        borderWidth: 0.4,
        borderColor: appColors.veryLightColor,

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

        borderWidth: 0.8,
        borderColor: appColors.buttonPressedColor,

    },

    generateButtonUnclickable: {
        width: 330,
        height: 50,
        borderRadius: 10,
        backgroundColor: appColors.mediumDark,
        alignItems: 'center',
        justifyContent: 'center',
        
        borderWidth: 0.4,
        borderColor: appColors.veryLightColor,
    },

    generateText: {
        color: appColors.textColor,
        fontSize: 30,
    },
    
    videoModalContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(90),
        height: wp(90)/1.66666,
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
        marginBottom: 20,
        marginTop: 20,
        backgroundColor: appColors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
    },

    downloadText: {
        color: appColors.textColor,
        fontSize: 30,
    },

});
