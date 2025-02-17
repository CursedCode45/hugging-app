import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import Svg, { Image as SvgImage } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { hp } from '../constant/Helpers';


export default function MergeImages({ maxHeight, activateSaveImage, setActivateSaveImage, image1, image2, mergedImages, setMergedImages }){
    const svgRef = useRef();

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
            setActivateSaveImage(false);
            await MediaLibrary.saveToLibraryAsync(uri);
        }
        catch (error) {
            console.error('Error Merge:', error);
        }
    };

    useEffect(() => {
        if (activateSaveImage){
            saveImage();
        }
    }, [image1, image2])


    if (!activateSaveImage){
        return(<View></View>)
    }

    return (
        <View style={styles.rootContainer}>
            <View ref={svgRef} collapsable={false}>
                <Svg height={ maxHeight } width={ maxHeight*2 }>
                    <SvgImage href={{ uri: image1.uri }} x="0"                y="0"    width={ `${maxHeight}` }      height={ `${maxHeight}` }/>
                    <SvgImage href={{ uri: image2.uri }} x={ `${maxHeight}` } y="0"    width={ `${maxHeight}` }      height={ `${maxHeight}` }/>
                </Svg>
            </View>
            <Image style={{width: 200, height: 100}} source={{uri: image1.uri}}/>
        </View>
        )
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        top: hp(-10),
        position: 'absolute',
    }
})