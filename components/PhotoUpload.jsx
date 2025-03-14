import * as React from 'react';
import { View, Image, StyleSheet, Alert, TouchableHighlight, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UPLOAD_SVG from '../assets/images/UploadSvg.js';
import X_SVG from '../assets/images/XSVG.js';
import { appColors } from '../constant/AppColors.js';
import { wp } from '../constant/Helpers.js';
import * as ImageManipulator from 'expo-image-manipulator';
import LoadingSkeletonView from './LoadingSkeletonView.jsx';
import { useAppContext } from '../AppContext.js';


function WithoutImage({filename, onPress}){
    return(
        <View style={styles.container}>
            <TouchableHighlight style={styles.uploadTouchable} underlayColor={appColors.buttonColor} onPress={onPress}>
                <View style={styles.iconTextContainer}>
                    <View style={styles.svgContainer}>
                        <UPLOAD_SVG color={appColors.lightColor}/>
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
            <View style={styles.iconTextContainer}>
                <Image source={{ uri: image.uri }} style={styles.iconTextContainer} />
            </View>
            <TouchableHighlight style={styles.touchableX} underlayColor={appColors.buttonColor} onPress={onRemoveImage}>
                <X_SVG color={appColors.lighterDark}/>
            </TouchableHighlight>
        </View>
    );
}

function Loading(){
    return(
        <View style={[styles.container, styles.iconTextContainer]}>
            <LoadingSkeletonView color1={appColors.lighterDark} color2={appColors.weakLight}/>
        </View>
    );
}


export default function PhotoUpload({image, setImage, filename}){
    const { usesLeft, setUsesLeft, isPremium, setIsPremium } = useAppContext();

    async function selectImage(){
        try{
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
                return;
            }
            
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaType,
                allowsEditing: true,
                quality: 1,
                aspect: [1, 1],
            });
            
            if (!result.canceled) {
                // Resize Images so that it's a square 768x768
                let img = await ImageManipulator.manipulateAsync(result.assets[0].uri);
                const imgSize = Math.min(img.width, img.height);
                const offsetX = (img.width - imgSize)/2
                const offsetY = (img.height - imgSize)/2
                img = await ImageManipulator.manipulateAsync(img.uri, [ { crop: {height: imgSize, originX: offsetX, originY: offsetY, width: imgSize}},
                                                                        { resize: {height: 768, width: 768}} ]);
                setImage(img);
            }
        }
        catch(e){
            console.log(`Selecting Image Error: ${e}`)
        }
    }

    function onXpress(){
        setImage(null);
    }

    if (usesLeft === null){
        return(
            <Loading/>
        )
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
        marginLeft: 5,
        marginRight: 5,
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
        width: wp(47),
        height: wp(47),
        maxWidth: 300,
        maxHeight: 300,
    },

    svgContainer:{
        width: wp(11),
        height: wp(11),
        maxWidth: 100,
        maxHeight: 100,
    },

    text: {
        marginTop: 8,
        color: appColors.lightColor,
        fontSize: 15,
    },

    touchableX: {
        backgroundColor: appColors.lightColor,
        borderRadius: 1000,
        borderWidth: 0,
        width: 35,
        height: 35,
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 30,
    },
});
