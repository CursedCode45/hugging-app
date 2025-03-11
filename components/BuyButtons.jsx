import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator, Button, Pressable } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import { hp, wp } from '../constant/Helpers'
import CHECKMARK_SVG from '../assets/images/CheckmarkSvg';
import { getPremium } from '../constant/Helpers';
import { useAppContext } from '../AppContext';
import { buyOneVideo } from '../constant/Helpers';
import TermsOfServicesModal from './TermsOfServicesModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import CHECKMARK_CIRCLE_SVG from '../assets/images/CheckmarkCircleSvg';
import { USES_COUNT_ON_PREMIUM, USES_COUNT_ON_YEARLY_PREMIUM } from '../constant/Settings';

export default function BuyButtons({ setShowGetProScreen, setShowWatermark, filename={filename}}){
    const [select, setSelect] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [showTos, setShowTos] = React.useState(false);
    const [showPp, setShowPp] = React.useState(false);
    const [restorePurchases, setRestorePurchases] = React.useState(false);

    const { usesLeft, setUsesLeft, isPremium, setIsPremium } = useAppContext();

    function onCancelPress(){
        setShowGetProScreen(false);
    }

    async function localONcheckoutPress(){
        try{

            setLoading(true);
            let isYearlyBought = (select===0)? true : false
            let usesBought = isYearlyBought? USES_COUNT_ON_YEARLY_PREMIUM : USES_COUNT_ON_PREMIUM
            const isSuccessful = await getPremium(isYearlyBought);
            if (isSuccessful){
                setShowWatermark('false');
                setIsPremium(true);
                setUsesLeft(usesBought);
            }
            setShowGetProScreen(false);
            setLoading(false);
        }
        catch(e){
            console.warn(`Error on checkout: ${e}`)
        }
    }

    return (
    <View style={styles.rootContainer}>

        {/* Selling Points Container */}
        <View style={styles.salesPointContainer}>
            <Text style={styles.sellingPointTitle}>Get Pro Access</Text>
            <View style={styles.saleTextAndIcon}>
                <View style={styles.svgContainer}><CHECKMARK_CIRCLE_SVG color={appColors.generateButtonColor}/></View>
                <Text style={styles.sellingPointText}>Save videos without watermarks</Text>
            </View>
            <View style={styles.saleTextAndIcon}>
                <View style={styles.svgContainer}><CHECKMARK_CIRCLE_SVG color={appColors.generateButtonColor}/></View>
                <Text style={styles.sellingPointText}>Downlaod HD videos</Text>
            </View>
            <View style={styles.saleTextAndIcon}>
                <View style={styles.svgContainer}><CHECKMARK_CIRCLE_SVG color={appColors.generateButtonColor}/></View>
                <Text style={styles.sellingPointText}>Generate up to 5 videos daily</Text>
            </View>
            <View style={styles.saleTextAndIcon}>
                <View style={styles.svgContainer}><CHECKMARK_CIRCLE_SVG color={appColors.generateButtonColor}/></View>
                <Text style={styles.sellingPointText}>Fast video processing</Text>
            </View>
        </View>

        <View style={styles.allButtonsContainer}>
            {/* Buy Weekly Button */}
            <TouchableHighlight style={styles.weeklyButton} underlayColor={appColors.weakDark} onPressIn={()=> {setSelect(0)}}>
                <View style={styles.weeklyContainer}>
                    {(select === 0)? <View style={styles.selectedWeekly}/> : null}
                    <View style={styles.weeklyTextContainer}>
                        <View style={styles.leftTextContainer}>
                            <Text style={styles.text}>Yearly Access</Text>
                            <Text style={styles.salesText}>Just $49.99 per year</Text>
                        </View>

                        <View style={styles.percentageContainer}><Text style={styles.percentageText}>84% OFF</Text></View>

                        <View style={styles.weekPriceTextContainer}>
                            <Text style={styles.weekPriceText}>$0.96</Text>
                            <Text style={styles.weekDescriptionText}>per week</Text>
                        </View>
                    </View>

                </View>
            </TouchableHighlight>


            {/* Buy Weekly Button */}
            <TouchableHighlight style={styles.weeklyButton} underlayColor={appColors.weakDark} onPressIn={()=> {setSelect(1)}}>
                <View style={styles.weeklyContainer}>
                    {(select === 1)? <View style={styles.selectedWeekly}/> : null}
                    <View style={styles.weeklyTextContainer}>
                        <View style={styles.leftTextContainer}>
                        <Text style={styles.text}>Weekly Access</Text>
                        <Text style={styles.salesText}>Cancel anytime</Text>
                        </View>
                        <View style={styles.weekPriceTextContainer}>
                            <Text style={styles.weekPriceText}>$5.99</Text>
                            <Text style={styles.weekDescriptionText}>per week</Text>
                        </View>
                    </View>

                </View>
            </TouchableHighlight>

            <View style={styles.smallTextContainer}>
                <Text style={styles.smallText}>No commitment - cancel anytime</Text>
            </View>

            {/* Checkout Button */}
            <TouchableHighlight style={styles.checkoutTextContainer} underlayColor={appColors.generateButtonPressedColor} onPress={localONcheckoutPress}>
                {loading
                ? <ActivityIndicator size={'small'} color={appColors.closeButtonTextColor}/>
                : <Text style={styles.checkoutText}>Try it now</Text>}
            </TouchableHighlight>

            <View style={[styles.legalTextContainer]}>
                <Pressable onPress={() => {setShowTos(true)}}><Text style={styles.bottomText}>Terms of Use </Text></Pressable >
                <Text style={{color: appColors.mediumDark, fontSize: 25}}>•</Text>
                <Pressable onPress={() => {setShowPp(true)}}><Text style={styles.bottomText}> Privacy Policy </Text></Pressable >
                <Text style={{color: appColors.mediumDark, fontSize: 25}}>•</Text>
                <Pressable onPress={() => {}}><Text style={styles.bottomText}> Restore </Text></Pressable >
            </View>
        </View>
        <TermsOfServicesModal showModal={showTos} onModalClose={() => {setShowTos(false)}}/>
        <PrivacyPolicyModal showModal={showPp} onModalClose={() => {setShowPp(false)}}/>
    </View>
    )
}


