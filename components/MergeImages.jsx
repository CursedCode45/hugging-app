import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Image as SvgImage } from 'react-native-svg';
import ViewShow, { captureRef } from 'react-native-view-shot';
import * as ImageManipulator from 'expo-image-manipulator';
import { hp } from '../constant/Helpers';


export default function MergeImages({ image1, image2, mergedImages, setMergedImages }){
    const svgRef = useRef();
    const maxHeight = 768
    const loadCount = useRef(0);

    async function saveImage(){
        try {
            let uri = await captureRef(svgRef, {
                result: 'tmpfile',
                height: maxHeight,
                width: maxHeight*2,
                quality: 1,
                format: 'jpg',
                useRenderInContext: true,
            });
            let img = await ImageManipulator.manipulateAsync(uri, [{ resize: {height: 768, width: 768*2}} ]);
            setMergedImages(img.uri);
        }
        catch (error) {
            console.error('Error Merge:', error);
        }
    };

    function mergeImagesOnLoad(){
        loadCount.current = loadCount.current + 1;
        if (loadCount.current === 2){
            saveImage();
        }
    }

    return (
        <View style={styles.rootContainer}>
            <View
                style={styles.rootContainer}
                ref={svgRef}
                collapsable={false}
            >

                <Svg height={maxHeight} width={maxHeight*2}>
                    <SvgImage onLoad={mergeImagesOnLoad} href={{ uri: image1.uri }}    x="0"                    y="0"    width={ `${maxHeight}` }      height={ `${maxHeight}` }/>
                    <SvgImage onLoad={mergeImagesOnLoad} href={{ uri: image2.uri }}    x={ `${maxHeight}` }     y="0"    width={ `${maxHeight}` }      height={ `${maxHeight}` }/>
                </Svg>
            </View>
        </View>
        )
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        top: hp(-200),
        position: 'absolute',
    }
})