import { call, put, takeLatest, select } from "redux-saga/effects"
import { userServices } from "../../../Services/UserServices"
import { THEO_DOI_EDITUSER, THEO_DOI_GET_USER_API, THEO_DOI_LOGOUT, THEO_DOI_SIGNUP_API, THEO_DOI_SIGN_IN_API } from "../../types/UserTypes"
import { history } from '../../../Libs/history'

function* userSignin(action) {
    try {
        const { data, status } = yield call(() => { return userServices.signinUser(action.userInfo) })
        //Lưu token vào local storage
        localStorage.setItem('email', data.content.email);
        localStorage.setItem('phoneNumber', data.content.phoneNumber);
        localStorage.setItem('passWord', action.userInfo.passWord);
        localStorage.setItem('accessToken', data.content.accessToken);
        localStorage.setItem('id', data.content.id);
        localStorage.setItem('name', data.content.name);
        yield put({
            type: 'NOTIFICATION_SUCCESS',
            data: data,
            location: 'login'
        })
        yield put({
            type: THEO_DOI_GET_USER_API,
            keyWord: localStorage.getItem('id')
        })
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: 'NOTIFICATION_SUCCESS',
            data: err.response.data,
            location: 'login'
        })
    }
}
export function* theoDoiUserSignin() {
    yield takeLatest(THEO_DOI_SIGN_IN_API, userSignin)
}

function* getUser(action) {
    try {
        const { data, status } = yield call(() => { return userServices.getUser(action.keyWord) })
        yield put({
            type: 'GET_USER',
            data: data.content
        })
    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiGetUser() {
    yield takeLatest(THEO_DOI_GET_USER_API, getUser)
}

function* signUp(action) {
    try {
        const { data, status } = yield call(() => { return userServices.signUp(action.signUpInfo) })
        history.push('/login')

    } catch (err) {
        console.log(err.response.data)
    }
}
export function* theoDoiSignUp() {
    yield takeLatest(THEO_DOI_SIGNUP_API, signUp)
}

function* logOut(action) {
    localStorage.clear()
}
export function* theoDoiLogOut() {
    yield takeLatest(THEO_DOI_LOGOUT, logOut)
}

function* editUser(action) {
    console.log(action.model)
    try {
        const { data, status } = yield call(() => { return userServices.editUser(action.model) })
        console.log(data)
        //Lưu token vào local storage
        yield put({
            type: 'NOTIFICATION_SUCCESS',
            data: data,
            location: 'editInfo'
        })
        localStorage.clear()
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: 'NOTIFICATION_SUCCESS',
            data: err.response.data,
            location: 'editInfo'
        })
    }
}
export function* theoDoiEditUser() {
    yield takeLatest(THEO_DOI_EDITUSER, editUser)
}