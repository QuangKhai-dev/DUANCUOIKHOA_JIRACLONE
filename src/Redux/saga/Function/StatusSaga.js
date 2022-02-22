import { call, put, takeLatest, select } from "redux-saga/effects"
import { statusservices } from "../../../Services/StatusServices"
import { THEO_DOI_GETALL_STATUS_API } from "../../types/UserTypes"


function* getAllStatus(action) {
    try {
        const { data, status } = yield call(() => { return statusservices.getAllStatus() })
        yield put({
            type: 'GET_ALL_STATUS',
            data: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiGetAllStatus() {
    yield takeLatest(THEO_DOI_GETALL_STATUS_API, getAllStatus)
}