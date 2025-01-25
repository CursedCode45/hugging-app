import React, {useState} from 'react';
import { View, Image, StyleSheet, Alert, TouchableHighlight, Text, Dimensions, Modal, Pressable } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { appColors } from '../constant/AppColors';

const on_touch_color = appColors.buttonColor;
const x_touch_color = appColors.buttonColor;
const x_color = appColors.lighterDark;

export function EditImageModal(props) {
    function GestureComp(){
        const screen_width = Dimensions.get('screen').width;
        const screen_height = styles.containerG.height
        
        // const width_Sqare = useSharedValue(styles.imageContainer.width);
        // const height_Sqare = useSharedValue(styles.imageContainer.height);
        // const startScale = useSharedValue(0);
        // const init_x = useSharedValue(0);
        // const init_y = useSharedValue(0);
        // const position_x = useSharedValue(0);
        // const position_y = useSharedValue(0);

        const [width_Sqare, setWidth_Square] = useState(styles.imageContainer.width);
        const [height_Sqare, setHeight_Square] = useState(styles.imageContainer.height);
        const [startScaleWidth, setStartScaleWidth] = useState(0);
        const [startScaleHeight, setStartScaleHeight] = useState(0);
        const [init_x, setInit_x] = useState(0);
        const [init_y, setInit_y] = useState(0);
        const [position_x, setPosition_x] = useState(0);
        const [position_y, setPosition_y] = useState(0);


    
        const panGesture = Gesture.Pan()
        .onStart((e) => {
            console.log('starting works');
        })
        .onUpdate((e) => {
            var newX;
            var newY;
            newX = e.translationX + init_x;
            newY = e.translationY + init_y;

            newX = Math.max(0, newX);
            setPosition_x(Math.min(screen_width-width_Sqare, newX));

            newY = Math.max(0,newY);
            setPosition_y(Math.min(screen_height-height_Sqare, newY));
        })
        .onEnd((e) => {
            setInit_x(position_x);
            setInit_y(position_y);
        });
        

        const pinch = Gesture.Pinch()
        .onStart(() => {
            setStartScaleWidth(width_Sqare);
            setStartScaleHeight(height_Sqare);
        })
        .onUpdate((event) => {
            var newWidth;
            var newHeight;
            newWidth = startScaleWidth*event.scale
            newHeight = startScaleHeight*event.scale

            var newX = Math.max(0, position_x);
            newX = Math.min(screen_width-width_Sqare, newX);
            setPosition_x(newX)

            var newY = Math.max(0, position_y);
            newY = Math.min(screen_height-height_Sqare, newY);
            setPosition_y(newY)


            if (width_Sqare >= screen_width || height_Sqare >= screen_height){
                newWidth = Math.min(screen_width, newWidth);
                newHeight = Math.min(screen_height, newHeight);

                newX = Math.max(0, position_x);
                newX = Math.min(screen_width-width_Sqare, newX);
                setPosition_x(newX)

                newY = Math.max(0, position_y);
                newY = Math.min(screen_height-height_Sqare, newY);
                setPosition_y(newY)

                console.log(`\n`)
            }
            setWidth_Square(newWidth);
            setHeight_Square(newHeight);
        })
        .runOnJS(true);
    
        // const boxAnimatedStyles = useAnimatedStyle(() => ({
        //     width: width_Sqare.value,
        //     height: height_Sqare.value,
        //     top: position_y.value,
        //     left: position_x.value,
        // }));

        // const topLeftBox = useAnimatedStyle(() => ({
        //     width: 1,
        //     height: 1,
        //     top: position_y.value - height_Sqare.value,
        //     left: position_x.value,
        //     backgroundColor: 'rgb(0, 255, 0)',
        //     zIndex: 999,
        // }));

        // const bottomrightBox = useAnimatedStyle(() => ({
        //     width: 1,
        //     height: 1,
        //     top: position_y.value - 2,
        //     left: position_x.value + width_Sqare.value - 1,
        //     backgroundColor: 'rgb(0, 255, 0)',
        //     zIndex: 999,
        // }));

        return(
            <GestureHandlerRootView style={styles.containerG}>  
                <GestureDetector gesture={panGesture}>
                    <GestureDetector gesture={pinch}>
                        <View>
                            <View style={{ width: width_Sqare, height: height_Sqare, top: position_y, left: position_x}}>
                                <Image style={styles.image} source={{ uri: props.uri }}/>
                            </View>
                            {/* <Animated.View style={topLeftBox}></Animated.View>
                            <Animated.View style={bottomrightBox}></Animated.View> */}
                        </View>
                    </GestureDetector>
                </GestureDetector>
            </GestureHandlerRootView>
        )
    }

    const [modalVisible, setModalVisible] = useState(true);
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableHighlight style={styles.button} underlayColor={appColors.buttonPressColor} onPress={() => {setModalVisible(!modalVisible);}}>
                        <Text style={styles.textStyle}>Complete</Text>
                    </TouchableHighlight>
                    <GestureComp></GestureComp>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    containerG: {
        width: '100%',
        height: 350,
        backgroundColor: appColors.background,
    },
    imageContainer: {
        width: 100,
        height: 100,
    },
    image: {
        width: '100%',
        height: '100%',
    },



    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        display: 'flex',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height*0.8,
        position: 'absolute',
        bottom: -20,
        margin: 20,
        backgroundColor: appColors.lighterDark,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.65,
        shadowRadius: 10,
        elevation: 5,

        backgroundColor: appColors.buttonColor,
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});