const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 60,
    },


    optionButton:{
        display: 'flex',
        justifyContent: 'center',

        backgroundColor: appColors.lighterDark,
        marginTop: 15,

        width: wp(85),
        maxWidth: 500,
        height: 65,

        borderRadius: 10,
    },

    weeklyButton: {
        backgroundColor: appColors.lighterDark,
        marginTop: 15,

        width: wp(85),
        maxWidth: 500,

        height: 65,

        borderRadius: 10,
    },

    weeklyContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },

    leftTextContainer: {
        display: 'flex',
        flexDirection: 'column',
    },

    selectedWeekly: {
        position: 'absolute',

        left: - 6/2,
        top: - 6/2,

        width: wp(85) + 6,
        maxWidth: 500 + 6,
        height: 65 + 6,

        borderWidth: 3,
        borderColor: appColors.generateButtonColor,

        borderRadius: 14,
    },


    weeklyTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        marginLeft: 10,
        marginRight: 10,
    },

    text: {
        fontSize: 23,
        color: appColors.textColor,
    },

    weekPriceTextContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
    },

    weekPriceText: {
        fontFamily: appColors.fontSemiBold,
        fontSize: 20,
        color: appColors.textColor,
    },

    weekDescriptionText: {
        fontFamily: appColors.fontThin,
        color: appColors.textColor,
    },

    horizontalLine: {
        width: '90%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: appColors.horizontalLine,
    },

    salesTextContainer: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },

    salesText: {
        fontFamily: appColors.fontExtraLight,
        color: appColors.textColor,
    },

    checkoutTextContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColors.generateButtonColor,
        borderRadius: 10,

        marginTop: 15,

        width: wp(85),
        maxWidth: 500,
        height: 60,
    },

    checkoutText: {
        color: appColors.background,
        fontFamily: appColors.fontSemiBold,
        fontSize: 20,
        textAlign: 'center'
    },

    cancelTextContainer:{
        backgroundColor: 'none',
        borderRadius: 1000,
        position: 'absolute',
        top: 10,
        left: 10,

        marginTop: 10,

        width: 30,
        height: 30,
    },

    cancelText: {
        fontSize: 23,
        color: appColors.deleteButtonTextColor,
    },

    percentageContainer:{
        backgroundColor: appColors.generateButtonColor,
        padding: 7,
        borderRadius: 1000
    },

    percentageText: {
        fontSize: 14,
        fontFamily: appColors.fontSemiBold,
        color: appColors.veryLightColor,
    },

    iconWithTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2.2,
        marginBottom: 2.2,
    },


    salesPointContainer: {
        display: 'flex',
        position: 'absolute',
        top: -215,
        left: 120,
    },

    svgContainer: {
        width: 23,
        height: 23,
        marginRight: 5,
    },


    saleTextAndIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
    },

    sellingPointText: {
        fontSize: 17,
        color: appColors.veryLightColor,
    },

    sellingPointTitle:{
        fontSize: 37,
        fontFamily: appColors.fontSemiBold,
        color: appColors.veryLightColor,
        marginBottom: 20,
    },

    smallTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    legalTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 7,
    },

    smallText: {
        fontSize: 13,
        color: appColors.veryLightColor,
    },

    bottomText: {
        fontSize: 14,
        color: appColors.mediumDark
    }
})