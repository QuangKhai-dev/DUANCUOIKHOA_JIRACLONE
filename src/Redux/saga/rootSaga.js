import { all, call } from "redux-saga/effects";

export function* rootSaga() {
    // trả về các kết quả theo số lần dispatch
    // yield takeEvery('getTaskApi', getTaskApi)
    // trả về kết quả cuối cùng vd bấm 10 phát thì trả về kq thứ 10
    yield all([
        //Nghiệp vụ theo dõi các action saga todolist

    ])
}