import { http } from "../Utils/settingSystem";

export class CommentServices {
    getAllComment = async (taskId) => {
        return await http.get(`/api/Comment/getAll?taskId=${taskId}`);
    }

    createComment = async (model) => {
        return await http.post('/api/Comment/insertComment', model);
    }

    updateComment = async (model) => {
        return await http.put(`/api/Comment/updateComment?id=${model.commentId}&contentComment=${model.commentUpdate}`);
    }

    deleteComment = async (commentId) => {
        return await http.delete(`/api/Comment/deleteComment?idComment=${commentId}`);
    }

}
export const commentservices = new CommentServices()