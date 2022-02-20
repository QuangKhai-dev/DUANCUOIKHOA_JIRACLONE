import { all } from "redux-saga/effects";
import * as UserSaga from './Function/UserSaga'
import * as ProjectSaga from './Function/ProjectSaga'
import * as ProjectCategory from './Function/ProjectCategorySaga'

export function* rootSaga() {
    // trả về các kết quả theo số lần dispatch
    // yield takeEvery('getTaskApi', getTaskApi)
    // trả về kết quả cuối cùng vd bấm 10 phát thì trả về kq thứ 10
    yield all([
        //Nghiệp vụ theo dõi các action saga todolist
        //UserSaga
        UserSaga.theoDoiUserSignin(),
        UserSaga.theoDoiSignUp(),
        UserSaga.theoDoiLogOut(),
        //ProjectSaga
        ProjectSaga.theoDoiGetAllProject(),
        ProjectSaga.theoDoiCreateProject(),

        //ProjectCategory
        ProjectCategory.theoDoiGetProjectCategory(),
    ])
}