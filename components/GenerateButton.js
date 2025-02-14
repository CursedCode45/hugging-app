import * as React from 'react';
import { backend_domain } from '../constant/Settings.js';
import * as FileSystem from "expo-file-system";
import { setVideoSize } from '../constant/Helpers.js';
import GenerateVideoButton from './GenerateVideoButton.js';
import GeneratingVideoModal from './GeneratingVideoModal.js';
import { getFormattedDate, getUniqueId } from '../constant/Helpers.js';
import * as ImageManipulator from 'expo-image-manipulator';
import { Image } from 'react-native';


export default function GenerateButton({image1, setImage1, image2, setImage2}){
    const [videoWidth, setVideoWidth] = React.useState(0);
    const [videoHeight, setVideoHeight] = React.useState(0);
    const [stitchedImages, setStitchedImages] = React.useState('');
    const [videoAspectRatio, setVideoAspectRatio] = React.useState(1);

    const [gettingVideo, setGettingVideo] = React.useState(false);
    const [generateClicked, setGenerateClicked] = React.useState(false);
    const [videoStream, setVideoStream] = React.useState(null);

    async function stitchImages() {
        try{

            // Get dimensions of both images
            const img1 = await ImageManipulator.manipulateAsync(image1.uri);
            const img2 = await ImageManipulator.manipulateAsync(image2.uri);
            
            const totalWidth = img1.width + img2.width;
            const maxHeight = Math.max(img1.height, img2.height);
            
            // Create a blank canvas-like image
            const stitchedImage = await ImageManipulator.manipulateAsync(
                image1.uri,
                [],
                { format: ImageManipulator.SaveFormat.PNG }
            );
            
            // Composite the second image next to the first
            const finalImage = await ImageManipulator.manipulateAsync(
                image1.uri,
                [
                    {
                        extent: {
                            backgroundColor: null,
                            height: maxHeight,
                            originX: 0,
                            originY: 0,
                            width: totalWidth,
                        },
                    }
                ],
                { format: ImageManipulator.SaveFormat.JPEG }
            );
            
            setStitchedImages(finalImage.uri);
            console.log(finalImage)
        }
        catch(e){
            console.warn(e);
        }
    }

    async function getVideoFromAPI(){
        const userID =  await getUniqueId();
        const url = `${backend_domain}/get-video?id=${userID}`;
        var fileName = (await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)).length;
        fileName = '000000' + fileName;
        fileName = fileName.substr(fileName.length-7);
        var date_right_now = getFormattedDate();
        const fileUri = FileSystem.documentDirectory + `${date_right_now}_${fileName}.mp4`;
        console.log(`fileUri works ${fileUri}`);
        await FileSystem.downloadAsync(url, fileUri);
        console.log(`Saving image works`);
        setVideoSize(fileUri, setVideoWidth, setVideoHeight, setVideoAspectRatio);
        setVideoStream(fileUri);
        setGettingVideo(false);
    }

    function onGeneratePress(){
        if (image1 !== null && image2 !== null){
            setGenerateClicked(true);
            getVideoFromAPI();
            setGettingVideo(true);
            setImage1(null);
            setImage2(null);
        }
    }

    function onModalClose(){
        setGenerateClicked(false);
        setGettingVideo(false);
    }

    React.useEffect(() => {
        if (image1 !== null && image2 !== null){
            stitchImages();
            console.log('stitched images')
        }
    }, [image1, image2])

    return(
        <>
            <Image source={{uri: stitchedImages}} style={{width: 250, height: 100}}/>
            <GeneratingVideoModal modalVisible={generateClicked} gettingVideo={gettingVideo} onModalClose={onModalClose} videoStream={videoStream} videoAspectRatio={videoAspectRatio}/>
            <GenerateVideoButton image1={image1} image2={image2} onPress={onGeneratePress}/>
        </>
        
    );
}