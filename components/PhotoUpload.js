import React from 'react';
import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Alert, TouchableHighlight, Text, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import UPLOAD_SVG from '../assets/images/UploadSvg';
import X_SVG from '../assets/images/XSVG';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EditImageModal } from './ManipulateImage.js';
import { appColors } from '../constant/AppColors';



const on_touch_color = appColors.buttonColor;
const x_touch_color = appColors.buttonColor;
const x_color = appColors.lighterDark;


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
        

        const formData = new FormData();
        formData.append('image', {
            uri: image.uri, // File URI
            type: 'image/jpeg', // MIME type
            name: props.filename, // File name
        });

        try {
            const response = await axios.post('http://192.168.100.154:8083/upload', formData);
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


    function WithImage(){
        if (isEdited){
            return(
                <View style={styles.container}>
                    <View style={styles.previewImage}>
                        {image && (<Image source={{ uri: image.uri }} style={styles.previewImage} />)}
                    </View>
                    <TouchableHighlight style={styles.touchableX} underlayColor={x_touch_color} onPress={() => {setImage(null); setIsEdited(false);}}>
                        <View style={styles.xContainer}>
                            <X_SVG color={x_color}/>
                        </View>
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
                            <Text style={styles.text}>{(props.filename === 'image1.jpg')? 'Image 1': 'Image 2'}</Text>
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
                        <Text style={styles.text}>{(props.filename === 'image1.jpg')? 'Image 1': 'Image 2'}</Text>
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

export function UploadPhotosContainer(){
    return(
        <View style={styles.uploadContainer}>
            <PhotoUpload filename={'image1.jpg'}/>
            <PhotoUpload filename={'image2.jpg'}/>
        </View>
    )
}
  
const styles = StyleSheet.create({
    uploadContainer:{
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
    }

});
