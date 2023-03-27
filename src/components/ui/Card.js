import { StyleSheet, View } from "react-native"
export const Card = ({children}) => <View style={styles.default}>{children}</View>;


const styles = StyleSheet.create({
    default: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'green',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // FOR IPHONE
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 1,},
        backgroundColor: '#fff',
        borderRadius: 10,
        // FOR ANDROID ONLI
        elevation: 8,

    },
})