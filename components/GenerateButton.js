import * as React from 'react';
import { backend_domain } from '../constant/Settings.js';
import * as FileSystem from "expo-file-system";
import { setVideoSize } from '../constant/Helpers.js';
import GenerateVideoButton from './GenerateVideoButton.js';
import GeneratingVideoModal from './GeneratingVideoModal.js';
import { getFormattedDate, getUniqueId } from '../constant/Helpers.js';
import MergeImages from './MergeImages.js';
import * as SecureStore from 'expo-secure-store';


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
            var fileName = (await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)).length;
            fileName = '000000' + fileName;
            fileName = fileName.substr(fileName.length-7);
            var date_right_now = getFormattedDate().replaceAll(/\s/g,'_').replaceAll('-', '_');
            date_right_now = date_right_now.trim();
            fileName = `${date_right_now}_${fileName}.mp4`;
            const fileUri = FileSystem.documentDirectory + fileName;

            const response = await fetch(apiURL, {method: 'post', body :formData, headers:{"Content-Type": "multipart/form-data"}})
            const videoBlob = await response.blob();
            const fr = new FileReader();
            fr.onload = async function(e) {
                await FileSystem.writeAsStringAsync(fileUri, fr.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
                setVideoSize(fileUri, setVideoWidth, setVideoHeight, setVideoAspectRatio);
                setVideoStream(fileUri);
                setGettingVideo(false);
            };
            fr.readAsDataURL(videoBlob);
            await SecureStore.setItemAsync(`show_watermark_${fileName}`, 'true');

        }
        catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    async function onGeneratePress(){
        if (mergedImages){
            setShowModal(true);
            setGettingVideo(true);
            apiUploadImage();
            setImage1(null);
            setImage2(null);
            setMergedImages(null);
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
            <GeneratingVideoModal showModal={showModal} gettingVideo={gettingVideo} onModalClose={onModalClose} videoStream={videoStream} videoAspectRatio={videoAspectRatio}/>
            <GenerateVideoButton image1={image1} image2={image2} onPress={onGeneratePress}/>
        </>
        
    );
}