import { StyleSheet, Text, View, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import { THEME } from '../../theme';
import { AppTextBold } from './AppTextBold';

export const AppButton = ({children, onPress, color = THEME.MAIN_COLOR}) => {
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        // <Text style={ {...styles.default, ...props.style} }>{props.children}</Text>
        <Wrapper onPress={onPress}>
            <View style={{...styles.button, backgroundColor: color} }>
                <AppTextBold style={styles.text}>{children}</AppTextBold>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    }
});