import { ProxyState } from "../AppState";
import { commentsService } from "../Services/CommentsService.js";
import { Pop } from "../Utils/Pop.js";


function _drawComment(){
    let template= ''
    ProxyState.comments.forEach(c => template += c.Template)
    // @ts-ignore
    document.getElementById('comments').innerHTML = template
}

export class CommentsController{
    
    constructor(){
        ProxyState.on('comments', _drawComment)
        this.getComments()
    }
    async getComments() {
        try {
            await commentsService.getComment()
        } catch (error) {
            console.log('[Get Comments]', error)
            Pop.error(error)
        }
    }

    async createComment(){
        try {
            await commentsService.createComment()
        } catch (error) {
            console.log('[Create Comment]', error);
            Pop.error(error)
        }
    }
    async editComment(commentId){
        try {
            // @ts-ignore
            window.event.preventDefault()
            // @ts-ignore
            let form = window.event.target
            let commentEdit ={
                id: commentId,
                // @ts-ignore=
                comment: form.comment.value,
            }
            await commentsService.editComment(commentEdit)
        } catch (error) {
            console.log('[Edit Comment]', error);
            Pop.error(error)
        }
    }

    async deleteComment(commentId){
        try {
            await commentsService.deleteComment(commentId)
        } catch (error) {
            console.log('[Delete Comment]', error)
            Pop.error(error)
        }
    }


}