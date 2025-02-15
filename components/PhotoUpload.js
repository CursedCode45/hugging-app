import * as React from 'react';
import { View, Image, StyleSheet, Alert, TouchableHighlight, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UPLOAD_SVG from '../assets/images/UploadSvg.js';
import X_SVG from '../assets/images/XSVG.js';
import { appColors } from '../constant/AppColors.js';
import { backend_domain } from '../constant/Settings.js';
import { getUniqueId, wp } from '../constant/Helpers.js';



function WithoutImage({filename, onPress}){
    return(
        <View style={styles.container}>
            <TouchableHighlight style={styles.uploadTouchable} underlayColor={appColors.buttonColor} onPress={onPress}>
                <View style={styles.iconTextContainer}>
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
    // React.useEffect(() => {
    //     if (image) {
    //         apiUploadImage();
    //     }
    // }, [image])
    
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
        try {
            const userID = await getUniqueId();
            const apiURL = `${backend_domain}/upload?id=${userID}`
            const formData = new FormData() ;
            formData.append('image', {
                uri: image.uri,
                type: 'image/jpeg',
                name: filename, 
            });
            await fetch(apiURL, {
                method: 'post',
                body :formData,
                headers:{
                    "Content-Type": "multipart/form-data",
                }})
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
            aspect: [1, 1],
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
            <WithImage image={image} onRemoveImage={onXpress}/>
        );
    }
    return(
        <WithoutImage filename={filename} onPress={selectImage}/>
    );

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
    },

    uploadTouchable: {
        borderRadius: 10,
    },

    iconTextContainer:{
        backgroundColor: appColors.lighterDark,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(40),
        height: wp(40),

        borderWidth: 0.4,
        borderColor: appColors.veryLightColor,

        ...appColors.addShadow
    },

    svgContainer:{
        width: wp(24),
        height: wp(24),
        marginBottom: 10,
    },

    text: {
        color: appColors.textColor,
        fontSize: 17,
        fontFamily: appColors.fontSemiBold,
    },

    previewImage: {
        display: 'flex',
        borderRadius: 10,
        width: wp(40),
        height: wp(40),
        ...appColors.addShadow,

        borderWidth: 0.3,
        borderColor: appColors.veryLightColor,
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
});
