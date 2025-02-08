import {Dimensions} from 'react-native';
import { Image } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from "expo-file-system";
import path from 'path-browserify';


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
    const thumbnailURI = await VideoThumbnails.getThumbnailAsync(videoURI, {time: 0});
    const {width, height} = await Image.getSize(thumbnailURI);
    setWidth(width);
    setHeight(height);
    setAspectRatio(width/height);
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