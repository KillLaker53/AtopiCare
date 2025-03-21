import React from 'react';
import { Platform, View, useColorScheme } from 'react-native';
import AuthScreen from './AuthScreen';
import UploadPhotoScreen from "@/app/(tabs)/UploadPhotoScreen";
import AnalyzeScreen from "@/app/(tabs)/AnalyzeScreen";
import AdminScreen from "@/app/(tabs)/AdminScreen";
import ProfileScreen from "@/app/(tabs)/profile";

export default function TabLayout() {
    return (
        <View style={{flex: 1}}>
            {<AuthScreen/>}
            {/*<UploadPhotoScreen />*/}
            {/*<AnalyzeScreen />*/}
            {/* <AdminScreen /> */}
            {/*<ProfileScreen />*/}
        </View>
    );
}