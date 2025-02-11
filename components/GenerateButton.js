import * as React from 'react';
import { backend_domain } from '../constant/Settings.js';
import * as FileSystem from "expo-file-system";
import { setVideoSize } from '../constant/Helpers.js';
import GenerateVideoButton from './GenerateVideoButton.js';
import GeneratingVideoModal from './GeneratingVideoModal.js';
import { getFormattedDate, getUniqueId } from '../constant/Helpers.js';


export default function GenerateButton({image1, setImage1, image2, setImage2}){
    const [videoWidth, setVideoWidth] = React.useState(0);
    const [videoHeight, setVideoHeight] = React.useState(0);
    const [videoAspectRatio, setVideoAspectRatio] = React.useState(1);

    const [gettingVideo, setGettingVideo] = React.useState(false);
    const [generateClicked, setGenerateClicked] = React.useState(false);
    const [videoStream, setVideoStream] = React.useState(null);

    async function getVideoFromAPI(){
        const userID =  await getUniqueId();
        const url = `${backend_domain}/get-video?id=${userID}`;
        var fileName = (await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)).length;
        fileName = '000000' + fileName;
        fileName = fileName.substr(fileName.length-7);
        var date_right_now = getFormattedDate();
        const fileUri = FileSystem.documentDirectory + `${date_right_now}_${fileName}.mp4`;
        await FileSystem.downloadAsync(url, fileUri);
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

    return(
        <>
            <GeneratingVideoModal modalVisible={generateClicked} gettingVideo={gettingVideo} onModalClose={onModalClose} videoStream={videoStream} videoAspectRatio={videoAspectRatio}/>
            <GenerateVideoButton image1={image1} image2={image2} onPress={onGeneratePress}/>
        </>
        
    );
}