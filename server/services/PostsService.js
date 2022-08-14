import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'


class PostsService {

  async getAllPosts() {
    let posts = await dbContext.Posts.find()
    return posts
  }

  async getPostById(postId) {
    let post = await dbContext.Posts.findById(postId)
    if (!post) {
      throw new BadRequest('Invalid Post ID')
    }
    return post
  }

  async getPostsByCreatorId(creatorId) {
    const posts = await dbContext.Posts.findById(creatorId)
    if (!creatorId) {
      throw new BadRequest('invalid user Id')
    }
    return posts
  }

  async createPost(postData) {
    let posts = await dbContext.Posts.create(postData)
    return posts
  }

  async editPost(postId, postData) {
    let post = await dbContext.Posts.findById(postId)

    post.title = postData.title || post.title
    post.img = postData.img || post.img
    post.upvotes = postData.upvotes || post.upvotes
    post.downvotes = postData.downvotes || post.downvotes

    await post.save()
    return post
  }

  async deletePost(postId,) {
    let post = await this.getPostById(postId)
    await post.remove()
    return post
  }

  async upvote(postId) {
    let post = await dbContext.Posts.findById(postId)
    post.upvotes++
    await post.save()
    return post
  }
  async downvote(postId) {
    let post = await dbContext.Posts.findById(postId)
    post.downvotes++
    await post.save()
    return post
  }

}

export const postsService = new PostsService()