import { useEffect, useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


export function PhotoUpload(){
    const [image, setImage] = useState(null);

    async function selectImage(){
        // Ask for permissions to access the media library
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]); // Store selected image data
            console.log('image selected');
        }
    }

    async function uploadImage() {
        if (!image) {
            Alert.alert('No image selected');
            return;
        }
        

        const formData = new FormData();
        formData.append('image', {
            uri: image.uri, // File URI
            type: 'image/jpeg', // MIME type
            name: 'upload.jpg', // File name
        });

        try {
            const response = await axios.post('http://192.168.100.154:8083/upload', formData);
        }
        catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Upload Failed', 'Something went wrong while uploading the image.');
        }
    }


    useEffect(() =>{
        if (image){
        uploadImage();
        }
    }, [image])


    return (
        <View style={styles.container}>
            {image && (
                <Image source={{ uri: image.uri }} style={styles.previewImage} />
            )}
            <Button title="Select Image" onPress={selectImage} />
            <Button title="Upload Image" onPress={uploadImage} />
        </View>
    );
}
  
const styles = StyleSheet.create({
container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
},
video: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
},

previewImage: {
    display: 'flex',
    width: 100,
    height: 100,
},
});
