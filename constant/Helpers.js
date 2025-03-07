import {Dimensions} from 'react-native';
import { Image } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from "expo-file-system";
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { USES_COUNT_ON_INSTALL, USES_COUNT_ON_PREMIUM } from './Settings';
import { Alert } from 'react-native';
import { backend_domain } from './Settings';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// Returns Width Percentage
export function wp(percentage){
    return ((screenWidth*percentage)/100);
}

// Returns Height Percentage
export function hp(percentage){
    return ((screenHeight*percentage)/100);
}

export async function setVideoSizeAndSaveThumbnail(videoURI, setAspectRatio=() => {}){
    try {
        const thumbnailURI = await VideoThumbnails.getThumbnailAsync(videoURI, {time: 0});
        const {width, height} = await Image.getSize(thumbnailURI.uri);
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
    userId = Crypto.randomUUID();
    await SecureStore.setItemAsync('userId', userId);
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


export async function getAllVideoBasenames(){
    try{
        const results = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        var filtered_files = [];
        for (const item of results){
            if (item.endsWith('.mp4')){
                filtered_files.push(item)
            }
        }
        filtered_files.sort();
        return filtered_files;
    }
    catch(e){
        console.warn(`Error Getting All Video Basenames: ${e}`);
        return [];
    }
}

export async function deleteVideo(videoBasename) {
    try{

        const videoUri = FileSystem.documentDirectory + videoBasename;
        const thumbnailUri = FileSystem.documentDirectory + videoBasename.split('.')[0] + '.jpg';
        if (await FileSystem.getInfoAsync(thumbnailUri)){
            await FileSystem.deleteAsync(thumbnailUri)
        }
        if (await FileSystem.getInfoAsync(videoUri)){
            await FileSystem.deleteAsync(videoUri)
        }
    }
    catch(e){
        console.warn(`Error Deleting Video: ${e}`)
    }
}


export async function getCurrentAppUsesLeft(){
    try{
        const userID = await getUniqueId();
        const apiURL = `${backend_domain}/get-current-uses?id=${userID}`
        const currentUsesResponse = await fetch(apiURL);
        if (!currentUsesResponse.ok) {
            Alert.alert("Issue connecting with the Servers");
            return null;
        }

        const currentUsesJson = await currentUsesResponse.json();
        const currentUses = currentUsesJson.uses;
        console.log(`Got Current Uses: ${currentUses}`);
        return currentUses
    }
    catch(e){
        console.warn(`Error Reading Uses: ${e}`);
        Alert.alert("Issue connecting with the Servers");
        return null;
    }
}


export async function getPremium(){
    try{
        const userID = await getUniqueId();
        const apiURL = `${backend_domain}/buy-premium?id=${userID}`
        const response = await fetch(apiURL);
        if (!response.ok) {
            Alert.alert('Failed to buy premium, try again later');
            return false;
        }
        const responseJson = await response.json();
        if (responseJson.purchase === false){
            Alert.alert('Failed to buy premium, try again later');
            return false;
        }

        let dateOfPurchase = new Date();
        dateOfPurchase = dateOfPurchase.getTime().toString();
        await SecureStore.setItemAsync('is_premium', 'yes');
        await SecureStore.setItemAsync('date_of_purchase', dateOfPurchase);
        await SecureStore.setItemAsync('uses_left', `${USES_COUNT_ON_PREMIUM}`);
        const allVideoBasenames = await getAllVideoBasenames();
        allVideoBasenames.forEach(element => {
            SecureStore.setItemAsync(`show_watermark_${element}`, 'false');
        })
        return true;
    }
    catch(e){
        console.log(`Error Getting Premium: ${e}`);
        Alert.alert('Error Connecting with the server, please try again later');
        return false;
    }
}



export async function buyOneVideo(fileName){
    try{
        const videoID = parseInt(fileName.split('.')[0]);
        const apiURL = `${backend_domain}/buy-one-video?id=${videoID}`
        const response = await fetch(apiURL);
        if (!response.ok) {
            Alert.alert('Failed to buy video, try again later');
            return false;
        }

        const responseJson = await response.json();
        if (responseJson.purchase === false){
            Alert.alert('Failed to buy video, try again later');
            return false;
        }

        await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'false');
        return true;

    }
    catch(e){
        console.warn(`Error Buying Video: ${e}`);
        Alert.alert('Failed to buy video, try again later');
        return false;
    }
}

export async function getIsPremium(clientId){
    try{
        const apiURL = `${backend_domain}/get-is-premium?id=${clientId}`
        const isPremiumResponse = await fetch(apiURL);
        if (!isPremiumResponse.ok) {
            Alert.alert("Issue connecting with the Servers");
            return false;
        }

        const isPremiumJson = await isPremiumResponse.json();
        const isPremium = isPremiumJson.is_premium;
        console.log(`Got premium request: ${isPremium}`);
        return isPremium
    }
    catch(e){
        console.warn(`Error Reading Premium: ${e}`);
        Alert.alert("Issue connecting with the Servers");
        return false;
    }
}

export async function cancelPremium(){
    try{
        const userID = await getUniqueId();
        const apiURL = `${backend_domain}/cancel-premium?id=${userID}`
        const cancelResponse = await fetch(apiURL);
        const cancelJson = await cancelResponse.json();
        console.log(cancelJson.cancel);
        if (cancelJson.cancel === true){   
            await SecureStore.setItemAsync('is_premium', 'no');
            Alert.alert('Premium Canceled')
            return true;
        }
        else{
            Alert.alert("Couldn't cancel, something went wrong, please try again later or email us");
            return false;
        }
    }
    catch(e){
        console.log(`Error Canceling Premium Plan: ${e}`);
        Alert.alert("Couldn't cancel, something went wrong, please try again later or email us");
        return false;
    }
}

export async function resetDailyUsesIfPremium(){
    try{
        const isPremium = true;
        if(isPremium === 'yes'){
            let dateOfPurchase = await SecureStore.getItemAsync(`date_of_purchase`);
            dateOfPurchase = parseInt(dateOfPurchase);
            let dateRightNow = new Date();
            dateRightNow = dateRightNow.getTime();
            if(dateRightNow - dateOfPurchase  >= 86400000){
                await SecureStore.setItemAsync('uses_left', `${USES_COUNT_ON_PREMIUM}`);
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                console.log('Reseted Uses From Daily');
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
            }
        }
    }
    catch(e){
        console.log(`Error Reseting Premium Uses: ${e}`);
    }
}

export async function restoreMissingVideos(isPremium){
    try{
        const userID = await getUniqueId();
        let allLocalVideos = await getAllVideoBasenames();
        const apiURL = `${backend_domain}/get-all-video-urls?id=${userID}`
        const video_info_response = await fetch(apiURL);
        if (!video_info_response.ok){
            Alert.alert("Couldn't get the videos try again later");
            return;
        }
        const video_info_json = await video_info_response.json();

        if (video_info_json.videos.length === 0){
            Alert.alert('No videos found!');
            return;
        }

        let serverVideoBasenames = [];
        for (const video_info of video_info_json.videos){
            let modifyName = `${parseInt(video_info.name.split('.')[0])}`;
            modifyName = '00000000000' + modifyName;
            modifyName = modifyName.substr(modifyName.length-12);
            modifyName = `${modifyName}.mp4`;
            serverVideoBasenames.push(modifyName);
        }

        serverVideoBasenames.sort();
        if (arraysEqual(allLocalVideos, serverVideoBasenames)){
            Alert.alert('There are no missing videos');
            return;
        }

        for (const video_info of video_info_json.videos){
            let fileName = `${parseInt(video_info.name.split('.')[0])}`;
            fileName = '00000000000' + fileName;
            fileName = fileName.substr(fileName.length-12);
            fileName = `${fileName}.mp4`;
            const fileUri = FileSystem.documentDirectory + fileName;

            if (allLocalVideos.includes(fileName)) continue;


            await FileSystem.downloadAsync(video_info.url, fileUri);
            console.log(`Downloaded: ${fileName}`);
            if (isPremium === 'yes' || video_info.is_paid){
                await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'false')
            }
            else{
                await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'true');
            }
        }
    }
    catch(e){
        Alert.alert('Error Connecting with the server, please try again later');
        console.warn(`Error getting all videos: ${e}`)
    }
}