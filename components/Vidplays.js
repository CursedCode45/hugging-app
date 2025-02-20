import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Image } from 'react-native';
import * as FileSystem from "expo-file-system";
import * as React from 'react';
import Watermark from './../assets/images/Watermark.png'
import { wp } from '../constant/Helpers';


export function Vidplays({source, style, showWatermark=false}) {
  const [video, setVideo] = React.useState(null);


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

  console.log(`Show watermark: ${showWatermark}`)

  if (showWatermark){
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
