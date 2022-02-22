import { all, call } from "redux-saga/effects";
import * as UserSaga from './Function/UserSaga'
import * as ProjectSaga from './Function/ProjectSaga'
import * as ProjectCategory from './Function/ProjectCategorySaga'
import * as PrioritySaga from './Function/PrioritySaga'
import * as TaskTypeSaga from './Function/TaskTypeSaga'
import * as StatusSaga from './Function/StatusSaga'
import * as CommentSaga from './Function/CommentSaga'
export function* rootSaga() {
    // trả về các kết quả theo số lần dispatch
    yield all([
        //UserSaga
        UserSaga.theoDoiUserSignin(),
        UserSaga.theoDoiGetUser(),
        UserSaga.theoDoiSignUp(),
        UserSaga.theoDoiLogOut(),
        UserSaga.theoDoiEditUser(),
        //ProjectSaga
        ProjectSaga.theoDoiGetAllProject(),
        ProjectSaga.theoDoiCreateProject(),
        ProjectSaga.theoDoiDeleteProject(),
        ProjectSaga.theoDoiUpdateProject(),
        ProjectSaga.theoDoiCreateTask(),
        ProjectSaga.theoDoiAddMember(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiUpdateStatus(),
        ProjectSaga.theoDoiRemoveUserFromProject(),
        ProjectSaga.theoDoiRemoveTask(),
        //ProjectCategory
        ProjectCategory.theoDoiGetProjectCategory(),
        //Priority
        PrioritySaga.theoDoiGetAllPriority(),
        //TaskType
        TaskTypeSaga.theoDoiGetAllTaskType(),
        //Status
        StatusSaga.theoDoiGetAllStatus(),
        //Comment
        CommentSaga.theoDoiCreateComment(),
        CommentSaga.theoDoiGetAllComment(),
        CommentSaga.theoDoiDeleteComment(),
    ])
}