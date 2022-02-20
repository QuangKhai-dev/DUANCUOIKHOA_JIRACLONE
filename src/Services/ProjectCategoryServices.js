import { http } from "../Utils/settingSystem";

export class ProjectCategoryServices {
    getAllProjectCategory = async () => {
        return await http.get('/api/ProjectCategory');
    }
}

export const projectCategoryServices = new ProjectCategoryServices()