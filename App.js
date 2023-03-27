import {useState} from 'react';
import { StyleSheet, View, Vibration, Alert} from 'react-native';
import { Navbar } from './src/components/Navbar';
import MainScreen from './src/screens/MainScreen';
import TodoScreen from './src/screens/TodoScreen';

export default function App() {

  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(null);

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
    <View style={styles.container}>
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
