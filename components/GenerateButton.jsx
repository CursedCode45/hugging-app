import * as React from 'react';
import { backend_domain } from '../constant/Settings.js';
import * as FileSystem from "expo-file-system";
import GenerateVideoButton from './GenerateVideoButton.jsx';
import GeneratingVideoModal from './GeneratingVideoModal.jsx';
import MergeImages from './MergeImages.jsx';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native'
import { useAppContext } from '../AppContext.js';
import { appUseCredit, getAllVideoBasenames, getFormattedDate, getUniqueId, setVideoSizeAndSaveThumbnail } from '../constant/Helpers.js';


export default function GenerateButton({image1, setImage1, image2, setImage2}){
    // Variables For Generating Video Modal Component
    const [showModal, setShowModal] = React.useState(false);
    const [gettingVideo, setGettingVideo] = React.useState(false);
    const [videoStream, setVideoStream] = React.useState(null);
    const [videoWidth, setVideoWidth] = React.useState(0);
    const [videoHeight, setVideoHeight] = React.useState(0);
    const [videoAspectRatio, setVideoAspectRatio] = React.useState(1);


    // Variables For Merge Images Component
    const [mergedImages, setMergedImages] = React.useState(null);

    // Navigation
    const route = useRoute();
    const navigation = useNavigation();

    // Premium Variables
    const { usesLeft, setUsesLeft, isPremium, setIsPremium } = useAppContext();

    async function apiUploadImage() {
        try {
            const userID = await getUniqueId();
            const apiURL = `${backend_domain}/upload-merged-image?id=${userID}`
            const formData = new FormData() ;
            formData.append('image', {
                uri: mergedImages,
                type: 'image/jpeg',
                name: 'merged.jpg', 
            });

            // Make a new Video file name
            var fileName = (await getAllVideoBasenames()).length;
            fileName = '000000' + fileName;
            fileName = fileName.substr(fileName.length-7);
            var date_right_now = getFormattedDate().replaceAll(/\s/g,'_').replaceAll('-', '_');
            date_right_now = date_right_now.trim();
            fileName = `${fileName}_${date_right_now}.mp4`;
            const fileUri = FileSystem.documentDirectory + fileName;

            const response = await fetch(apiURL, {method: 'post', body :formData, headers:{"Content-Type": "multipart/form-data"}})
            const videoBlob = await response.blob();
            const fr = new FileReader();
            fr.onload = async function(e) {
                await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
                setVideoSizeAndSaveThumbnail(fileUri, setVideoWidth, setVideoHeight, setVideoAspectRatio);
                setVideoStream(fileUri);
                setGettingVideo(false);
            };
            fr.readAsDataURL(videoBlob);
            if(isPremium === 'no'){
                await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'true');
            }
            else{
                await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'false');
            }

        }
        catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    async function onGeneratePress(){
        if (mergedImages && usesLeft > 0){
            setShowModal(true);
            setGettingVideo(true);
            apiUploadImage();
            setImage1(null);
            setImage2(null);
            setMergedImages(null);
            setUsesLeft(usesLeft-1);
            appUseCredit();
        }
        else if (mergedImages && usesLeft <= 0){
            Alert.alert(`You've ran out of uses for today, please try again tomorrow.`)
        }
    }

    function onModalClose(){
        setGettingVideo(false);
        setShowModal(false);
    }

    React.useEffect(() => {
        if (!image1 || !image2){
            setMergedImages(null);
        }
    }, [image1, image2])

    return(
        <>
            {(image1 && image2 && !mergedImages) && <MergeImages image1={image1} image2={image2} mergedImages={mergedImages} setMergedImages={setMergedImages}/>}
            <GeneratingVideoModal showModal={showModal} gettingVideo={gettingVideo} onModalClose={onModalClose} videoStream={videoStream} videoAspectRatio={videoAspectRatio} isPremium={isPremium}/>
            <GenerateVideoButton image1={image1} image2={image2} onPress={onGeneratePress}/>
        </>
        
    );
}