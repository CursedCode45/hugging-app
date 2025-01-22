import { useVideoPlayer, VideoView, VideoPlayer } from 'expo-video';
import { useEffect, useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';



export function Vidplays() {
  const video_source = 'http://192.168.100.154:8083/get-video'
  const player = useVideoPlayer(video_source, (player) => {
    player.loop = true;
    player.staysActiveInBackground= true;
    player.play();
  });

  return (
    <View style={styles.container}>
       <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen={false} // Disables fullscreen button
        allowsPictureInPicture={true} // Disables picture-in-picture mode
        nativeControls={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  video: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
