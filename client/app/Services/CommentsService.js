import { ProxyState } from "../AppState.js";
import { Comment } from "../Models/Comment.js";
import { api } from "./AxiosService.js";

class CommentsService {
    async getComment() {
        let res = await api.get('api/comments')
        ProxyState.comments = res.data.map(c => new Comment(c))
            //TODO CHECK res.data.map if correct info is being pulled in ^^^^
    }
    async createComment() {
        let res = await api.post('api/comments')
        let newComment = new Comment(res.data) //TODO CHECK res.data
        ProxyState.comments = [...ProxyState.comments, newComment]
    }
    // async editComment(commentEdit) {
    //     let res = await api.put(`api/comments/${commentEdit.Id}`, commentEdit)
    //     let newComment = new Comment(res.data) //TODO CHECK res.data
    //     let commentIndex = ProxyState.comments.findIndex(c => c.id == commentEdit.id)
    //     ProxyState.comments.splice(commentIndex, 1, newComment)
    //     ProxyState.comments = ProxyState.comments
    // }
    async deleteComment(commentId) {
     await api.delete
    }

}

export const commentsService = new CommentsService()