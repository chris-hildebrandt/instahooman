
export class Comment{
    constructor(data){
        this.id =  data.id,
        this.message = data.message
    }
    get Template(){
        return `
        <p>${this.message} <small onclick="app.commentsController.deleteComment(${this.id})"class="del-btn">ⓧ</small></p>
        `
    }
}