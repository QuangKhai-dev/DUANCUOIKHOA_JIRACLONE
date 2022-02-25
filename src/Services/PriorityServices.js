import { http } from "../Utils/settingSystem";

export class Priorityservices {
    getAllPriority = async () => {
        return await http.get('/api/Priority/getAll');
    }

}
export const priorityservices = new Priorityservices()