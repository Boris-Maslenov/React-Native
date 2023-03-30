import {useState, useEffect, useCallback} from 'react';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { StyleSheet, View, Vibration, Alert} from 'react-native';
import { Navbar } from './src/components/Navbar';
import MainScreen from './src/screens/MainScreen';
import TodoScreen from './src/screens/TodoScreen';



// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(null);

  // if(!isReady){
  //   return <SplashScreen startAsync={loadApplication}  onError={()=>console.log()}  onFinish={() => setIsReady(true)}/>
  // }

  useEffect(()=>{
    async function loadApplication(){
      try{
        await Font.loadAsync({
          'roboto-regular' : require('./assets/fonts/Roboto-Regular.ttf'),
          'roboto-bold' : require('./assets/fonts/Roboto-Bold.ttf')
        })
      }catch(e){
        console.log(e);
      }finally{
        setIsReady(true)
      }
    }
    loadApplication();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  const addTodo = (title) => {
      const newTodo = {
          id: String( Date.now() ),
          title,
      };
      setTodos(prev => [...prev, newTodo])
  };

  const removeTodo = (id) => {
    const todo = todos.find(t => t.id  === id);
    Alert.alert('Удаление элемента', `Вы уверены, что хотите удалить "${todo.title}"?`, [
      {
        text: 'Отмена',
        style: 'cancel',
      },
      {
        text: 'Удалить',
        onPress: () => {
          setTodoId(null);
          setTodos(prev => prev.filter((todo) => todo.id !== id));
        },
        
      }
    ])
    Vibration.vibrate(50);
  }

  const updateTodo = (id, title) => {
    setTodos((old) => old.map(todo => {
      if(todo.id === id) todo.title = title;
      return todo;
    }));
  }

  let content = <MainScreen openTodo={setTodoId} addTodo={addTodo} todos={todos} removeTodo={removeTodo} />
  if(todoId){
      const selectedTodo = todos.find(todo => todo.id === todoId)
     content = <TodoScreen onSave={updateTodo}  onRemove={removeTodo} onBack={() => setTodoId(null) } todo={selectedTodo} />
     }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Navbar />
      <View>
        {content}
      </View>
    </View>
  );
}

// StyleSheet - создает стили, что можно сравнить с css классами, 
// но ничего общего не имеет. Так же он еще может валидировать и оптимизировать
// свойства.

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center'
  },

});
