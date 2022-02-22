import { useSelector } from "react-redux";
import { http } from "../Utils/settingSystem"



export class UserServices {

    signinUser = async (userInfo) => {
        return await http.post('/api/Users/signin', userInfo);

    }

    getUser = async (keyWord) => {
        return await http.get(`/api/Users/getUser?keyword=${keyWord}`)
    }

    signUp = async (model) => {
        return await http.post('/api/Users/signup', model)
    }

    editUser = async (model) => {
        return await http.put('/api/Users/editUser', model)
    }

}
export const userServices = new UserServices()
