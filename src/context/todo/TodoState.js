import { useReducer, useContext } from 'react';
import { Vibration, Alert } from 'react-native'
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ScreenContext } from '../screen/screenContext';
const initialState = {
    todos: [{id: '1', title: 'Выучить React Native'}],
};
export const TodoState = ({children}) => {
    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const addTodo = title => dispatch({type: 'ADD_TODO', payload: title});
    const removeTodo = id => {
       const todo = state.todos.find(t => t.id  === id);
       Alert.alert('Удаление элемента', `Вы уверены, что хотите удалить "${todo.title}"?`, [
         {text: 'Отмена',style: 'cancel'},
         {
           text: 'Удалить',
           onPress: () => {
                changeScreen(null);
                dispatch({type: 'REMOVE_TODO', payload: id});
           },
         }
       ]);
       Vibration.vibrate(50);
    };
    const updateTodo = (id, title) => dispatch({type: 'UPDATE_TODO', payload: {id, title}});
    return <TodoContext.Provider value={{
                                todos: state.todos,
                                addTodo,
                                removeTodo,
                                updateTodo,     
    }}>{children}</TodoContext.Provider>
}