import { ProxyState } from "../AppState.js";
import { postsService } from "../Services/PostsService.js";
import { Pop } from "../Utils/Pop.js";

// TODO draw a post based on postId

function _drawPost() {
    // @ts-ignore
    document.getElementById('details-modal-content').innerHTML = ProxyState.post.ModalTemplate
}

let likes = 0

function Vote() {
    let upvote = (ProxyState.post.upvote += 1)
    let downvote = (ProxyState.post.downvote -= 1)


    // let upvotes = document.getElementById('likes')
    // upvotes.innerText = upvote

    // let downvotes = document.getElementById('dislikes')
    // downvotes.innerText = downvote

}

export class PostsController {
    constructor() {
        ProxyState.on('post', _drawPost)
        // ProxyState.on('posts', _drawPosts)

    }
    async getPosts() {
        try {
            console.log('Getting Single Post');
            await postsService.getPosts()
        } catch (error) {
            console.error('[Get Posts]', error)
            Pop.error(error)
        }
    }




}