export const todoReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TODO' : 
            //return {...state, todos: [...state.todos, {id: String(Date.now()), title: action.payload} ] }
            console.log('ADD_TODO');
            return {...state, todos: [...state.todos, action.payload ] }
        case 'REMOVE_TODO' : 
            return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)} 
        case 'UPDATE_TODO' : 
            return {...state,  todos: state.todos.map(todo => {
                if(todo.id === action.payload.id){todo.title = action.payload.title}
                return todo;
            })}
        case 'FETCH_TODOS' : 
            console.log('FETCH_TODOS');
            return {...state, todos: [...state.todos, ...action.payload]}     
        case 'SHOW_LOADER' : 
            return {...state, loading: true} 
        case 'HIDE_LOADER' : 
            return {...state, loading: false} 
        case 'CLEAR_ERROR' : 
            return {...state, error: null} 
        case 'SHOW_ERROR' : 
            return {...state, error: action.payload} 
        default:
            return state
    }
}