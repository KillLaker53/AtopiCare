import React from 'react';
import { Platform, View, useColorScheme } from 'react-native';
import AuthScreen from './AuthScreen';
<<<<<<< HEAD
import UploadPhotoScreen from "@/app/(tabs)/UploadPhotoScreen";

export default function TabLayout() {
// <<<<<<< HEAD
    return (
        <View style={{ flex: 1 }}>
            <AuthScreen />
            {/*<UploadPhotoScreen />*/}
        </View>
    );
// =======
//   const colorScheme = useColorScheme();
//
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="UploadPhoto"
//         options={{
//           title: 'Upload Photo',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// >>>>>>> 37085ad6ef92ba12a408651378daf95062e7bb6a
=======
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function TabLayout() {
  //   return (
  //       <View style={{ flex: 1 }}>
  //           <AuthScreen />
  //       </View>
  // );
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="UploadPhoto"
        options={{
          title: 'Upload Photo',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
>>>>>>> 434a52a2a0f592d350f032434547efde6032b47c
}
