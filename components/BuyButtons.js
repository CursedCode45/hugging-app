import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import { hp, wp } from '../constant/Helpers'
import CHECKMARK_SVG from '../assets/images/CheckmarkSvg';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function BuyButtons(){
    const [select, setSelect] = React.useState(0);
    const route = useRoute();
    const navigation = useNavigation();

    console.log(select);
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
        <TouchableHighlight style={styles.checkoutTextContainer} underlayColor={appColors.closeButtonPressedColor} onPress={()=> {navigation.popTo('UserVideos');}}>
            <Text style={styles.checkoutText}>Checkout</Text>
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

        width: wp(72),
        maxWidth: 500,
        height: 110,

        borderRadius: 5,

        borderWidth: 0.2,
        borderColor: appColors.lightColor,
    },

    weeklyButton: {
        backgroundColor: appColors.lighterDark,
        marginTop: 15,

        width: wp(72),
        maxWidth: 500,

        height: 175,

        borderRadius: 5,

        borderWidth: 0.2,
        borderColor: appColors.lightColor,
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

        left: - 12/2,
        top: - 12/2,

        width: wp(72) + 12,
        maxWidth: 500 + 12,
        height: 175 + 12,

        borderWidth: 2,
        borderColor: appColors.saveButtonTextColor,

        borderRadius: 9,
    },

    selectedOneTime: {
        position: 'absolute',

        left: -7,
        top: -8,

        width: wp(72) + 12,
        maxWidth: 500 + 12,
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
        backgroundColor: appColors.lightColor,
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

        width: wp(72),
        maxWidth: 500,
        height: 50,

        borderWidth: 0.2,
        borderColor: appColors.closeButtonTextColor,
    },

    checkoutText: {
        fontSize: 23,
        color: appColors.closeButtonTextColor,
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