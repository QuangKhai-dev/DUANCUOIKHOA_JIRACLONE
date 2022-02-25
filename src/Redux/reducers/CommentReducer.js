const initialState = {
    arrAllComment: []
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COMMENT': {
            state.arrAllComment = action.data
            return { ...state }
        }
        default:
            return { ...state }
    }
}
