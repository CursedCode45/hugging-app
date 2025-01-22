import { useEffect, useState } from 'react';
import { View, Button, Image, StyleSheet, Alert, TouchableHighlight, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import UPLOAD_SVG from '../assets/images/UploadSvg';
import X_SVG from '../assets/images/XSVG';
import { changeImageMan } from './ManipulateImage';


const on_touch_color = 'rgb(255, 255, 255)';
const x_touch_color = 'rgb(179, 179, 179)';
const x_color = 'rgb(34, 34, 34)';


export function PhotoUpload(props){
    const [image, setImage] = useState(null);
    const [jimpImage, setJimpImage] = useState(null);

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

    useEffect(() => {
        if (image) {
            console.log(image);
            const result = changeImageMan(image)
            console.log(result);
        }
    }, [image])


    const withImage = () => (
        <View style={styles.container}>
            <View style={styles.previewImage}>
                {image && (<Image source={{ uri: image.uri }} style={styles.previewImage} />)}
            </View>
            <TouchableHighlight style={styles.touchableX} underlayColor={x_touch_color} onPress={() => {setImage(null);}}>
                <View style={styles.xContainer}>
                    <X_SVG color={x_color}/>
                </View>
            </TouchableHighlight>
        </View>
    )

    const withoutImage = () => (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchable} underlayColor={on_touch_color} onPress={selectImage}>
                <View style={styles.imageContainer}>
                    <View style={styles.svgContainer}>
                        <UPLOAD_SVG color={'rgb(255, 255, 255)'}/>
                    </View>
                    <Text style={styles.text}>Add new Image</Text>
                </View>
            </TouchableHighlight>
        </View>
    )


    return (
        (image)? withImage(): withoutImage()
    );
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
    },

    touchable: {
        borderRadius: 10,
    },

    imageContainer:{
        backgroundColor: 'rgb(53, 53, 53)',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
    },

    touchableX: {
        backgroundColor: 'rgb(107, 107, 107)',
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
        color: 'rgb(255, 255, 255)',
    }

});
