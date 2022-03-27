import { v4 as uuid } from "uuid";

const todoCompletedHandler = (state, id) => {
    const temp = state.todo.reduce(
        (acc, curr) =>
            curr.id === id
                ? [...acc, { ...curr, todoCompleted: !curr.todoCompleted }]
                : [...acc, curr],
        []
    );
    return { ...state, todo: temp };
};

const clearTodoHandler = (state, id) => {
    const temp = state.todo.filter(curTodo => curTodo.id !== id);
    return { ...state, todo: temp };
}

const todoReducer = (state, action) => {
    switch (action.type) {
        case "START_TODO_LIST":
            return { ...state, createTodo: true };
        case "ADD_TODO":
            const temp = {
                ...state,
                todo: [
                    ...state.todo,
                    { id: uuid(), todoName: action.payload.value, todoCompleted: false },
                ]
            };
            localStorage.setItem("Todos", JSON.stringify(state.todo));
            return temp
        case "CHANGE_TODO_VALUE":
            return { ...state, newTodoValue: action.payload.value };
        case "SET_FROM_LOCALSTORAGE":
            return { ...state, todo: action.payload.value };
        case "SET_TODO_COMPLETED":
            return todoCompletedHandler(state, action.payload.value);
        case "CLEAR_TODO":
            return clearTodoHandler(state, action.payload.value);
        case "OPEN_TODO_MODAL":
            return { ...state, todoModal: !state.todoModal }
        default:
            return state;
    }
};

export { todoReducer }