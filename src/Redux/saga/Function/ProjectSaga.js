import { call, put, takeLatest } from "redux-saga/effects"
import { projectservices } from "../../../Services/ProjectServices"
import { THEO_DOI_ADD_MEMBER_API, THEO_DOI_CREATE_PROJECT_API, THEO_DOI_CREATE_TASK_API, THEO_DOI_DELETE_PROJECT_API, THEO_DOI_GET_ALLPROJECT_API, THEO_DOI_GET_PROJECTDETAIL_API, THEO_DOI_REMOVE_TASK_API, THEO_DOI_REMOVE_USER_FROMPROJECT_API, THEO_DOI_UPDATE_PROJECT_API, THEO_DOI_UPDATE_STATUS_API } from "../../types/UserTypes"

function* getAllProject(action) {
    // console.log(action)
    try {
        const { data, status } = yield call(() => { return projectservices.getAllProject() })
        // console.log(data)
        yield put({
            type: 'GET_ALL_PROJECT',
            data: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiGetAllProject() {
    yield takeLatest(THEO_DOI_GET_ALLPROJECT_API, getAllProject)
}

function* createProject(action) {
    // console.log(action.model)
    try {
        const { data, status } = yield call(() => { return projectservices.createProject(action.model) })
        action.formik.resetForm()
        yield put({
            type: 'NOTIFICATION_SUCCESS',
            data: data
        })
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: 'NOTIFICATION_FAIL',
            data: err.response.data
        })
    }
}
export function* theoDoiCreateProject() {
    yield takeLatest(THEO_DOI_CREATE_PROJECT_API, createProject)
}

function* deleteProject(action) {
    // console.log(action.id)
    try {
        const { data, status } = yield call(() => { return projectservices.deleteProject(action.id) })
        // console.log(data)
        yield call(getAllProject)
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiDeleteProject() {
    yield takeLatest(THEO_DOI_DELETE_PROJECT_API, deleteProject)
}

function* updateProject(action) {
    // console.log(action)
    console.log(action.projectUpdate)
    try {
        const { data, status } = yield call(() => { return projectservices.updateProject(action.projectId, action.projectUpdate) })
        // console.log(data)
        yield call(getAllProject)
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiUpdateProject() {
    yield takeLatest(THEO_DOI_UPDATE_PROJECT_API, updateProject)
}

function* createTask(action) {
    // console.log(action)
    try {
        const { data, status } = yield call(() => { return projectservices.createTask(action.model) })
        console.log(data)
        yield put({
            type: 'NOTIFICATION_SUCCESS',
            data: data
        })
        yield call(getAllProject)
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: 'NOTIFICATION_FAIL',
            data: err.response.data
        })
    }
}
export function* theoDoiCreateTask() {
    yield takeLatest(THEO_DOI_CREATE_TASK_API, createTask)
}

function* addMember(action) {
    // console.log(action)
    try {
        const { data, status } = yield call(() => { return projectservices.addMemberProject(action.projectInfo) })
        // console.log(data)
        yield call(getAllProject)
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiAddMember() {
    yield takeLatest(THEO_DOI_ADD_MEMBER_API, addMember)
}

function* getProjectDetail(action) {
    // console.log(action)
    try {
        const { data, status } = yield call(() => { return projectservices.projectDetail(action.projectId) })
        // console.log(data)
        yield put({
            type: 'GET_PROJECTDETAIL',
            data: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiGetProjectDetail() {
    yield takeLatest(THEO_DOI_GET_PROJECTDETAIL_API, getProjectDetail)
}

function* updateStatus(action) {
    // console.log(action)
    try {
        const { data, status } = yield call(() => { return projectservices.updateStatus(action.updateTask) })
        // console.log(data)
        if (status == 200) {
            yield put({
                type: THEO_DOI_GET_PROJECTDETAIL_API,
                projectId: action.projectId
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiUpdateStatus() {
    yield takeLatest(THEO_DOI_UPDATE_STATUS_API, updateStatus)
}

function* removeUserFromProject(action) {
    // console.log(action)
    try {
        const { data, status } = yield call(() => { return projectservices.removeUserFromProject(action.memberInfo) })
        yield call(getAllProject)
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiRemoveUserFromProject() {
    yield takeLatest(THEO_DOI_REMOVE_USER_FROMPROJECT_API, removeUserFromProject)
}

function* removeTask(action) {
    // console.log(action)
    try {
        const { data, status } = yield call(() => { return projectservices.removeTask(action.taskId) })
        yield put({
            type: THEO_DOI_GET_PROJECTDETAIL_API,
            projectId: action.projectId
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiRemoveTask() {
    yield takeLatest(THEO_DOI_REMOVE_TASK_API, removeTask)
}
