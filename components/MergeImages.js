import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import Svg, { Image as SvgImage } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { hp } from '../constant/Helpers';


export default function MergeImages({ image1, image2, mergedImages, setMergedImages }){
    const svgRef = useRef();
    const [maxHeight, setMaxHeight] = useState();
    const [activateSaveImage, setActivateSaveImage] = useState(false);


    async function resizeImages(){
        try{

            let img1 = await ImageManipulator.manipulateAsync(image1.uri, [], {base64: true});
            let img2 = await ImageManipulator.manipulateAsync(image2.uri, [], {base64: true});
            
            let maxHeight = Math.max(img1.height, img2.height);
            maxHeight = Math.min(1080, maxHeight)
            
            img1 = await ImageManipulator.manipulateAsync(img1.uri, [{ resize: {height: maxHeight, width: maxHeight}}])
            img2 = await ImageManipulator.manipulateAsync(img2.uri, [{ resize: {height: maxHeight, width: maxHeight}}])
            setMaxHeight(maxHeight);
            setActivateSaveImage(true);
        }
        catch(e){
            console.error('Resize Error:', error);
        }
    }
    
    
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

    useEffect(() => {
        resizeImages();
    }, [image1, image2])

    useEffect(() => {
        if (activateSaveImage){
            saveImage();
            setActivateSaveImage(false);
        }
    }, [activateSaveImage])

  
    return (
        <View style={styles.rootContainer}>
            <View ref={svgRef} collapsable={false}>
                <Svg height={ maxHeight } width={ maxHeight*2 }>
                    <SvgImage href={{ uri: image1.uri }} x="0"                y="0"    width={ `${maxHeight}` }      height={ `${maxHeight}` }/>
                    <SvgImage href={{ uri: image2.uri }} x={ `${maxHeight}` } y="0"    width={ `${maxHeight}` }      height={ `${maxHeight}` }/>
                </Svg>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        top: hp(99),
        position: 'absolute',
    }
})