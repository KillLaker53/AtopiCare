import React from 'react';
import { Platform, View, useColorScheme } from 'react-native';
import AuthScreen from './AuthScreen';
import UploadPhotoScreen from "@/app/(tabs)/UploadPhotoScreen";
import AnalyzeScreen from "@/app/(tabs)/AnalyzeScreen";
//
import {Tabs} from "expo-router";
import {IconSymbol} from "@/components/ui/IconSymbol";
import FoodAndStressScreen from "@/app/(tabs)/FoodAndStressScreen";

// export default function TabLayout() {
//     return (
//         <Tabs>
//             <Tabs.Screen
//                 name="forum"
//                 options={{
//                     title: 'forum',
//                     tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//                 }}
//             />
//             <Tabs.Screen
//                 name="explore"
//                 options={{
//                     title: 'Explore',
//                     tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//                 }}
//             />
//         </Tabs>
// )}
// import AdminScreen from "@/app/(tabs)/AdminScreen";
// import ProfileScreen from "@/app/(tabs)/profile";
// import FoodAndStressScreen from "@/app/(tabs)/FoodAndStressScreen";
//
export default function TabLayout() {
    return (
        <View style={{flex: 1}}>
            {/*<AuthScreen/>*/}
            {/*<UploadPhotoScreen />*/}
            {/*<AnalyzeScreen />*/}
            {/* <AdminScreen />*/}
            {/*<ProfileScreen />*/}
            <FoodAndStressScreen />
        </View>
    );
}