//Vừa mở web lên đưa dữ liệu vào redux

let usLogin = null;
if (localStorage.getItem('userLogin')) {
    //Lấy ra
    usLogin = JSON.parse(localStorage.getItem('userLogin'));
}

const initialState = {
    userLogin: usLogin,
    arrGetUser: [],
    status: '',
    messageLogin: 'Click vào để đăng nhập',
    userId: ''
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DANG_NHAP': {
            state.userInfo = action.data
            return { ...state }
        }
        case 'GET_USER': {
            state.arrGetUser = action.data
            return { ...state }
        }
        case 'MESSAGELOGIN': {
            state.userId = action.userId
            if (localStorage.getItem('name')) {
                state.messageLogin = action.name
                return { ...state }
            } else {
                state.messageLogin = 'Click vào để đăng nhập'
            }
            return { ...state }
        }
        default:
            return { ...state }
    }
}
