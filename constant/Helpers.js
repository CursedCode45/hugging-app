import {Dimensions} from 'react-native';
import { Image } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
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

export async function setVideoSize(videoURI, setWidth, setHeight){
    const thumbnailURI = await VideoThumbnails.getThumbnailAsync(videoURI, {time: 0});
    const {width, height} = await Image.getSize(thumbnailURI);
    setWidth(width);
    setHeight(height);
}

export async function setImageSize(imageURI, setWidth, setHeight){
    const {width, height} = await Image.getSize(imageURI);
    setWidth(width);
    setHeight(height);
}