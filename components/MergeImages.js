import React, { useEffect, useRef, useState, useLayoutEffect, use } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import Svg, { Image as SvgImage } from 'react-native-svg';
import ViewShow, { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { hp } from '../constant/Helpers';


export default function MergeImages({ image1, image2, mergedImages, setMergedImages }){
    const svgRef = useRef();
    const maxHeight = 1080
    // const [loadCount, setLoadCount] = useState(0);
    const loadCount = useRef(0);

    async function saveImage(){
        try {
            const uri = await captureRef(svgRef, {
                result: 'tmpfile',
                height: maxHeight,
                width: maxHeight*2,
                quality: 1,
                format: 'jpg',
                useRenderInContext: true,
            });

            setMergedImages(uri);
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

                <Svg height={ maxHeight } width={ maxHeight*2 }>
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
        top: hp(200),
        position: 'absolute',
    }
})