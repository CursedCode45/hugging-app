import { StyleSheet, Text, View, Modal, ScrollView } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'
import CloseVideoButton from './CloseVideoButton'
import { hp, wp } from '../constant/Helpers'



const TermsOfServicesModal = ({showModal, onModalClose}) => {
    return (
    <Modal animated='slide' visible={showModal} onRequestClose={onModalClose}>
        <View styles={styles.rootView}>

        <ScrollView style={styles.scrollView}>


        <View style={styles.rootContainer}>
            <View style={styles.segment}>
                <Text style={styles.boldText}>Huggify Terms of Service</Text>
                <Text style={styles.normalText}>Effective Date: 02.27.2025</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>1. Introduction & Acceptance</Text>
                <Text style={styles.normalText}>Welcome to Huggify (the “Service”), operated by Pixel Reach LLC (“we,” “us,” or “our”). These Terms of Service (“Terms”) constitute a legally binding agreement between you (“User,” “you,” or “your”) and Pixel Reach LLC governing your access to and use of Huggify. By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, please refrain from using the Service.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>2. Definitions</Text>
                <Text style={styles.normalText}>• Service: The Huggify application, including all related services provided by Pixel Reach LLC.{'\n'}
                                                • User Content: Any text, images, or other materials uploaded or created by you within the Service.{'\n'}
                                                • Account: Your personal account created on Huggify to access features of the Service.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>3. Eligibility & Account Registration</Text>
                <Text style={styles.normalText}>• Age Requirement: You must be at least 13 years old to create an account or use the Service.{'\n'}
                                                • Account Responsibility: When you register an account, you agree to provide accurate information and to maintain the confidentiality of your login credentials. You are fully responsible for all activities that occur under your account.</Text>
            </View>


            <View style={styles.segment}>
                <Text style={styles.boldText}>4. User-Generated Content</Text>
                <Text style={styles.normalText}>• Content Guidelines: You may create and upload content, including text and images, subject to the following restrictions:{'\n'}
                                                • Prohibited Content: You agree not to post any content that is illegal, explicit, or otherwise objectionable (“bad stuff”). We reserve the right to remove any content that we determine, in our sole discretion, violates these guidelines or any applicable law.{'\n'}
                                                • License Grant: By submitting content, you grant Pixel Reach LLC a non-exclusive, irrevocable, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display such content solely as part of the Service.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>5. In-App Purchases, Subscription Plans, and Free Trials</Text>
                <Text style={styles.normalText}>• Purchases and Subscriptions: Huggify offers in-app purchases and subscription plans, including free trial periods.{'\n'}
                                                • Payment Processing: All transactions are processed by Apple and Google through their in-app purchase systems.{'\n'}
                                                • Refund Policy: All purchases, including subscription fees, are final and non-refundable.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>6. Intellectual Property</Text>
                <Text style={styles.normalText}>• Our Property: All content provided by Pixel Reach LLC on Huggify—including logos, visual design elements, trademarks, and other proprietary materials—is our exclusive property.{'\n'}
                                                • Restrictions: You may not use, reproduce, distribute, or create derivative works based on our intellectual property without our express written consent.</Text>
            </View>


            <View style={styles.segment}>
                <Text style={styles.boldText}>7. Feedback and Suggestions</Text>
                <Text style={styles.normalText}>We welcome your feedback and suggestions regarding Huggify. By providing feedback, you agree that we may use such feedback without any obligation to compensate or credit you.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>8. Account Suspension and Termination</Text>
                <Text style={styles.normalText}>• Suspension: We reserve the right to suspend or terminate your account, at our sole discretion, if you violate these Terms or engage in behavior that is detrimental to the Service or other users.{'\n'}
                                                • Termination: Upon termination, your access to the Service will immediately cease, and you remain responsible for any outstanding obligations incurred prior to termination.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>9. Disclaimers and Limitation of Liability</Text>
                <Text style={styles.normalText}>• “As Is” Basis: The Service is provided “as is” and “as available” without any warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.{'\n'}
                                                • Limitation of Liability: In no event shall Pixel Reach LLC be liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of or inability to use the Service.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>10. Indemnification</Text>
                <Text style={styles.normalText}>You agree to indemnify, defend, and hold harmless Pixel Reach LLC, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’ fees) arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>11. Dispute Resolution and Governing Law</Text>
                <Text style={styles.normalText}>• Governing Law: These Terms are governed by and construed in accordance with the laws of the State of Wyoming, USA, without regard to its conflict of law provisions.{'\n'}
                                                • Dispute Resolution: Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Wyoming.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>12. Modifications to the Terms</Text>
                <Text style={styles.normalText}>We reserve the right to update or modify these Terms at any time. Any changes will be posted on the Service and, where appropriate, notified to you. Your continued use of Huggify after such modifications constitutes your acceptance of the revised Terms.</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>13. Infringement Notices</Text>
                <Text style={styles.normalText}>If you believe that any content on Huggify infringes on your intellectual property rights, please send a detailed notice of infringement to: blend@pixelreach.io</Text>
            </View>

            <View style={styles.segment}>
                <Text style={styles.boldText}>14. Contact Information</Text>
                <Text style={styles.normalText}>For any questions regarding these Terms, please contact us at: blend@pixelreach.io</Text>
            </View>
        </View>



        </ScrollView>
        <View style={styles.closeButtonContainer}>
            <CloseVideoButton onPress={onModalClose} displayText='Go Back'/>
        </View>

        </View>
    </Modal>
    )
}

export default TermsOfServicesModal

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