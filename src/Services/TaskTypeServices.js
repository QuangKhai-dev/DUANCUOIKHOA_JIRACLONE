import { http } from "../Utils/settingSystem";

export class TaskTypeservices {
    getAllTaskType = async () => {
        return await http.get('/api/TaskType/getAll');
    }

}
export const taskTypeservices = new TaskTypeservices()
