import * as React from 'react';
import { View, Image, StyleSheet, Alert, TouchableHighlight, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import UPLOAD_SVG from '../assets/images/UploadSvg.js';
import X_SVG from '../assets/images/XSVG.js';
import { appColors } from '../constant/AppColors.js';
import { backend_domain } from '../constant/Settings.js';
import { getUniqueId } from '../constant/Helpers.js';



function WithoutImage({filename, onPress}){
    return(
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchable} underlayColor={appColors.buttonColor} onPress={onPress}>
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

function WithImage({image, onRemoveImage}){
    return(
        <View style={styles.container}>
            <View style={styles.previewImage}>
                <Image source={{ uri: image.uri }} style={styles.previewImage} />
            </View>
            <TouchableHighlight style={styles.touchableX} underlayColor={appColors.buttonColor} onPress={onRemoveImage}>
                <X_SVG color={appColors.lighterDark}/>
            </TouchableHighlight>
        </View>
    );
}


export default function PhotoUpload({image, setImage, filename}){
    React.useEffect(() => {
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


    if (image){
        return(
            <WithImage onRemoveImage={selectImage}/>
        );
    }
    return(
        <WithoutImage filename={filename} onPress={onXpress}/>
    );

}

const styles = StyleSheet.create({
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
});
