import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export function Todo({id, title, onRemove, openTodo}){
    // удаление элемента по id , через замыкание
    function longPressHandler(){
        onRemove(id);
    }
    //longPressHandler.bind(null, id);
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => openTodo(id)} onLongPress={longPressHandler}>
            <View style={styles.todo}>
                <Text>{title}</Text>
            </View>    
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
  }  
})