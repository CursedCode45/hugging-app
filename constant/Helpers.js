import {Dimensions} from 'react-native';
import { Image } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from "expo-file-system";
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


// Returns Width Percentage
export function wp(percentage){
    return ((screenWidth*percentage)/100);
}

// Returns Height Percentage
export function hp(percentage){
    return ((screenHeight*percentage)/100);
}

export async function setVideoSize(videoURI, setWidth, setHeight, setAspectRatio=() => {}){
    console.log(`Video uri here: ${videoURI}`)
    try {
        const thumbnailURI = await VideoThumbnails.getThumbnailAsync(videoURI, {time: 0});
        const {width, height} = await Image.getSize(thumbnailURI.uri);
        console.log(`Image is here width: ${width} and height ${height}`)
        setWidth(width);
        setHeight(height);
        setAspectRatio(width/height);
    }
    catch(e){
        console.log(e);
    }
}

export async function setImageSize(imageURI, setWidth, setHeight){
    const {width, height} = await Image.getSize(imageURI);
    setWidth(width);
    setHeight(height);
}

export async function createNewDocumentSubDir(dirName){
    const folderUri = FileSystem.documentDirectory + dirName;
    try {
        const folderInfo = await FileSystem.getInfoAsync(folderUri);
        if (!folderInfo.exists) {
            await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
        }
    }
    catch (error) {
        console.error('Error creating folder:', error);
    }
};



export function getFormattedDate() {
    const date = new Date();
    
    const optionsDate = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);

    const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-GB', optionsTime).toUpperCase();

    return `${formattedDate} - ${formattedTime.replace(':', ' ')}`;
}

export async function getUniqueId() {
    let userId = await SecureStore.getItemAsync('userId');

    if (userId) {
        return userId;
    }
    else{
        userId = Crypto.randomUUID();
        await SecureStore.setItemAsync('userId', userId);
    } 
}


export function blobToBase64(blob){
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};