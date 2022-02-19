import { call, put, takeLatest, select } from "redux-saga/effects"
import { userServices } from "../../../Services/UserServices"
import { THEO_DOI_GET_USER_API, THEO_DOI_LOGOUT, THEO_DOI_SIGNUP_API, THEO_DOI_SIGN_IN_API } from "../../types/UserTypes"
import { history } from './../../../Libs/history'

function* userSignin(action) {
    const { userInfo } = action
    // console.log(userInfo)
    try {
        const { data, status } = yield call(() => { return userServices.signinUser(userInfo) })
        //Lưu token vào local storage
        console.log(data);
        localStorage.setItem('userLogin', JSON.stringify(userInfo));
        localStorage.setItem('accessToken', data.content.accessToken);
        localStorage.setItem('id', data.content.id);
        localStorage.setItem('name', data.content.name);
        history.push('/')
        yield put({
            type: THEO_DOI_GET_USER_API,
            keyWord: localStorage.getItem('id')
        })
    } catch (err) {
        console.log(err.response.data)
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
    console.log(action);
    try {
        const { data, status } = yield call(() => { return userServices.signUp(action.signUpInfo) })
        console.log(data);
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