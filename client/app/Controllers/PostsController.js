import { postsService } from "../Services/PostsService.js"
import { ProxyState } from "../AppState.js"
import { logger } from "../Utils/Logger.js"
import { Pop } from "../Utils/Pop.js"


function _drawCurrentPost() {
  // @ts-ignore
  // console.log(ProxyState.currentPost);
  // @ts-ignore
  document.getElementById('details-modal-content').innerHTML = ProxyState.currentPost.ModalTemplate
}

function _drawAllPosts() {
  let template = ""
  ProxyState.posts.forEach(f => template += f.CardTemplate)
  // @ts-ignore
  document.getElementById('all-posts').innerHTML = template
}

export class PostsController {
  constructor() {
    ProxyState.on('currentPost', _drawCurrentPost)
    ProxyState.on('posts', _drawAllPosts)
    this.getAllPosts()
  }

  async getAllPosts() {
    try {

      await postsService.getAllPosts()
    } catch (error) {
      console.error('[Getting All Posts]', error);
      Pop.error(error)
    }
  }
  async createPost() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target
      let newPost = {
        // @ts-ignore
        img: form.img.value,
        // @ts-ignore
        title: form.title.value
      }
      await postsService.createPost(newPost)
      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[Creating Post]', error);
    }
  }

  async setCurrentPost(postId) {
    try {
      await postsService.setCurrentPost(postId)
    } catch (error) {
      console.error('[Setting Current Post]', error);
      Pop.error(error)
    }
  }

  async upvote(postId) {
    try {
      let upvotes = await postsService.upvote(postId)
      // @ts-ignore
      document.getElementById('upvote').innerText = upvotes
    } catch (error) {
      logger.error('[upvote]', error)
      Pop.error(error)
    }
  }

  async downvote(postId) {
    try {
      let downvotes = await postsService.downvote(postId)
      // @ts-ignore
      document.getElementById('downvote').innerText = downvotes
    } catch (error) {
      logger.error('[downvote]', error)
      Pop.error(error)
    }
  }

  // TODO connect edit function to the create post form 
  // async editCurrentPost(postId) {
  //   try {
  //     await postsService.editCurrentPost(postId)
  //   } catch (error) {
  //     logger.error('[Editing Current Post]', error)
  //     Pop.error(error)
  //   }
  // }

  // async deletePost(postId) {
  //   try {
  //     console.log("Deleting Post", postId);
  //     await postsService.deletePost(postId)
  //   } catch (error) {
  //     console.log('[Deleting Post]', error)
  //     Pop.error(error)
  //   }
  // }

}