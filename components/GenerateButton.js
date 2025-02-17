import * as React from 'react';
import { backend_domain } from '../constant/Settings.js';
import * as FileSystem from "expo-file-system";
import { setVideoSize } from '../constant/Helpers.js';
import GenerateVideoButton from './GenerateVideoButton.js';
import GeneratingVideoModal from './GeneratingVideoModal.js';
import { getFormattedDate, getUniqueId } from '../constant/Helpers.js';
import MergeImages from './MergeImages.js';
import * as ImageManipulator from 'expo-image-manipulator';


export default function GenerateButton({image1, setImage1, image2, setImage2}){
    const [videoWidth, setVideoWidth] = React.useState(0);
    const [videoHeight, setVideoHeight] = React.useState(0);
    
    const [videoAspectRatio, setVideoAspectRatio] = React.useState(1);
    const [mergedImages, setMergedImages] = React.useState(null);

    const [showModal, setShowModal] = React.useState(false);
    const [gettingVideo, setGettingVideo] = React.useState(false);
    const [videoStream, setVideoStream] = React.useState(null);

    // Merge Images Variables
    const [activateSaveImage, setActivateSaveImage] = React.useState(false);
    const [maxHeight, setMaxHeight] = React.useState();


    
    async function resizeImages(){
        try{

            let img1 = await ImageManipulator.manipulateAsync(image1.uri);
            let img2 = await ImageManipulator.manipulateAsync(image2.uri);

            console.log(`${img1.width}`);
            console.log(`${img1.height}`);

            console.log(`${img2.width}`);
            console.log(`${img2.height}`);

            const img1size = Math.min(img1.width, img1.height);
            const img2size = Math.min(img2.width, img2.height);

            const a = (img1.width - img1.height)/2;

            img1 = await ImageManipulator.manipulateAsync(img1.uri, [{ crop: {height: img1size, originX: 0, originY: 0, width: img1size}}])
            img2 = await ImageManipulator.manipulateAsync(img2.uri, [{ crop: {height: img2size, originX: 0, originY: 0, width: img2size}}])
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~');
            console.log(`${img1.width}`);
            console.log(`${img1.height}`);

            console.log(`${img2.width}`);
            console.log(`${img2.height}`);
            
            let maxHeight = Math.max(img1.height, img2.height);
            maxHeight = Math.min(1080, maxHeight)
            
            img1 = await ImageManipulator.manipulateAsync(img1.uri, [{ resize: {height: maxHeight, width: maxHeight}}])
            img2 = await ImageManipulator.manipulateAsync(img2.uri, [{ resize: {height: maxHeight, width: maxHeight}}])

            setImage1(img1);
            setImage2(img2);
            setMaxHeight(maxHeight);
            setActivateSaveImage(true);
        }
        catch(e){
            console.error('Resize Error:', error);
        }
    }


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
            var date_right_now = getFormattedDate().replaceAll(' ', '_').replaceAll('-', '_');
            console.log(date_right_now);
            console.log(date_right_now);
            const fileUri = FileSystem.documentDirectory + `${date_right_now}_${fileName}.mp4`;

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
        if (image1 && image2 && !mergedImages){
            resizeImages();
        }

    }, [image1, image2])

    return(
        <>
            {(image1 && image2) && <MergeImages maxHeight={maxHeight} activateSaveImage={activateSaveImage} setActivateSaveImage={setActivateSaveImage} image1={image1} image2={image2} mergedImages={mergedImages} setMergedImages={setMergedImages}/>}
            <GeneratingVideoModal showModal={showModal} gettingVideo={gettingVideo} onModalClose={onModalClose} videoStream={videoStream} videoAspectRatio={videoAspectRatio}/>
            <GenerateVideoButton image1={image1} image2={image2} onPress={onGeneratePress}/>
        </>
        
    );
}