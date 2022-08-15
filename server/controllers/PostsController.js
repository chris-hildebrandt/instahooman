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
      .get('/:postId', this.getPostById)
      .get('/userId/:creatorId', this.getPostsByCreatorId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:postId', this.deletePost)
      .put('/:postId', this.editPost)
      .put('/upvote/:postId', this.upvote)
      .put('/downvote/:postId', this.downvote)
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await postsService.getAllPosts()
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getPostById(req, res, next) {
    try {
      const post = await postsService.getPostById(req.params.postId)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async getPostsByCreatorId(req, res, next) {
    try {
      const posts = await postsService.getPostsByCreatorId(req.params.creatorId)
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
      const postId = req.params.postId
      const userId = req.userInfo.id
      if (req.creatorId.toString() !== userId) {
        throw new Forbidden('Only the creator may delete this post')
      }
      const post = await postsService.deletePost(postId,)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async upvote(req, res, next) {
    try {
      const upvotes = await postsService.upvote(req.params.postId)
      res.send(upvotes)
    } catch (error) {
      next(error)
    }
  }
  async downvote(req, res, next) {
    try {
      const downvotes = await postsService.downvote(req.params.postId)
      res.send(downvotes)
    } catch (error) {
      next(error)
    }
  }

}