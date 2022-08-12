import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"
// NOTE may need to import posts service
class CommentsService {
    async getCommentsOnPost(postId) {
        let postComments = await dbContext.Comments.find({ postId }).populate('commenter', 'img')
        return postComments
    }
    async getCommentById(commentId) {
        let comment = await dbContext.Comments.findById(commentId)
        if (!comment) {
            throw new BadRequest('Invalid Comment Id')
        }
        return comment
    }
    async createComment(commentData) {
        let comment = await dbContext.Comments.create(commentData)
        return comment
    }
    async deleteComment(commentId) {
        let comment = await this.getCommentById(commentId)
        await comment.remove()
        return comment
    }
    async editComment(commentId, commentData) {
        let comment = await this.getCommentById(commentId)
        comment.postId = commentData.postId || comment.postId
        comment.creatorId = commentData.creatorId || comment.creatorId
        comment.message = commentData.message || comment.message
        return comment
    }
}
export const commentsService = new CommentsService()