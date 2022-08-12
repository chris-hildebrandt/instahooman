import { ProxyState } from "../AppState.js";
import { api } from "./AxiosService.js";
import { Post } from "../Models/Post.js";

class PostsService {
    async getPosts() {
      let res = await api.get('api/post')
      ProxyState.posts  = res.data.map(p => new Post(p))

    }



}

export const postsService = new PostsService()
