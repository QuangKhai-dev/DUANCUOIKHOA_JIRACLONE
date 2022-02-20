
const initialState = {
    visible: false,
    arrAllProject: [],
    projectById: {},
    arrProjectDetail: [],
    messageNoti: {
        statusCode: '',
        projectId: ''
    }
}

export const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PROJECT': {
            const newArrProject = action.data.filter(project => project.creator.name === localStorage.getItem('name'))
            state.arrAllProject = newArrProject
            return { ...state }
        }
        case 'NOTIFICATION_SUCCESS': {
            // console.log(action.data);
            state.messageNoti = {
                statusCode: action.data.statusCode,
                projectId: action.data.content.projectId
            }
            return { ...state }
        }
        case 'NOTIFICATION_FAIL': {
            state.messageNoti = {
                statusCode: action.data.statusCode,
            }
            return { ...state }
        }
        case 'CLEAR_MESSAGE': {
            state.messageNoti = {
                statusCode: null,
            }
            return { ...state }
        }
        case "OPEN_DRAWER": {
            const projectById = state.arrAllProject.find(project => project.id === action.id)
            state.projectById = projectById
            return { ...state, visible: true }
        }
        case "CLOSE_DRAWER": {
            return { ...state, visible: false }
        }
        case 'GET_PROJECT_BY_ID': {
            state.projectById = action.data
            return { ...state }
        }
        case 'GET_PROJECTDETAIL': {
            state.arrProjectDetail = action.data
            return { ...state }
        }
        default:
            return state
    }
}
