import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { AddToDo } from '../components/AddToDo';
import { Todo } from '../components/Todo';

export default function MainScreen({addTodo, todos, removeTodo, openTodo}){
    let content = <ScrollView>
                    {todos.map( (todo) => <Todo key={todo.id} openTodo={openTodo}  onRemove={removeTodo} id={todo.id} title={todo.title}/> ).reverse()}
                  </ScrollView>;
        if(!todos.length){
            content = <View style={styles.imageWrap}>
                         <Image style={styles.image} source={require('../../assets/no-items.png')} />
                      </View>
        }
    return (
            <View style={styles.image}>
                <AddToDo onSubmit={addTodo}/>
                {content}
            </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft:10,
        paddingRight:10,
      },
      imageWrap:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
      },
      image:{
        resizeMode: 'contain',
        maxWidth: '100%',
        height: '100%',
      }
});