import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native';
import { THEME } from '../theme';
import { useState } from 'react';

export const EditModal = ({visible, onCancel, value, onSave}) => {
    const [title, setTitle] = useState(value);
    const saveHandler = () => {
        if(title.trim().length < 3) {
            Alert.alert('Ошибка!', `Минимальная длинна название 3 символа, у вас сейчас ${title.trim().length}  символов`)
        } else {
            onSave(title);
        }
    }
    const onCanceHandler = () => {
        setTitle(value);
        onCancel(); 
    }
    return (
        <Modal visible={visible} animationType={'slide'}  transparent={false}>
            <View style={styles.wrap}>
                <TextInput style={styles.input} onChangeText={setTitle} value={title}  placeholder={'введите что-нибудь'}   autoCapitalize={'none'} autoCorrect={false} />
                <View style={styles.buttons}>
                    <Button title="Отмена" onPress={onCanceHandler} color={THEME.DANGER_COLOR}></Button>
                    <Button title="Сохранить" onPress={saveHandler}></Button>
                </View>              
            </View>
        </Modal>   
    )
}

const styles = StyleSheet.create({
    wrap: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    input: {
        padding: 10,
        marginBottom:30,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%',
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});