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

export function EditImageModal() {
    const screen_width = Dimensions.get('screen').width;
    const screen_height = Dimensions.get('screen').height;
    const [modalVisible, setModalVisible] = useState(true);

    function clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    const width_Sqare = useSharedValue(1);
    const height_Sqare = useSharedValue(1);
    const startScale = useSharedValue(0);
    const position_x = useSharedValue(screen_width/2);
    const position_y = useSharedValue(screen_height/2);
    const END_POSITION = 200;

    const panGesture = Gesture.Pan()
    .onUpdate((e) => {
    position_x.value = e.absoluteX;
    position_y.value = e.absoluteY;
    })
    .onEnd((e) => {
        position_x.value = Math.max(width_Sqare.value*50, position_x.value);
        position_x.value = Math.min(screen_width-width_Sqare.value*50, position_x.value);

        position_y.value = Math.max(height_Sqare.value*100, position_y.value);
        position_y.value = Math.min(screen_height-95*2, position_y.value);

        console.log('End')
    });
    
    const pinch = Gesture.Pinch()
    .onStart(() => {
        startScale.value = width_Sqare.value;
        startScale.value = height_Sqare.value;
    })
    .onUpdate((event) => {

        width_Sqare.value = width_Sqare.value + (width_Sqare.value*(event.scale-1))*0.1
        height_Sqare.value = height_Sqare.value + (height_Sqare.value*(event.scale-1))*0.1
        console.log(event);
    })
    .runOnJS(true);

    const boxAnimatedStyles = useAnimatedStyle(() => ({
    width: width_Sqare.value*100,
    height: height_Sqare.value*100,
    top: position_y.value-height_Sqare.value*100,
    left: position_x.value-width_Sqare.value*50,
    }));

    // return (
    // <GestureHandlerRootView style={styles.containerG}>
    //     <GestureDetector gesture={panGesture}>
    //         <GestureDetector gesture={pinch}>
    //             <Animated.View style={[styles.boxG, boxAnimatedStyles]}></Animated.View>
    //         </GestureDetector>
    //     </GestureDetector>
    // </GestureHandlerRootView>
    // );

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableHighlight style={styles.button} underlayColor={appColors.buttonPressColor} onPress={() => {setModalVisible(!modalVisible);}}>
                        <Text style={styles.textStyle}>Complete</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    containerG: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height - 100,
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    boxG: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#b58df1',
        zIndex: 16,
        position: 'absolute',
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