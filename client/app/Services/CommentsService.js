import { ProxyState } from "../AppState.js";
import { Comment } from "../Models/Comment.js";
import { api } from "./AxiosService.js";

class CommentsService {
    async getComments() {
        let res = await api.get('api/comments')
        ProxyState.comments = res.data.map(c => new Comment(c))
        //TODO CHECK res.data.map if correct info is being pulled in ^^^^
    }
    async createComment(newComment) {
        let res = await api.post(`api/comments`, newComment)
        console.log(res.data)
        let updatedComment = new Comment(res.data) //TODO CHECK res.data
        ProxyState.comments = [...ProxyState.comments, updatedComment]
    }
    // async editComment(commentEdit) {
    //     let res = await api.put(`api/comments/${commentEdit.Id}`, commentEdit)
    //     let newComment = new Comment(res.data) //TODO CHECK res.data
    //     let commentIndex = ProxyState.comments.findIndex(c => c.id == commentEdit.id)
    //     ProxyState.comments.splice(commentIndex, 1, newComment)
    //     ProxyState.comments = ProxyState.comments
    // }
    async deleteComment(commentId) {
        await api.delete(`api/comments/${commentId}`)
        ProxyState.comments = ProxyState.comments.filter(c => c.id != commentId)
    }

}

export const commentsService = new CommentsService()