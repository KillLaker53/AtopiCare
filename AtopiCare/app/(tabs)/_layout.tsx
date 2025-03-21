import React from 'react';
import { Platform, View, useColorScheme } from 'react-native';
import AuthScreen from './AuthScreen';
import UploadPhotoScreen from "@/app/(tabs)/UploadPhotoScreen";
import AnalyzeScreen from "@/app/(tabs)/AnalyzeScreen";
import {Tabs} from "expo-router";
import {IconSymbol} from "@/components/ui/IconSymbol";
import AdminScreen from "@/app/(tabs)/AdminScreen";
import ProfileScreen from "@/app/(tabs)/profile";
import FoodAndStressScreen from "@/app/(tabs)/FoodAndStressScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import forum from './forum';

const Stack = createNativeStackNavigator();

export default function TabLayout() {
    return (
            <Stack.Navigator initialRouteName="AuthScreen">
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
                <Stack.Screen name="UploadPhotoScreen" component={UploadPhotoScreen} />
                <Stack.Screen name="AnalyzeScreen" component={AnalyzeScreen} />
                <Stack.Screen name="AdminScreen" component={AdminScreen} />
                <Stack.Screen name="profile" component={ProfileScreen} />
                <Stack.Screen name="FoodAndStressScreen" component={FoodAndStressScreen} />
                <Stack.Screen name="forum" component={forum} />
            </Stack.Navigator>
        // <View style={{flex: 1}}>
        //     {/*<AuthScreen/>*/}
        //     <UploadPhotoScreen />
        //     {/*<AnalyzeScreen />*/}
        //     {/* <AdminScreen /> */}
        //     {/*<ProfileScreen />*/}
        //     <FoodAndStressScreen />
        // </View>
    );
}