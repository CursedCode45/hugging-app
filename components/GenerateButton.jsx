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
    const [videoAspectRatio, setVideoAspectRatio] = React.useState(1.66666666);


    // Variables For Merge Images Component
    const [mergedImages, setMergedImages] = React.useState(null);

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

            const response = await fetch(apiURL, {method: 'post', body :formData, headers:{"Content-Type": "multipart/form-data"}})
            if (!response.ok){
                return false;  
            }
            
            const metadataEncoded = response.headers.get('X-Metadata');
            const metadata = JSON.parse(decodeURIComponent(metadataEncoded));
            const videoBlob = await response.blob();

            // Make a new Video file name
            var fileName = metadata.video_id;
            fileName = '00000000000' + fileName;
            fileName = fileName.substr(fileName.length-12);
            fileName = `${fileName}.mp4`;
            const fileUri = FileSystem.documentDirectory + fileName;

            const fr = new FileReader();
            fr.onload = async function(e) {
                await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
                setVideoSizeAndSaveThumbnail(fileUri, setVideoAspectRatio);
                setVideoStream(fileUri);
                setGettingVideo(false);
            };
            fr.readAsDataURL(videoBlob);
            if(!isPremium){
                await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'true');
            }
            else{
                await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'false');
            }
            setUsesLeft(usesLeft-1);
            return true

        }
        catch (error) {
            console.error('Error Getting Video:', error);
            return false
        }
    }

    async function onGeneratePress(){
        if (mergedImages && usesLeft > 0){
            setShowModal(true);
            setGettingVideo(true);
            const isSuccessful = await apiUploadImage();
            setImage1(null);
            setImage2(null);
            setMergedImages(null);
            if (!isSuccessful){
                onModalClose();
                Alert.alert('Something went wrong please try again later');
            }
        }

        else if (mergedImages && usesLeft === 0 && isPremium){
            Alert.alert(`You've ran out of uses for today, please try again tomorrow`)
        }
        else if (mergedImages && usesLeft === 0 && !isPremium){
            Alert.alert('Are you sure?', 'This action will permanently delete the video', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => console.log('Delete Pressed')
                },
            ]);
        }
        else if (mergedImages && usesLeft === null){
            Alert.alert(`Not connected to the server, please restart the app or try again later`);
        }
    }

    function onModalClose(){
        setGettingVideo(false);
        setShowModal(false);
        setVideoStream(null);
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