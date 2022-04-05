const reducerFunc = (state, action) => {
    switch (action.type) {
        case "SET_FOCUS":
            return { ...state, focus: action.payload.value }
        case "SET_FINAL_FOCUS":
            return { ...state, focusFinal: action.payload.value.focus, todoCompleted: action.payload.value.todoCompleted }
        case "SET_TODO_COMPLETED":
            localStorage.setItem(
                "Focus",
                JSON.stringify({ ...JSON.parse(localStorage.getItem("Focus")), todoCompleted: !state.todoCompleted })
            );
            return { ...state, todoCompleted: !state.todoCompleted }
        case "SET_EDIT":
            return { ...state, edit: action.payload.value }
        case "CLEAR_FOCUS":
            localStorage.removeItem("Focus");
            return { ...state, focus: "", focusFinal: "", todoCompleted: false, edit: false }
        default:
            return state
    }
}

export { reducerFunc }