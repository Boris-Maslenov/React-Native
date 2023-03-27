import {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Vibration, Alert } from 'react-native';

export function AddToDo({onSubmit}){

    const [value, setValue] = useState('');

    const pressHandler = () => {
        if(!value.trim()) {
            Alert.alert('Пустое значпение не может быть введено')
            return;
        }
        onSubmit(value);
        setValue('');
        Vibration.vibrate(80);
    }
    return (
        <View style={styles.block}>
            <TextInput autoCapitalize='none' autoCorrect={false} placeholder='Enter todo' value={value} onChangeText={setValue} style={styles.input} />
            <Button style={styles.button} title="add" onPress={pressHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    input: {
        width: '80%',
        borderColor: '#cdcdcd',
        borderStyle: 'solid',
        borderWidth: 2,
    },
    button: {
        width: '100%',
    }
});