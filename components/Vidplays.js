import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet } from 'react-native';


export function Vidplays(props) {
  const video_source = props.source
  const player = useVideoPlayer(video_source, (player) => {
    player.loop = true;
    player.staysActiveInBackground= true;
    player.play();
  });

  return (
      <VideoView
        style={[styles.video, props.style]}
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
    borderRadius: 10,
  },
});
