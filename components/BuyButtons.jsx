import { StyleSheet, Text, View, TouchableHighlight, ActivityIndicator } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import { hp, wp } from '../constant/Helpers'
import CHECKMARK_SVG from '../assets/images/CheckmarkSvg';
import * as SecureStore from 'expo-secure-store';
import { getPremium } from '../constant/Helpers';
import { USES_COUNT_ON_PREMIUM } from '../constant/Settings';
import { useAppContext } from '../AppContext';
import { buyOneVideo } from '../constant/Helpers';
import X_SVG from '../assets/images/XSVG';


export default function BuyButtons({ setShowGetProScreen, setShowWatermark, filename={filename}}){
    const [select, setSelect] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const { usesLeft, setUsesLeft, isPremium, setIsPremium } = useAppContext();

    function onCancelPress(){
        setShowGetProScreen(false);
    }

    async function localONcheckoutPress(){
        setLoading(true);

        if (select === 1){
            const isSuccessful = await buyOneVideo(filename);
            if (isSuccessful){
                setShowWatermark('false');
            }
            setShowGetProScreen(false);
        }

        if (select === 0){
            const isSuccessful = await getPremium();
            if (isSuccessful){
                setIsPremium(true);
                setUsesLeft(USES_COUNT_ON_PREMIUM);
                setShowWatermark('false');
            }
            setShowGetProScreen(false);
        }

        setLoading(false);
    }

    return (
    <View style={styles.rootContainer}>

        {/* Selling Points Container */}
        <View style={styles.salesPointContainer}>
            <Text style={styles.sellingPointTitle}>Get Pro Access</Text>
            <View style={styles.saleTextAndIcon}>
                <View style={styles.svgContainer}><CHECKMARK_SVG/></View>
                <Text style={styles.sellingPointText}>Save videos without watermarks</Text>
            </View>
            <View style={styles.saleTextAndIcon}>
                <View style={styles.svgContainer}><CHECKMARK_SVG/></View>
                <Text style={styles.sellingPointText}>Downlaod HD videos</Text>
            </View>
            <View style={styles.saleTextAndIcon}>
                <View style={styles.svgContainer}><CHECKMARK_SVG/></View>
                <Text style={styles.sellingPointText}>Generate up to 5 videos daily</Text>
            </View>
            <View style={styles.saleTextAndIcon}>
                <View style={styles.svgContainer}><CHECKMARK_SVG/></View>
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

            <View style={styles.smallTextContainer}>
                <Text style={styles.smallText}>Terms of Use • Privacy Policy • Restore</Text>
            </View>
        </View>
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

    oneTimeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    selectedWeekly: {
        position: 'absolute',

        left: - 10/2,
        top: - 10/2,

        width: wp(85) + 10,
        maxWidth: 500 + 10,
        height: 65 + 10,

        borderWidth: 1,
        borderColor: appColors.saveButtonTextColor,

        borderRadius: 13,
    },

    selectedOneTime: {
        position: 'absolute',

        left: -10/2,
        top: -10/2 - 3,

        width: wp(85) + 10,
        maxWidth: 500 + 10,
        height: 65 + 10,

        borderWidth: 1,
        borderColor: appColors.saveButtonTextColor,

        borderRadius: 13,
        
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
        color: appColors.veryLightColor,
        fontSize: 17,
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
        width: 25,
        height: 25,
        marginRight: 5,
    },


    saleTextAndIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 3,
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
        marginTop: 10,
    },

    smallText: {
        fontSize: 13,
        color: appColors.veryLightColor,
    },
})