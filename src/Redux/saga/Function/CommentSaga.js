import { call, put, takeLatest, select } from "redux-saga/effects"
import { commentservices } from "../../../Services/CommentServices"
import { THEO_DOI_CREATE_COMMENT_API, THEO_DOI_DELETE_COMMENT_API, THEO_DOI_GETALL_COMMENT_API } from "../../types/UserTypes"

function* getAllComment(action) {
    try {
        const { data, status } = yield call(() => { return commentservices.getAllComment(action.taskId) })
        yield put({
            type: 'GET_COMMENT',
            data: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiGetAllComment() {
    yield takeLatest(THEO_DOI_GETALL_COMMENT_API, getAllComment)
}

function* createComment(action) {
    try {
        const { data, status } = yield call(() => { return commentservices.createComment(action.data) })
        yield put({
            type: THEO_DOI_GETALL_COMMENT_API,
            taskId: action.data.taskId
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiCreateComment() {
    yield takeLatest(THEO_DOI_CREATE_COMMENT_API, createComment)
}

function* deleteComment(action) {
    try {
        const { data, status } = yield call(() => { return commentservices.deleteComment(action.commentId) })
        yield put({
            type: THEO_DOI_GETALL_COMMENT_API,
            taskId: action.taskId
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiDeleteComment() {
    yield takeLatest(THEO_DOI_DELETE_COMMENT_API, deleteComment)
}