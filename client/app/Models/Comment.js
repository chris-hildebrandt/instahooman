
export class Comment{
    constructor(data){
        this.id =  data.id,
        this.message = data.message
    }
    get Template(){
        return `
        <p>${this.message}</p>
        `
    }
}