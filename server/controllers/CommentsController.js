import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService.js'
import BaseController from '../utils/BaseController'
import { Forbidden } from "../utils/Errors.js"

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            // NOTE Not sure what we will need here, just getting all options laid out
            .get('', this.getComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:commentId', this.getCommentById)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
            .put('/:commentId', this.editComment)
    }

    async getComments(req, res, next){
        try {
            let comments = await commentsService.getComments()
            res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async getCommentById(req, res, next) {
        try {
            let comment = await commentsService.getCommentById(req.params.commentId)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async createComment(req, res, next) {
        try {
            let commentData = req.body
            commentData.creatorId = req.userInfo.id // HOPEFULLY THIS WORKS
            let comment = await commentsService.createComment(commentData)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req, res, next) {
        try {

            if (req.body.creatorId.toString() !== req.userInfo.id) {
                throw new Forbidden('Only the creator may edit this post')
            }
            let comment = await commentsService.deleteComment(req.params.commentId)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async editComment(req, res, next) {
        try {
            if (req.body.creatorId.toString() !== req.userInfo.id) {
                throw new Forbidden('Only the creator may edit this post')
            }
            let commentData = req.body
            let comment = await commentsService.editComment(req.params.commentId, commentData)
            res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}