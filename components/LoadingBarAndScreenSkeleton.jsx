import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import * as React from 'react'
import { wp } from '../constant/Helpers'
import { appColors } from '../constant/AppColors'
import Animated, {
    useSharedValue,
    withTiming,
    interpolateColor,
    useAnimatedStyle,
    withRepeat,
  } from "react-native-reanimated";


export default function LoadingBarAndScreenSkeleton(){
    const [dots, setDots] = React.useState("");
    const colorAnim = useSharedValue(0);

    const colorAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(colorAnim.value, [0, 1], [appColors.lighterDark, appColors.weakDark])
        }
    })

    function startAnimation(){
        colorAnim.value = withRepeat(
            withTiming(1, { duration: 1000 }),
            -1,
            true
        )
    };

    React.useEffect(() => {
        startAnimation();
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
          }, 1000);
          return () => clearInterval(interval);
    }, [])

    return (
        <View style={styles.rootContainer}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} color={appColors.lightColor} />
            </View>
            <Animated.Text style={styles.text}>Generating{dots}</Animated.Text>
            <Text style={styles.text}>Please do not close the app while video is generating.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: appColors.background,
    },

    videoSkeleton: {
        width: wp(85),
        height: wp(85)/1.66666666,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        
    },


    text: {
        marginBottom: 5,
        marginTop: 10,
        fontSize: 16,
        textAlign: 'start',
        color: appColors.lightColor,
    },

    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

})