import { StyleSheet, View } from 'react-native'
import * as React from 'react'
import { appColors } from '../constant/AppColors'

import Animated, {
    useSharedValue,
    withTiming,
    interpolateColor,
    useAnimatedStyle,
    withRepeat,
} from "react-native-reanimated";


export default function LoadingComponentBreathing({style, breathColor1, breathColor2}){
    const colorAnim = useSharedValue(0.2);

    const colorAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(colorAnim.value, [0, 1], [breathColor1, breathColor2])
        }
    })

    function startAnimation(){
        colorAnim.value = withRepeat(
            withTiming(0.8, { duration: 1000 }),
            -1,
            true
        )
    };

    React.useLayoutEffect(() => {
        startAnimation()
    }, [])

    return (
        <View style={styles.rootContainer}>
            <Animated.View style={[style, colorAnimatedStyle]}>
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
        width: '100%',
        height: '100%',
        borderRadius: 10,
        
    },
})