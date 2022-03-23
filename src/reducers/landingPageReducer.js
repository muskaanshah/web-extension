const reducerFunc = (state, action) => {
    switch (action.type) {
        case "SET_USERNAME":
            return { ...state, userName: action.payload.value }
        case "SET_FOCUS":
            return { ...state, focus: action.payload.value }
        case "SET_TODO_COMPLETED":
            return { ...state, todoCompleted: !state.todoCompleted }
        case "SET_EDIT":
            return { ...state, edit: action.payload.value }
        default:
            return state
    }
}

export { reducerFunc }