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
        const [modalVisible, setModalVisible] = useState(true);
    
        function clamp(val, min, max) {
            return Math.min(Math.max(val, min), max);
        }
    
        const width_Sqare = useSharedValue(1);
        const height_Sqare = useSharedValue(1);
        const startScale = useSharedValue(0);
        const init_x = useSharedValue(0);
        const init_y = useSharedValue(0);
        const position_x = useSharedValue(0);
        const position_y = useSharedValue(0);
        const END_POSITION = 200;
    
        const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            position_x.value = e.translationX + init_x.value;
            position_y.value = e.translationY + init_y.value;
        })
        .onEnd((e) => {
            init_x.value = position_x.value;
            init_y.value = position_y.value;
        });
        

        const pinch = Gesture.Pinch()
        .onStart(() => {
            startScale.value = width_Sqare.value;
            startScale.value = height_Sqare.value;
        })
        .onUpdate((event) => {
    
            width_Sqare.value = startScale.value*event.scale
            height_Sqare.value = startScale.value*event.scale
        })
        .runOnJS(true);
    
        const boxAnimatedStyles = useAnimatedStyle(() => ({
            width: width_Sqare.value*100,
            height: height_Sqare.value*100,
            top: position_y.value,
            left: position_x.value,
        }));

        return(
            <GestureHandlerRootView style={styles.containerG}>
                <GestureDetector gesture={panGesture}>
                    <GestureDetector gesture={pinch}>
                        {/* <Animated.View style={[styles.boxG, boxAnimatedStyles]}></Animated.View> */}
                        <Animated.View style={[styles.imageContainer, boxAnimatedStyles]}>
                            <Image style={styles.image} source={{ uri: props.uri }}/>
                        </Animated.View>
                        
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
        alignItems: 'center',
        justifyContent: 'center',
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
    boxG: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: '#b58df1',
        zIndex: 16,
        position: 'relative',
        left: 100,
        top: 30,
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