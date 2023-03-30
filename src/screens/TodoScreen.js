import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { EditModal } from '../components/EditModal';
import { Card } from '../components/ui/Card';
import { AppTextBold } from '../components/ui/AppTextBold';
import {THEME} from '../theme';

export default function TodoScreen({onBack, todo, onRemove, onSave}){
    const [modal, setModal] = useState(false);
    const saveHandler = (title) => {
        onSave(todo.id, title);
        setModal(false);
    }
    return( 
        <View style={styles.container}>
            <EditModal onSave={saveHandler} value={todo.title} visible={modal} onCancel={() => setModal(false)}></EditModal>
            <Card>
                <AppTextBold>{todo.title}</AppTextBold>
                <View>
                    <Button title="edit" onPress={() => setModal(true)}></Button>
                </View>
            </Card>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <Button  title="back" onPress={onBack} color={THEME.GREY_COLOR} />                         
                </View>
                <View style={styles.button}>
                    <Button title="Удалить" color="#f00" onPress={() => onRemove(todo.id)} />
                </View>
            </View>      
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: '40%',
    }
});