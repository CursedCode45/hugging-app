import { StyleSheet, Text, View } from 'react-native'
import * as React from 'react'
import { hp, wp } from '../constant/Helpers'
import { appColors } from '../constant/AppColors'

import Animated, {
    useSharedValue,
    withTiming,
    interpolateColor,
    useAnimatedStyle,
    withRepeat,
  } from "react-native-reanimated";


export default function LoadingBarAndScreenSkeleton(){
    const [text, setText] = React.useState('Loading...');
    const colorAnim = useSharedValue(0.3);
    const widthAnim = useSharedValue(0);

    const barAnimatedStyle =  useAnimatedStyle(() => {
        return({
            width: widthAnim.value
        })
    })

    const colorAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(colorAnim.value, [0, 1], [appColors.closeButtonColor, appColors.closeButtonTextColor])
        }
    })




    function startAnimation(){
        widthAnim.value = withTiming(wp(90-2.4), { duration: 28500 });
        colorAnim.value = withRepeat(
            withTiming(0.7, { duration: 1000 }),
            -1,
            true
        )
    };

    React.useEffect(() => {
        startAnimation()
    }, [])

    return (
        <View style={styles.rootContainer}>
            <Animated.View style={[styles.videoSkeleton, colorAnimatedStyle]}>


                <View style={styles.loadingBarContainer}>
                    <Text style={styles.text}>{text}</Text>
                    <View style={styles.barContainer}>
                        <View style={styles.backgroundBar}></View>
                        <Animated.View style={[styles.topBar, barAnimatedStyle]}></Animated.View>
                    </View>
                </View>
            </Animated.View>
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
        
    },

    loadingBarContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: wp(85)/1.66666666 + hp(2),
    },

    text: {
        width: '100%',
        paddingLeft: wp(1),
        marginBottom: 3,
        color: appColors.closeButtonTextColor,
        fontFamily: appColors.fontExtraLight,
    },

    barContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp(90),
        height: 30,
        padding: wp(1.2),

        borderWidth: 0.2,
        borderColor: appColors.closeButtonTextColor,
    },

    backgroundBar: {
        width: '100%',
        height: 19,

        backgroundColor: appColors.closeButtonColor,
    },

    topBar: {
        position: 'absolute',
        left: wp(1.2),
        height: 15,

        backgroundColor: appColors.closeButtonTextColor,
    }
})