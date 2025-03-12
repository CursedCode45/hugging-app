import { StyleSheet, Text, View, TouchableHighlight, Linking, ActivityIndicator } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import EMAIL_SVG from '../assets/images/EmailSvg'
import { wp } from '../constant/Helpers'
import { getUniqueId } from '../constant/Helpers'


const ContactUsButton = () => {
    const [loading, setLoading] = React.useState(false);


    async function onContactUsPress(){
        try{
            setLoading(true);
            const userId = await getUniqueId();
            await Linking.openURL(`mailto:blend@pixelreach.io?subject=About Huggify&body=User ID: ${userId}`)
            setTimeout(() => {setLoading(false)}, 1000)
        }
        catch(e){
            console.warn(`Error writing email: ${e}`);
            setLoading(false);
        }
    }

    const LoadingContainer = () =>{
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'small'} color={appColors.textColor} />
            </View>
        )
    }

    return (
    <TouchableHighlight style={styles.textContainer} underlayColor={appColors.weakDark} onPress={onContactUsPress}>
        <View style={styles.textContainer}>
            <View style={[styles.svgContainer, {backgroundColor: appColors.deleteButtonColor}]}>
            <EMAIL_SVG color={appColors.deleteButtonTextColor}/>
            </View>
            {loading? <LoadingContainer/> : <Text style={styles.text}>Contact Us</Text> }
            <View style={styles.horizontalLine}/>
        </View>
    </TouchableHighlight>
    )
}

export default ContactUsButton

const styles = StyleSheet.create({
    textContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      width: '100%',
      paddingLeft: 10,
      height: 45,
    },

    svgContainer: {
      height: 30,
      width: 30,
      padding: 5,
      borderRadius: 4,
      marginLeft: 0,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center'
    },

    text: {
      color: appColors.textColor,
      marginLeft: 15,
      fontSize: 17,
    },

    horizontalLine: {
        position: 'absolute',
        width: wp(71),
        right: 0,
        bottom: 0,
        maxWidth: 420,
        height: 0.8,
        backgroundColor: appColors.horizontalLine,
    },

    loadingContainer: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
    },
});