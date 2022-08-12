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

  async getPostsByCreatorId(userId) {
    const posts = await dbContext.Posts.findById(userId)
    if (!userId) {
      throw new BadRequest('invalid user Id')
    }
    return posts
  }

  async createPost(postData) {
    let posts = await dbContext.Posts.create(postData)
    return posts
  }

  // async editPost(postId, postData) {
  //   let post = await dbContext.Posts.findById(postId)

  //   post.title = postData.title || post.title
  //   post.img = postData.img || post.img
  //   post.upVotes = postData.upVotes || post.upVotes
  //   post.downVotes = post.downVotes || post.downVotes

  //   await post.save()
  //   return post
  // }

  async deletePost(postId, userId) {
    let post = await this.getPostById(postId)
    await post.remove()
    return post
  }
}

export const postsService = new PostsService()