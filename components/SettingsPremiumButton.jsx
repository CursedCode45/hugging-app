import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native'
import React from 'react'
import { useAppContext } from '../AppContext';
import { cancelPremium } from '../constant/Helpers';
import DIAMOND_SVG from '../assets/images/DiamondSvg';
import { appColors } from '../constant/AppColors';
import GetProWeeklyOnly from './GetProWeeklyOnly';
import { Alert } from 'react-native';
import { USES_COUNT_ON_PREMIUM } from '../constant/Settings';



const SettingsPremiumButton = () => {
    const onPressColor = appColors.weakDark;
    const [ loading, setLoading ] = React.useState(false);
    const { usesLeft, setUsesLeft, isPremium, setIsPremium } = useAppContext();
    const [showGetProModal, setShowGetProModal] = React.useState(false);

    async function onCheckoutPress(){
        if(loading){
            return;
        }
        setShowGetProModal(false);
        setIsPremium(true);
        setUsesLeft(USES_COUNT_ON_PREMIUM);
    }

    async function onGetPremiumPress() {
        if(loading){
            return;
        }

        setLoading(true);
        setShowGetProModal(true);
        setLoading(false);
    }

    async function onCancelPremiumPress(){
        if(loading){
            return;
        }

        setLoading(true);
        if (isPremium){
            const isCanceled = await cancelPremium();
            if (isCanceled){
                setIsPremium(false);
            }
        }
        else{
            Alert.alert(`You don't have a premium plan`)
        }
        setLoading(false);
    }

    const LoadingContainer = () =>{
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'small'} color={appColors.textColor} />
            </View>
        )
    }

    const CancelPremium = () => {
        return(
            <TouchableHighlight style={[styles.textContainer, {borderBottomLeftRadius: 15, borderBottomRightRadius: 15}]} underlayColor={onPressColor} onPress={onCancelPremiumPress}>
                <View style={styles.textContainer}>
                    <View style={[styles.svgContainer, {backgroundColor: appColors.closeButtonColor}]}>
                        <DIAMOND_SVG/>
                    </View>
                    
                    {loading? <LoadingContainer/> : <Text style={styles.text}>Cancel Premium</Text> }
                </View>
            </TouchableHighlight>
        )
    }

    const GetPremium = () => {
        return(
            <TouchableHighlight style={[styles.textContainer, {borderBottomLeftRadius: 15, borderBottomRightRadius: 15}]} underlayColor={onPressColor} onPress={onGetPremiumPress}>
                <View style={styles.textContainer}>
                    <View style={[styles.svgContainer, {backgroundColor: appColors.closeButtonColor}]}>
                        <DIAMOND_SVG/>
                    </View>
                    {loading? <LoadingContainer/> : <Text style={styles.text}>Get Premium</Text>}
                    { showGetProModal && <GetProWeeklyOnly onGetProModalClose={()=>{setShowGetProModal(false)}} onCheckoutPress={onCheckoutPress} isVisible={showGetProModal}/>}
                </View>
            </TouchableHighlight>
        )
    }

    if (isPremium){
        return <CancelPremium/>
    }
    return <GetPremium/>
}

export default SettingsPremiumButton

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

    loadingContainer: {
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
    }

  });