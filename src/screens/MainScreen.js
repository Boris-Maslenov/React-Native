import {useState, useEffect, useContext, memo} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { AddToDo } from '../components/AddToDo';
import { Todo } from '../components/Todo';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';

let subscribes = true;

export const  MainScreen = () => {
    const [deviceWidth, setDeviceWidth] = useState( Dimensions.get('window').width - 30 );
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext);
  
  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - 30;
      setDeviceWidth(width);
    }
    const subscribe = Dimensions.addEventListener('change', update);
    return () =>  subscribe?.remove();
  }, []);
  
  useEffect( () => {
    if(subscribes) fetchTodos();
    return () => subscribes = false;
  }, []);
  
  if(loading) return <AppLoader />
  if(error) return <View><Text>{error}</Text></View>
  
  let content = <View style={{width: deviceWidth}}>
                    <ScrollView >
                      {todos.map( (todo) => <Todo key={todo.id} openTodo={changeScreen}  onRemove={removeTodo} id={todo.id} title={todo.title}/> ).reverse()}
                    </ScrollView>
                  </View>;

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