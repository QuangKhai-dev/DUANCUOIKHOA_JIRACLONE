import { http } from "../Utils/settingSystem";

export class Projectservices {
    getAllProject = async () => {
        return await http.get('/api/Project/getAllProject');
    }

    createProject = async (model) => {
        return await http.post('/api/Project/createProjectAuthorize', model);
    }

    deleteProject = async (id) => {
        return await http.delete(`/api/Project/deleteProject?projectId=${id}`);
    }

    updateProject = async (projectId, projectUpdate) => {
        return await http.put(`/api/Project/updateProject?projectId=${projectId}`, projectUpdate);
    }

    createTask = async (model) => {
        return await http.post('/api/Project/createTask', model);
    }

    addMemberProject = async (project) => {
        return await http.post('/api/Project/assignUserProject', project);
    }

    projectDetail = async (projectId) => {
        return await http.get(`/api/Project/getProjectDetail?id=${projectId}`);
    }

    updateStatus = async (model) => {
        return await http.put('/api/Project/updateStatus', model)
    }

    removeUserFromProject = async (project) => {
        return await http.post('/api/Project/removeUserFromProject', project)
    }

    removeTask = async (taskId) => {
        return await http.delete(`/api/Project/removeTask?taskId=${taskId}`)
    }
}
export const projectservices = new Projectservices()
