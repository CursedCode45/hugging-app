import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import DIAMOND_SVG from '../assets/images/DiamondSvg';
import { appColors } from '../constant/AppColors';
import { restoreMissingVideos } from '../constant/Helpers';
import { useAppContext } from '../AppContext';
import { wp } from '../constant/Helpers';


const RestorePurchasesButton = () => {
    const onPressColor = appColors.weakDark;
    const [ loading, setLoading ] = React.useState(false);
    const { usesLeft, setUsesLeft, isPremium, setIsPremium } = useAppContext();

    async function onRestoreClick() {
        try{

            if (loading){
                return;
            }
            setLoading(true);
            await restoreMissingVideos(isPremium);
            setLoading(false);
        }
        catch(e){
            console.log(`Error Getting Missing Videos: ${e}`);
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
        <TouchableHighlight style={[styles.textContainer]} underlayColor={onPressColor} onPress={onRestoreClick}>
            <View style={styles.textContainer}>
                <View style={[styles.svgContainer, {backgroundColor: appColors.closeButtonColor}]}>
                    <DIAMOND_SVG/>
                </View>
                {loading? <LoadingContainer/> : <Text style={styles.text}>Restore Missing Videos</Text> }
                <View style={styles.horizontalLine}/>
            </View>
        </TouchableHighlight>
    )
}

export default RestorePurchasesButton

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
        marginLeft: 15,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    },

    text: {
        color: appColors.textColor,
        marginLeft: 15,
        fontSize: 20,
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