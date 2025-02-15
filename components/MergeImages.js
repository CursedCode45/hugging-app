import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import Svg, { Image as SvgImage } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { hp } from '../constant/Helpers';
import { base64To3DArrayWithoutCanvas } from '../constant/Helpers';

export default function MergeImages({ image1, image2 }){
    const svgRef = useRef();
    const [savedImage, setSavedImage] = useState(null);
    const [maxHeight, setMaxHeight] = useState();
    
  
    // Function to capture and save the merged image
    const saveImage = async () => {
        try {
            let img1 = await ImageManipulator.manipulateAsync(image1.uri, [], {base64: true});
            let img2 = await ImageManipulator.manipulateAsync(image2.uri, [], {base64: true});
            
            const totalWidth = img1.width + img2.width;
            const maxHeight = Math.max(img1.height, img2.height);
            const array3D = await base64To3DArrayWithoutCanvas(img1.base64);
            console.log(`3D IMAGE: ${array3D}`);


            img1 = await ImageManipulator.manipulateAsync(img1.uri, [{ resize: {height: maxHeight, width: maxHeight}}])
            img2 = await ImageManipulator.manipulateAsync(img2.uri, [{ resize: {height: maxHeight, width: maxHeight}}])
            setMaxHeight(maxHeight);

            const uri = await captureRef(svgRef, {
                result: 'tmpfile',
                height: maxHeight,
                width: maxHeight*2,
                quality: 1,
                format: 'jpg',
                useRenderInContext: true,
            });
            setSavedImage(uri);

            await MediaLibrary.createAssetAsync(uri);
            alert('Image saved to gallery!');
            console.log('Saved Image URI:', uri);
        }

        catch (error) {
            console.error('Error Merge:', error);
        }
    };

    useEffect(() => {
        saveImage();
    }, [])

  
    return (
        <View style={styles.rootContainer}>
            <View ref={svgRef} collapsable={false}>
                <Svg height={ maxHeight } width={ maxHeight*2 }>
                    <SvgImage href={{ uri: image1.uri }} x="0"                y="0"    width={ `${maxHeight}` }      height={ `${maxHeight}` }/>
                    <SvgImage href={{ uri: image2.uri }} x={ `${maxHeight}` } y="0"    width={ `${maxHeight}` }      height={ `${maxHeight}` }/>
                </Svg>
            </View>
            <Button title="Save Merged Image" onPress={saveImage} />
            <Image source={{uri: savedImage}}/>
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