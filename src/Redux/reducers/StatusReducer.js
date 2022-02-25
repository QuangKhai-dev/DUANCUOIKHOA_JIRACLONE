const initialState = {
    arrAllStatus: []
}

export const StatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_STATUS': {
            state.arrAllStatus = action.data
            return { ...state }
        }
        default:
            return state
    }
}
