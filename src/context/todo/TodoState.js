import { useReducer, useContext, useCallback } from 'react';
import { Http } from '../../http';
import { Vibration, Alert } from 'react-native'
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ScreenContext } from '../screen/screenContext';
const DATA_BASE_URL = 'https://react-native-todos-54e7b-default-rtdb.europe-west1.firebasedatabase.app/todos.json';
const initialState = {
    todos: [],
};
export const TodoState = ({children}) => {
    const {changeScreen} = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const addTodo =  async title =>{
          try {
            const data = await Http.post(DATA_BASE_URL, {title});
            dispatch({type: 'ADD_TODO', payload: {id: data.name, title}});
          } catch(e) {
            showError(e.message); 
          }
    };
    const removeTodo = id => {
       const todo = state.todos.find(t => t.id  === id);
       Alert.alert('Удаление элемента', `Вы уверены, что хотите удалить "${todo.title}"?`, [
         {text: 'Отмена',style: 'cancel'},
         {
           text: 'Удалить',
           onPress: async () => {
                try {
                      await Http.delete(`https://react-native-todos-54e7b-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`);
                        changeScreen(null);
                        dispatch({type: 'REMOVE_TODO', payload: id});
                } catch(e) {
                  showError(e.message); 
                }
           },
         }
       ]);
       Vibration.vibrate(50);
    };

    const fetchTodos = useCallback(
      async () => {
        try {
          clearError();
          showLoader();
          const response = await Http.get(DATA_BASE_URL);
          const todos = Object.entries(response).map(([id, title]) => ({id, ...title}));
          dispatch({type: 'FETCH_TODOS', payload: todos});
        } catch(e) {
           showError(e.message);
        } finally {
          hideLoader();
        }
      }, []
    );

    const updateTodo = async (id, title) => {
      try {
      await Http.patch(`https://react-native-todos-54e7b-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,  {title});
        dispatch({type: 'UPDATE_TODO', payload: {id, title}});
      } catch(e) {
        showError(e.message);
      }
    };
    const showLoader = () => dispatch({type: 'SHOW_LOADER'});
    const hideLoader = () => dispatch({type: 'HIDE_LOADER'});
    const showError = (error) => dispatch({type: 'SHOW_ERROR', payload: error});
    const clearError = () => dispatch({type: 'CLEAR_ERROR'});

    return <TodoContext.Provider value={{
                                todos: state.todos,
                                loading: state.loading,
                                error: state.error,
                                addTodo,
                                removeTodo,
                                updateTodo,
                                fetchTodos,

    }}>{children}</TodoContext.Provider>
}