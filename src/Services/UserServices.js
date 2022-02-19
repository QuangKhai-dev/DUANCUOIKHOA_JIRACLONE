import { http } from "../Utils/settingSystem"



export class UserServices {

    signinUser = async (userInfo) => {
        // console.log(userInfo)
        return await http.post('/api/Users/signin', userInfo);

    }

    getUser = async (keyWord) => {
        console.log(keyWord)
        return await http.get(`/api/Users/getUser?keyword=${keyWord}`)
    }

    signUp = async (model) => {
        return await http.post('/api/Users/signup', model)
    }

}
export const userServices = new UserServices()
