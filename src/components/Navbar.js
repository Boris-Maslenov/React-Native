import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppTextBold } from './ui/AppTextBold';

export const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <AppTextBold style={styles.text}>Todo App</AppTextBold>
        </View>
    )
};

const styles = StyleSheet.create({
    navbar:{
        height: 100,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#8596f2',
        paddingBottom: 20,
    },
    text: {
        color: '#fff',
        fontSize: 30,

    },
});