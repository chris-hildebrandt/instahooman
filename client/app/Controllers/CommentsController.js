import { commentsService } from "../Services/CommentsService.js";
import { ProxyState } from "../AppState.js";
import { Pop } from "../Utils/Pop.js";


function _drawComments() {
  let template = ''
  ProxyState.comments.forEach(c => template += c.Template)
  // @ts-ignore
  console.log(document.getElementById('comments'));
  // @ts-ignore
  document.getElementById('comments').innerHTML = template
}

export class CommentsController {

  constructor() {
    ProxyState.on('currentPost', this.getCommentsByPostId)
    // ProxyState.on('comments', this.getCommentsByPostId)
  }

  async getCommentsByPostId() {
    try {
      await commentsService.getComments()
      _drawComments()
    } catch (error) {
      console.error('[Get Comments]', error)
      Pop.error(error)
    }
  }

  async createComment(postId) {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target
      let newComment = {
        // @ts-ignore
        message: form.message.value,
        postId: postId
      }
      // @ts-ignore
      await commentsService.createComment(newComment)
    } catch (error) {
      console.log('[Create Comment]', error);
      Pop.error(error)
    }
  }
  // async editComment(commentId){
  //     try {
  //         // @ts-ignore
  //         window.event.preventDefault()
  //         // @ts-ignore
  //         let form = window.event.target
  //         let commentEdit ={
  //             id: commentId,
  //             // @ts-ignore=
  //             comment: form.comment.value,
  //         }
  //         await commentsService.editComment(commentEdit)
  //     } catch (error) {
  //         console.log('[Edit Comment]', error);
  //         Pop.error(error)
  //     }
  // }

  async deleteComment(commentId) {
    try {
      await commentsService.deleteComment(commentId)
    } catch (error) {
      console.error('[Delete Comment]', error)
      Pop.error(error)
    }
  }


}