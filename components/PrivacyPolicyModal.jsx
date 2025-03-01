import { StyleSheet, Text, View, Modal, ScrollView } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import CloseVideoButton from './CloseVideoButton'
import { hp } from '../constant/Helpers'


const PrivacyPolicyModal = ({showModal, onModalClose}) => {
    return (
    <Modal animated='slide' visible={showModal} onRequestClose={onModalClose}>
        <View styles={styles.rootView}>

        <ScrollView style={styles.scrollView}>


        <View style={styles.rootContainer}>
            <View style={styles.segment}>
                <Text style={styles.boldText}>Huggify Privacy Policy</Text>
                <Text style={styles.normalText}>Effective Date: 02.27.2025</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>1. Introduction</Text>
                <Text style={styles.normalText}>This Privacy Policy describes how Pixel Reach LLC (“we,” “us,” or “our”) collects, uses, and protects your personal information when you use Huggify (the “Service”). By using the Service, you consent to the practices outlined in this policy.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>2. Information We Collect</Text>
                <Text style={styles.normalText}>• Personal Information: When you register for an account, we may collect your name, email address, and payment information.{'\n'}
                                                • Usage Data: We also collect usage data, including device information, log data, and any other information necessary to provide and improve our Service.{'\n'}
                                                • Additional Information: We may collect other information that is necessary to enhance your experience or to comply with legal obligations.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>3. How We Use Your Information</Text>
                <Text style={styles.normalText}>Your information is used for the following purposes:{'\n'}
                                                • Account Creation & Management: To facilitate the creation, maintenance, and management of your account.{'\n'}
                                                • Service Improvement: To analyze usage patterns and improve the functionality and user experience of the Service.{'\n'}
                                                • Payment Processing: To process in-app purchases and subscription payments through Apple and Google’s secure payment systems.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>4. Cookies and Tracking Technologies</Text>
                <Text style={styles.normalText}>• Cookies: We use cookies and similar tracking technologies to personalize your experience and to analyze usage of the Service.{'\n'}
                                                • Advertising: We utilize tracking solutions provided by Meta Ads and Google Ads to measure the effectiveness of our advertising campaigns.</Text>
            </View>


            <View style={styles.segment}>
                <Text style={styles.boldText}>5. Third-Party Data Processing</Text>
                <Text style={styles.normalText}>• Payment Providers: Transactions made through the Service are processed by Apple and Google. While we do not share your data with third parties for marketing purposes, certain transaction details are processed by these providers in accordance with their privacy policies.{'\n'}
                                                • Service Providers: We may engage third-party vendors to assist in the operation of our Service; however, such vendors are only given access to personal information as necessary to perform their functions and are prohibited from using it for any other purpose.</Text>
            </View>


            <View style={styles.segment}>
                <Text style={styles.boldText}>6. Data Retention and Deletion</Text>
                <Text style={styles.normalText}>• Retention: We will retain your personal information for as long as your account is active or as needed to provide our services.{'\n'}
                                                • Deletion Requests: If you request data deletion, we will remove your personal data within one business day, subject to any legal obligations requiring further retention.</Text>
            </View>


            <View style={styles.segment}>
                <Text style={styles.boldText}>7. Your Rights</Text>
                <Text style={styles.normalText}>We welcome your feedback and suggestions regarding Huggify. By providing feedback, you agree that we may use such feedback without any obligation to compensate or credit you.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>8. Data Security</Text>
                <Text style={styles.normalText}>We implement reasonable security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is entirely secure, and we cannot guarantee absolute security.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>9. Regulatory Compliance</Text>
                <Text style={styles.normalText}>At present, we do not specifically tailor our practices for regulations such as GDPR or CCPA. However, we remain committed to maintaining the confidentiality and security of your information and will adjust our practices as necessary to comply with applicable laws.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>10. Changes to This Privacy Policy</Text>
                <Text style={styles.normalText}>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our Service. Your continued use of Huggify after any such changes constitutes your acceptance of the revised policy.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>11. Contact Information</Text>
                <Text style={styles.normalText}>If you have any questions about this Privacy Policy or our data practices, please contact us at: blend@pixelreach.io</Text>
            </View>
        </View>



        </ScrollView>
        <View style={styles.closeButtonContainer}>
            <CloseVideoButton onPress={onModalClose}/>
        </View>

        </View>
    </Modal>
    )
}

export default PrivacyPolicyModal

const styles = StyleSheet.create({
    modal: {
        backgroundColor: appColors.background,
    },
    rootView: {
        backgroundColor: appColors.background,
    },
    
    scrollView: {
        backgroundColor: appColors.background,
    },

    rootContainer:{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: appColors.background,
        marginTop: 120,
        marginBottom: 120,
    },

    boldText: {
        fontSize: 14,
        fontWeight: 999,
        fontFamily: appColors.fontExtraBold,
        color: appColors.veryLightColor
    },

    normalText: {
        fontsize: 11,
        fontFamily: appColors.fontRegular,
        color: appColors.veryLightColor
    },

    segment: {
        width: '80%',
        marginBottom: 30,
    },
    closeButtonContainer:{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyConter: 'center',
        bottom: hp(12),
        ...appColors.addShadowLarge
    }
})