const reducerFunc = (state, action) => {
    switch (action.type) {
        case "SET_USERNAME":
            return { ...state, userName: action.payload.value }
        case "SET_FOCUS":
            return { ...state, focus: action.payload.value }
        case "SET_FINAL_FOCUS":
            return { ...state, focusFinal: action.payload.value }
        case "SET_TODO_COMPLETED":
            return { ...state, todoCompleted: !state.todoCompleted }
        case "SET_EDIT":
            return { ...state, edit: action.payload.value }
        case "CLEAR_FOCUS":
            localStorage.removeItem("Focus");
            return { ...state, focus: "", focusFinal: "", todoCompleted: false, edit: false }
        case "OPEN_SETTINGS_MODAL":
            return { ...state, settingsModal: !state.settingsModal }
        default:
            return state
    }
}

export { reducerFunc }