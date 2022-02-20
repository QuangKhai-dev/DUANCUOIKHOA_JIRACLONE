import { call, put, takeLatest, select } from "redux-saga/effects"
import { projectCategoryServices } from "../../../Services/ProjectCategoryServices"
import { THEO_DOI_GET_PROJECTCATEGORY_API } from "../../types/UserTypes"


function* getProjectCategory(action) {
    // console.log(action)
    try {
        const { data, status } = yield call(() => { return projectCategoryServices.getAllProjectCategory() })
        // console.log(data)
        yield put({
            type: 'GET_ALL_PROJECTCATEGORY',
            data: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiGetProjectCategory() {
    yield takeLatest(THEO_DOI_GET_PROJECTCATEGORY_API, getProjectCategory)
}