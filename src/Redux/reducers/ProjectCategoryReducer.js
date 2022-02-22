const initialState = {
    arrProjectCategory: []
}

export const ProjectCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PROJECTCATEGORY': {
            state.arrProjectCategory = action.data
            return { ...state }
        }
        default:
            return { ...state }
    }
}

