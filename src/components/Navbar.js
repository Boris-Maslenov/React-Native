import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>Todo App</Text>
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