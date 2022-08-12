import { ProxyState } from "../AppState.js";
import { postsService } from "../Services/PostsService.js";
import { Pop } from "../Utils/Pop.js";


// TODO draw a post based on postId
function _drawPost(postId) {
    let template = ''
    ProxyState.posts.find(p => p.id = postId)
    // @ts-ignore
    document.getElementById('post').innerHtml = Template
}

let likes = 0

function Vote(){
let upVote = (ProxyState.post.upvote += 1)
let downVote = (ProxyState.post.downvote -= 1)


    // let upvotes = document.getElementById('likes')
    // upvotes.innerText = upVote

    // let downVotes = document.getElementById('dislikes')
    // downVotes.innerText = downVote
   

}

export class PostsController {
    constructor() {
        ProxyState.on('posts', _drawPost)
        ProxyState.on('posts', Vote)
    
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