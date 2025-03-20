import React from 'react';
import { View } from 'react-native';
import AuthScreen from './AuthScreen';

export default function TabLayout() {
    return (
        <View style={{ flex: 1 }}>
            <AuthScreen />
        </View>
    );
}
