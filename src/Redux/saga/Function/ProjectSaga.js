import { call, put, takeLatest } from "redux-saga/effects"
import { projectservices } from "../../../Services/ProjectServices"
import { THEO_DOI_ADD_MEMBER_API, THEO_DOI_CREATE_PROJECT_API, THEO_DOI_CREATE_TASK_API, THEO_DOI_DELETE_PROJECT_API, THEO_DOI_GET_ALLPROJECT_API, THEO_DOI_GET_PROJECTDETAIL_API, THEO_DOI_REMOVE_TASK_API, THEO_DOI_REMOVE_USER_FROMPROJECT_API, THEO_DOI_UPDATE_PROJECT_API, THEO_DOI_UPDATE_STATUS_API } from "../../types/UserTypes"

function* getAllProject(action) {
    try {
        const { data, status } = yield call(() => { return projectservices.getAllProject() })
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
    try {
        const { data, status } = yield call(() => { return projectservices.createProject(action.model) })
        action.formik.resetForm()
        yield put({
            type: 'NOTIFICATION_SUCCESS',
            data: data,
            location: 'createProject'
        })
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: 'NOTIFICATION_FAIL',
            data: err.response.data,
            location: 'createProject'
        })
    }
}
export function* theoDoiCreateProject() {
    yield takeLatest(THEO_DOI_CREATE_PROJECT_API, createProject)
}

function* deleteProject(action) {
    try {
        const { data, status } = yield call(() => { return projectservices.deleteProject(action.id) })
        yield call(getAllProject)
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiDeleteProject() {
    yield takeLatest(THEO_DOI_DELETE_PROJECT_API, deleteProject)
}

function* updateProject(action) {
    try {
        const { data, status } = yield call(() => { return projectservices.updateProject(action.projectId, action.projectUpdate) })
        yield call(getAllProject)
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiUpdateProject() {
    yield takeLatest(THEO_DOI_UPDATE_PROJECT_API, updateProject)
}

function* createTask(action) {
    try {
        const { data, status } = yield call(() => { return projectservices.createTask(action.model) })
        yield put({
            type: 'NOTIFICATION_SUCCESS',
            data: data,
            location: 'createTask'
        })
        yield call(getAllProject)
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: 'NOTIFICATION_FAIL',
            data: err.response.data,
            location: 'createTask'
        })
    }
}
export function* theoDoiCreateTask() {
    yield takeLatest(THEO_DOI_CREATE_TASK_API, createTask)
}

function* addMember(action) {
    try {
        const { data, status } = yield call(() => { return projectservices.addMemberProject(action.projectInfo) })
        yield call(getAllProject)
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiAddMember() {
    yield takeLatest(THEO_DOI_ADD_MEMBER_API, addMember)
}

function* getProjectDetail(action) {
    try {
        const { data, status } = yield call(() => { return projectservices.projectDetail(action.projectId) })
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
    try {
        const { data, status } = yield call(() => { return projectservices.updateStatus(action.updateTask) })
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
