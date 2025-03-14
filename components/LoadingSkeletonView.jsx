import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    withRepeat,
    useSharedValue,
    withTiming
} from "react-native-reanimated";


const LoadingSkeletonView = ({color1, color2, children, borderRadius=10}) => {
    const colorAnim = useSharedValue(0);
    const colorAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(colorAnim.value, [0, 1], [color1, color2])
        }
    })
    
    function startAnimation(){
        colorAnim.value = withRepeat(
            withTiming(1, { duration: 1000 }),
            -1,
            true
        )
    };
    
    React.useLayoutEffect(() => {
        startAnimation()
    }, [])


    return (
    <Animated.View style={[styles.rootContainer, colorAnimatedStyle, {borderRadius: borderRadius}]}>
        {children}
    </Animated.View>
    )
}

export default LoadingSkeletonView

const styles = StyleSheet.create({
    rootContainer: {
        width: '100%',
        height: '100%',
        zIndex: 5,
    },
})