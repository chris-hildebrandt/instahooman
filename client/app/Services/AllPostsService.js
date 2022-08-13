import { ProxyState } from "../AppState.js";
import { Post } from "../Models/Post.js";
import { Pop } from "../Utils/Pop.js";
import { api } from "./AxiosService.js";

class AllPostsService {
  async setSinglePost(postId) {
    const post = await ProxyState.posts.find(c => c.id == postId)
    if(!post){
      return
    }
    ProxyState.post = post  //TODO test res.data
  }

  async deletePost(postId) {
    await api.delete(`api/posts/${postId}`)
    ProxyState.posts = ProxyState.posts.filter(p => p.id != postId)
  }

  async getAllPost() {
    let res = await api.get('api/posts')
    ProxyState.posts = res.data.map(p => new Post(p))
  }

  async createPost(newPost) {
    let res = await api.post('api/posts', newPost)
    let post = new Post(res.data)
    ProxyState.posts = [...ProxyState.posts, post]
  }

}

export const allpostsService = new AllPostsService()