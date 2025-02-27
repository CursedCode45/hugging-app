import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import { hp, wp } from '../constant/Helpers'
import CHECKMARK_SVG from '../assets/images/CheckmarkSvg';
import * as SecureStore from 'expo-secure-store';
import { getPremium } from '../constant/Helpers';


export default function BuyButtons({onCancelPress, onCheckoutPress, filename={filename}}){
    const [select, setSelect] = React.useState(0);

    async function localONcheckoutPress(){
        if (select === 1){
            await SecureStore.setItemAsync(`show_watermark_${filename}`, 'false');
            onCheckoutPress();
        }
        if (select === 0){
            getPremium();
            onCheckoutPress();
        }
    }

    return (
    <View>
        {/* Buy Weekly Button */}
        <TouchableHighlight style={styles.weeklyButton} underlayColor={appColors.weakDark} onPressIn={()=> {setSelect(0)}}>
            <View style={styles.weeklyContainer}>
                {(select === 0)? <View style={styles.selectedWeekly}/> : null}
                <View style={styles.weeklyTextContainer}>
                    <Text style={styles.text}>Weekly Access</Text>
                    <View style={styles.weekPriceTextContainer}>
                        <Text style={styles.weekPriceText}>$5.99</Text>
                        <Text style={styles.weekDescriptionText}>per week</Text>
                    </View>
                </View>

                <View style={styles.lineContainer}><View style={styles.horizontalLine}/></View>
                    

                <View style={styles.salesTextContainer}>
                    <View style={styles.iconWithTextContainer}>
                        <View style={styles.svgContainer}><CHECKMARK_SVG/></View>
                        <Text style={styles.salesText}>Remove All Watermarks From Videos</Text>
                    </View>

                    <View style={styles.iconWithTextContainer}>
                        <View style={styles.svgContainer}><CHECKMARK_SVG/></View>
                        <Text style={styles.salesText}>Generate 5 Videos Everyday</Text>
                    </View>

                    <View style={styles.iconWithTextContainer}>
                        <View style={styles.svgContainer}><CHECKMARK_SVG/></View>
                        <Text style={styles.salesText}>Cancel Anytime Easily</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>

        {/* Buy One Time Button */}
        <TouchableHighlight style={[styles.optionButton]} underlayColor={appColors.weakDark} onPressIn={()=> {setSelect(1)}}>
            <View style={styles.oneTimeContainer}>
                {(select === 1)? <View style={styles.selectedOneTime}/> : null}
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Buy Video</Text>
                    <Text style={styles.weekPriceText}>$3.99</Text>
                </View>

                <View style={styles.lineContainer}><View style={styles.horizontalLine}/></View>
                    
                <View style={styles.salesTextContainer}>
                    <View style={styles.iconWithTextContainer}>
                        <View style={styles.svgContainer}><CHECKMARK_SVG/></View>
                        <Text style={styles.salesText}>Download This Video Without Watermark</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>

        {/* Checkout Button */}
        <TouchableHighlight style={styles.checkoutTextContainer} underlayColor={appColors.closeButtonPressedColor} onPress={localONcheckoutPress}>
            <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableHighlight>

        {/* Cancel Button */}
        <TouchableHighlight style={styles.cancelTextContainer} underlayColor={appColors.deleteButtonPressedColor} onPress={onCancelPress}>
            <Text style={styles.cancelText}>Cancel</Text>
        </TouchableHighlight>
    </View>
    )
}


const styles = StyleSheet.create({
    optionButton:{
        display: 'flex',
        justifyContent: 'center',

        backgroundColor: appColors.lighterDark,
        marginTop: 15,

        width: wp(85),
        maxWidth: 500,
        height: 110,

        borderRadius: 5,
    },

    weeklyButton: {
        backgroundColor: appColors.lighterDark,
        marginTop: 15,

        width: wp(85),
        maxWidth: 500,

        height: 175,

        borderRadius: 5,
    },

    weeklyContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },

    oneTimeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },

    selectedWeekly: {
        position: 'absolute',

        left: - 14/2,
        top: - 14/2,

        width: wp(85) + 14,
        maxWidth: 500 + 14,
        height: 175 + 14,

        borderWidth: 2,
        borderColor: appColors.saveButtonTextColor,

        borderRadius: 9,
    },

    selectedOneTime: {
        position: 'absolute',

        left: -7,
        top: -8,

        width: wp(85) + 14,
        maxWidth: 500 + 14,
        height: 110 + 14,

        borderWidth: 2,
        borderColor: appColors.saveButtonTextColor,

        borderRadius: 9,
        
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

    lineContainer: {
        display: 'flex',
        alignItems: 'center',

        width: '100%',
        height: 0.4,
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
        backgroundColor: appColors.closeButtonColor,
        borderRadius: 5,

        marginTop: 15,

        width: wp(85),
        maxWidth: 500,
        height: 50,
    },

    checkoutText: {
        fontSize: 23,
        color: appColors.closeButtonTextColor,
    },

    cancelTextContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appColors.deleteButtonColor,
        borderRadius: 5,

        marginTop: 10,

        width: wp(85),
        maxWidth: 500,
        height: 50,
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

    svgContainer: {
        width: 20,
        height: 20,
        marginRight: 5,
    },

})