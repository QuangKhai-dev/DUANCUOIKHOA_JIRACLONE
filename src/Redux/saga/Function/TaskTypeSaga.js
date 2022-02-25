import { call, put, takeLatest, select } from "redux-saga/effects"
import { taskTypeservices } from "../../../Services/TaskTypeServices"
import { THEO_DOI_GETALL_TASKTYPE_API } from "../../types/UserTypes"

function* getAllTaskType(action) {
    try {
        const { data, status } = yield call(() => { return taskTypeservices.getAllTaskType() })
        yield put({
            type: 'GET_ALL_TASKTYPE',
            data: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiGetAllTaskType() {
    yield takeLatest(THEO_DOI_GETALL_TASKTYPE_API, getAllTaskType)
}