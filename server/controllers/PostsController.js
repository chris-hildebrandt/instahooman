import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from "../utils/BaseController.js"
import { postsService } from "../services/PostsService.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { commentsService } from "../services/CommentsService.js"

export class PostsController extends BaseController {

  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAllPosts)
      .get('/:postId', this.getCommentsByPostId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getPostById)
      .get('/:id', this.getPostsByCreatorId)
      .post('', this.createPost)
      .delete('/:id', this.deletePost)
      .put('/:postId', this.editPost)
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await postsService.getAllPosts()
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }
  async getCommentsByPostId(req, res, next) {
    try {
      const postId = req.params.id
      let comments = await commentsService.getCommentsByPostId(postId)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getPostById(req, res, next) {
    try {
      const post = await postsService.getPostById(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async getPostsByCreatorId(req, res, next) {
    try {
      const userId = req.userInfo.id
      const posts = await postsService.getPostsByCreatorId(userId)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async createPost(req, res, next) {
    try {
      const postData = req.body
      postData.creatorId = req.userInfo.id
      const posts = await postsService.createPost(postData)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async editPost(req, res, next) {
    try {
      const userId = req.userInfo.id
      const postId = req.params.postId
      const postData = req.body
      const currentPost = await this.getPostById(postId)
      if (currentPost.creatorId.toString() !== userId) {
        throw new Forbidden('Only the creator may edit this post')
      }
      let post = await postsService.editPost(postId, postData,)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req, res, next) {
    try {
      const postId = req.params.id
      const userId = req.userInfo.id
      if (req.creatorId.toString() !== userId) {
        throw new Forbidden('Only the creator may delete this post')
      }
      const post = await postsService.deletePost(postId, userId)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }
}