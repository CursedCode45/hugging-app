import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Image, StatusBar } from 'react-native';
import * as FileSystem from "expo-file-system";
import * as React from 'react';
import Watermark from './../assets/images/Watermark_User_Vids.png';


export function Vidplays({source, style, showWatermark=false}) {
  const [video, setVideo] = React.useState(null);
  const watermarkToBool = (showWatermark === 'true')? true : false


  React.useEffect(()=>{
    async function loadVideo(){
        try{
            const exist = await FileSystem.getInfoAsync(source);
            setVideo(source)
        }
        catch(e){
            console.log(`VidPlay Error: ${e}`);
        }
    }
    loadVideo();
  }, [])

  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.staysActiveInBackground= true;
    player.play();
  });

  if (watermarkToBool){
    return(
      <View style={[styles.video, style]}>
        <Image source={Watermark} style={[styles.watermark]}/>
        <VideoView
        style={[styles.video, style]}
        player={player}
        allowsFullscreen={false} // Disables fullscreen button
        allowsPictureInPicture={true} // Disables picture-in-picture mode
        nativeControls={false}
        contentFit={'cover'}
        />
      </View>
    )
  }

  return (
      <VideoView
        style={[styles.video, style]}
        player={player}
        allowsFullscreen={false} // Disables fullscreen button
        allowsPictureInPicture={true} // Disables picture-in-picture mode
        nativeControls={false}
        contentFit={'cover'}
      />
  )
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  watermark:{
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1000,
  }
});
