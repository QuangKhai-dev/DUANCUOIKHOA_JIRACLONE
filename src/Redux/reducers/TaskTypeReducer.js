const initialState = {
    arrAllTaskType: []
}

export const TaskTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_TASKTYPE': {
            state.arrAllTaskType = action.data
            return { ...state }
        }
        default:
            return { ...state }
    }
}
