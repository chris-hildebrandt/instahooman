import { ProxyState } from "../AppState.js";
import { postsService } from "../Services/PostsService.js";
import { Pop } from "../Utils/Pop.js";


// TODO draw a post based on postId
function _drawPost(postId) {
    let template = ' '
    ProxyState.posts.find(p => p.id = postId)
    // @ts-ignore
    document.getElementById('post').innerHtml = Template
}

export class PostsController {
    constructor() {
        ProxyState.on('posts', _drawPost)
    }
    async getPosts(){ 
        try {
            await postsService.getPosts()
        } catch (error) {
            console.error('[Get Posts]', error)
            Pop.error(error)
        }
    }
    

}