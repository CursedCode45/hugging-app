import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import { hp, wp } from '../constant/Helpers'

export default function BuyButtons(){
    const [select, setSelect] = React.useState(0);

    console.log(select);
    return (
    <View>
        {/* Buy Weekly Button */}
        <TouchableHighlight style={styles.weeklyButton} underlayColor={appColors.saveButtonPressedColor} onPress={()=> {setSelect(0)}}>
            <View style={styles.weeklyContainer}>
                {(select === 0)? <View style={styles.selectedWeekly}/> : null}
                <View style={styles.weeklyTextContainer}>
                    <Text style={styles.text}>Weekly Access</Text>
                    <View style={styles.weekPriceTextContainer}>
                        <Text style={styles.weekPriceText}>$5.99</Text>
                        <Text style={styles.weekDescriptionText}>per week</Text>
                    </View>
                </View>

                <View style={styles.salesTextContainer}>
                    <Text style={styles.salesText}>✅ Remove All Watermarks From Videos</Text>
                    <Text style={styles.salesText}>✅ Generate 5 Videos Everyday</Text>
                    <Text style={styles.salesText}>✅ Cancel Anytime Easily</Text>
                </View>
            </View>
        </TouchableHighlight>

        {/* Buy One Time Button */}
        <TouchableHighlight style={[styles.optionButton]} underlayColor={appColors.saveButtonPressedColor} onPress={()=> {setSelect(1)}}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Buy Video</Text>
                <Text style={styles.weekPriceText}>$3.99</Text>
            </View>
        </TouchableHighlight>

        {/* Checkout Button */}
        <TouchableHighlight style={styles.checkoutTextContainer} underlayColor={appColors.saveButtonPressedColor} onPress={()=> {}}>
            <Text style={styles.text}>Checkout</Text>
        </TouchableHighlight>
    </View>
    )
}


const styles = StyleSheet.create({
    optionButton:{
        display: 'flex',
        justifyContent: 'center',

        backgroundColor: 'white',
        marginTop: 10,

        width: wp(72),
        maxWidth: 500,
        height: 50,
    },

    weeklyButton: {
        backgroundColor: 'white',
        marginTop: 10,

        width: wp(72),
        maxWidth: 500,

        height: 150,
    },

    weeklyContainer: {
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
        height: 150 + 12,

        borderWidth: 3,
        borderColor: appColors.saveButtonTextColor,
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
    },

    weekPriceTextContainer: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
    },

    weekPriceText: {
        fontFamily: appColors.fontSemiBold,
        fontSize: 20,
    },

    weekDescriptionText: {
        fontFamily: appColors.fontThin,
    },

    salesTextContainer: {
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },

    salesText: {
        fontFamily: appColors.fontExtraLight,
    },

    checkoutTextContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

        marginTop: 10,

        width: wp(72),
        maxWidth: 500,
        height: 50,
    }

})