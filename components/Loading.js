import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appColors } from '../constant/AppColors'

export function Loading({size='large', color=appColors.lightColor}){

    return (
        <ActivityIndicator size={size} color={color} />
    )
}

const styles = StyleSheet.create({
    
})