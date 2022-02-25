import { http } from "../Utils/settingSystem";

export class Statusservices {
    getAllStatus = async () => {
        return await http.get('/api/Status/getAll');
    }

}
export const statusservices = new Statusservices()
