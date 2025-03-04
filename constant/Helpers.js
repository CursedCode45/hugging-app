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


// Returns Width Percentage
export function wp(percentage){
    return ((screenWidth*percentage)/100);
}

// Returns Height Percentage
export function hp(percentage){
    return ((screenHeight*percentage)/100);
}

export async function setVideoSizeAndSaveThumbnail(videoURI, setWidth, setHeight, setAspectRatio=() => {}){
    try {
        const thumbnailURI = await VideoThumbnails.getThumbnailAsync(videoURI, {time: 0});
        const {width, height} = await Image.getSize(thumbnailURI.uri);
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


export async function getCurrentAppUsesLeft(){
    try{
        await resetDailyUsesIfPremium();
        const usesCount = await SecureStore.getItemAsync(`uses_left`);
        if (!usesCount){
            console.log(`Initiating Uses Count with: ${USES_COUNT_ON_INSTALL} uses`)
            await SecureStore.setItemAsync('uses_left', `${USES_COUNT_ON_INSTALL}`);
            return USES_COUNT_ON_INSTALL;
        }
        const usesToInt = parseInt(usesCount)
        return usesToInt
    }
    catch(e){
        console.log(`Error Getting Uses Count: ${e}`);
    }
}

export async function canUseApp() {
    try{
        let useCountInt = await getCurrentAppUsesLeft();
        if (useCountInt <= 0){
            return false;
        }
        return true;
    }
    catch(e){
        console.log(`Error happend while trying to check uses: ${e}`);
    }
}

export async function appUseCredit(){
    try{
        const canUse = await canUseApp();
        if (canUse){
            let useCountInt = await getCurrentAppUsesLeft();
            useCountInt = useCountInt - 1;
            const usesToString = useCountInt.toString();
            await SecureStore.setItemAsync('uses_left', usesToString);
        }
        else{
            console.log('No uses left');
        }
    }
    catch(e){
        console.log(`Error happend while trying to use app: ${e}`);
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
        return false;
    }
}

export async function getIsPremium(){
    try{
        const isPremium = await SecureStore.getItemAsync(`is_premium`);
        if (!isPremium){
            console.log(`Initiating is_premium with: no`);
            await SecureStore.setItemAsync('is_premium', 'no');
            return 'no';
        }
        return isPremium
    }
    catch(e){
        console.log(`Error Checking If App Is Premium: ${e}`);
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
        const isPremium = await SecureStore.getItemAsync(`is_premium`);
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

export async function restoreAllVideos(){
    try{
        const isPremium = await getIsPremium();
        const userID = await getUniqueId();
        const apiURL = `${backend_domain}/get-all-video-urls?id=${userID}`
        const video_info_response = await fetch(apiURL);
        const video_info_json = await video_info_response.json();

        if (video_info_json.videos.length === 0){
            Alert.alert('No videos found!');
            return;
        }
        
        for (const video_info of video_info_json.videos){
            let fileName = `${parseInt(video_info.name.split('.')[0])}`;
            fileName = '00000000000' + fileName;
            fileName = fileName.substr(fileName.length-12);
            fileName = `${fileName}.mp4`;
            const fileUri = FileSystem.documentDirectory + fileName;

            console.log(`Getting Video: ${fileName}`);
            console.log(`Video url: ${video_info.url}`);
            await FileSystem.downloadAsync(video_info.url, fileUri);
            console.log(`Downloaded: ${fileName}`);
            (isPremium === 'no')
            ? await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'true')
            : await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'false');
            console.log(`Setting watermark settings: ${isPremium}`);
        }
    }
    catch(e){
        console.warn(`Error getting all videos: ${e}`)
    }
}