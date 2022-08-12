import { Pop } from "../Utils/Pop.js";
import { ProxyState } from "../AppState.js";
import { Post } from "../Models/Post.js";
import { allpostsService } from "../Services/AllPostsService.js";


function _drawAllPost() {
    let template = ""
    ProxyState.posts.forEach(f => template += f.CardTemplate)
    // @ts-ignore
    document.getElementById('all-post').innerHTML = template
}

//

export class AllPostsController {
    constructor() {
        ProxyState.on('allposts', _drawAllPost)
        this.getAllPost()
    }
    async setSinglePost(postId){
        try {
          await allpostsService.setSinglePost(postId)
        } catch (error) {
          console.log('[Set Single Post]');
          Pop.error(error)
        }
      }
    async getAllPost() {
        try {
            await allpostsService.getAllPost()

        } catch (error) {
            console.log('[Getting Feed]', error);
            Pop.error(error)
        }
    }
    async createPost() {
        try {
            // @ts-ignore
            event.preventDefault()
            // @ts-ignore
            const form = event.target
            const newPost = {
                // @ts-ignore
                img: form.img.value,
                // @ts-ignore
                caption: form.caption.value
            }
            await allpostsService.createPost(newPost)
            // @ts-ignore
            form.reset()
        } catch (error) {
            console.log('[Creating Post]', error);
        }
    }

    async deletePost(postId){
        try {
            await allpostsService.deletePost(postId)
        } catch (error) {
            console.log('[Deleting Post]', error)
            Pop.error(error)
        }
    }
}