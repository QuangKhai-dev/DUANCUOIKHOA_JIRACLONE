const initialState = {
    arrAllPriority: []
}

export const PriorityReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PRIORITY': {
            state.arrAllPriority = action.data
            return { ...state }
        }
        default:
            return { ...state }
    }
}
