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

export async function base64To3DArrayWithoutCanvas(base64) {
    // Convert base64 string to binary data
    const binary = atob(base64.split(',')[1]);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    // Create an image bitmap from the binary data
    const blob = new Blob([bytes], { type: 'image/jpg' }); // Adjust MIME type if needed
    const bitmap = await createImageBitmap(blob);

    // Create an OffscreenCanvas if available
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);

    // Extract image data
    const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height).data;

    // Convert to 3D array
    const array3D = [];
    for (let y = 0; y < bitmap.height; y++) {
        const row = [];
        for (let x = 0; x < bitmap.width; x++) {
            const index = (y * bitmap.width + x) * 4;
            row.push([
                imageData[index],     // Red
                imageData[index + 1], // Green
                imageData[index + 2]  // Blue
            ]);
        }
        array3D.push(row);
    }

    return array3D;
}
