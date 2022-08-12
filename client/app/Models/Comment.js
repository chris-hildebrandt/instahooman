
export class Comment{
    constructor(data){
        this.id =  data.id,
        this.comment = data.comment
    }
    get Template(){
        return `
        <p>${this.comment}</p>
        `
    }
}