import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./app/(tabs)/AuthScreen";
import UploadPhotoScreen from "./app/(tabs)/UploadPhotoScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AuthScreen" component={AuthScreen} />
                <Stack.Screen name="UploadPhotoScreen" component={UploadPhotoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
