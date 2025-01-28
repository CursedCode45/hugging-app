import ImageEditor from 'expo-image-cropper';

export function EditImageModal(props) {
    return (
        <ImageEditor imageUri={props.uri} fixedAspectRatio={16 / 16} minimumCropDimensions={{width: 50, height: 50,}}
                    onEditingCancel={() => {props.setImage(null);}}
                    onEditingComplete={(image) => {props.setImage(image); props.setIsEdited(true);}}/>
    );
}