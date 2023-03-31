import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { AppTextBold } from './ui/AppTextBold';
import { THEME } from '../theme';


export const Navbar = () => {
    return (
        <View style={{...styles.navbar, 
            ...Platform.select({
                ios: styles.navbarIos,
                android: styles.navbarAndroid,
            })}}>
            <AppTextBold style={styles.text}>Todo App</AppTextBold>
        </View>
    )
};

const styles = StyleSheet.create({
    navbar:{
        height: 100,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    navbarAndroid: {
        backgroundColor: '#8596f2',
    },
    navbarIos: {
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 1,
    },
    text: {
        color: Platform.OS === 'ios' ? THEME.MAIN_COLOR: '#fff' ,
        fontSize: 30,

    },
});