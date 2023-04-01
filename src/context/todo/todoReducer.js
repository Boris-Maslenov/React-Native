export const todoReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TODO' : 
            return {...state, todos: [...state.todos, {id: String(Date.now()), title: action.payload} ] }
        case 'REMOVE_TODO' : 
            return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)} 
        case 'UPDATE_TODO' : 
            return {...state,  todos: state.todos.map(todo => {
                if(todo.id === action.payload.id){
                    todo.title = action.payload.title;
                }
                return todo;
            })}
        default:
            return state
    }
}