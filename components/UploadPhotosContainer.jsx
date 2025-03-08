import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import GenerateButton from './GenerateButton.jsx';
import PhotoUpload from './PhotoUpload.jsx';


export function UploadPhotosContainer(){
    const [image1, setImage1] = React.useState(null);
    const [image2, setImage2] = React.useState(null);
    

    return(
        <View style={styles.rootContainer}>
            <View style={styles.photosContainer}>
                <PhotoUpload image={image1} setImage={setImage1} filename={'1.jpg'}/>
                <PhotoUpload image={image2} setImage={setImage2} filename={'2.jpg'}/>
            </View>
            <GenerateButton image1={image1} setImage1={setImage1} image2={image2} setImage2={setImage2}/>
        </View>
    )
}
  
const styles = StyleSheet.create({
    rootContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    photosContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
