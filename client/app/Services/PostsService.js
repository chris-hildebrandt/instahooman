import { ProxyState } from "../AppState.js";
import { Post } from "../Models/Post.js";
import { api } from "./AxiosService.js";

class PostsService {
  async getAllPosts() {
    let res = await api.get('api/posts')
    ProxyState.posts = res.data.map(p => new Post(p))
  }
  async createPost(newPost) {
    let res = await api.post('api/posts', newPost)
    ProxyState.posts = [...ProxyState.posts, new Post(res.data)]
  }
  async setCurrentPost(postId) {
    let res = await api.get(`api/posts/${postId}`)
    ProxyState.currentPost = new Post(res.data)
    console.log(ProxyState.currentPost);
  }

  async upvote(postId) {
    let res = await api.put(`api/posts/upvote/${postId}`)
    return res.data
  }
  async downvote(postId) {
    let res = await api.put(`api/posts/downvote/${postId}`)
    return res.data
  }
  // async editCurrentPost(postId) {
  //   await
  // }
  // async deletePost(postId) {
  //   await
  // }

}

export const postsService = new PostsService()
