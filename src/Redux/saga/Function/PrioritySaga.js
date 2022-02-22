import { call, put, takeLatest, select } from "redux-saga/effects"
import { priorityservices } from "../../../Services/PriorityServices"
import { THEO_DOI_GETALL_PRIORITY_API } from "../../types/UserTypes"

function* getAllPriority(action) {
    try {
        const { data, status } = yield call(() => { return priorityservices.getAllPriority() })
        yield put({
            type: 'GET_ALL_PRIORITY',
            data: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiGetAllPriority() {
    yield takeLatest(THEO_DOI_GETALL_PRIORITY_API, getAllPriority)
}